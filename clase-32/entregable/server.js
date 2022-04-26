/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const numCPUs = require('os').cpus().length;
const cluster = require("cluster");
const {Server: HttpServer } = require('http');
const {Server: IOServer } = require('socket.io');
const fs = require('fs');
const { engine } = require('express-handlebars');
const compression = require('compression');
const { faker } = require('@faker-js/faker');
const ContenedorMongoDB = require('./src/ContenedorMongoDB.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { MONGOURL, fbAId, fbAS } = require('./utils/config.js')
const logger = require('./src/logger.js')


/* --------------------------------Instancia de express-------------------------------- */

const app = express();
const httpServer = new HttpServer(app); //creo mi sv http
const io = new IOServer(httpServer); //configuro mi sv de io


/* Conexión con mongo atlas, con ttl */

const MongoStore = connectMongo.create({
    mongoUrl: MONGOURL,
    ttl: 60
})

/* --------------------------------Middlewares-------------------------------- */

/* Lectura */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public'));
app.use(compression())

/* ID PASSPORT FACEBOOK */
const FACEBOOK_APP_ID = fbAId;
const FACEBOOK_APP_SECRET = fbAS;

/* Conf Passport */
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos']
},
function(accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null, profile);
}
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

/* Session */
app.use(cookieParser());
app.use(session({
    store: MongoStore,
    secret: 'miClave',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        maxAge: 20000 //20 seg
    }
}));

/* Motor de plantillas */
app.set('views', './views');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts/'
}))
app.set('view engine', 'hbs');

/* Passport */
app.use(passport.initialize());
app.use(passport.session());



/* --------------------------------Globales-------------------------------- */
/* BASE DE DATOS */
let date = new Date;

const objMensajesDao = new ContenedorMongoDB(
    'mensajes',
    { 
        author: {
            id: {type: String, require: true},
            nombre: {type: String, require: true}, 
            apellido: {type: String, require: true}, 
            edad: {type: Number, require: true},
            alias: {type: String, require: true},
            avatar: {type: String, require: true},
        },
        hour: {type: String},
        text: {type: String, require: true},
    }    
)

// esta función conecta de manera asyncrona con el back y obtiene los mensajes almacenados allí
// tuve que crearla así, para que no haya problemas con el async
async function imprimir(){
    let mensajes = await objMensajesDao.listarTodo();
    return mensajes;
}

/* --------------------------------Funciones-------------------------------- */

function generarProductos(cantidad){
    let productos = [];
    for (let i = 0; i < cantidad; i++){
        let product = {
            id: i + 1,
            title: faker.commerce.product(),
            price: faker.datatype.float({ min: 100, max: 1000, precision: 0.01 }),
            thumbnail: faker.image.abstract() 
        }
        productos.push(product);
    }

    return productos;
}

function getNombreSession(req) {   //si no existe un nombre, crea uno vacío
    const nombre = req.session.nombre ?? '';
    return nombre;
}

/* --------------------------------Websocket-------------------------------- */

let productos = generarProductos(5);

io.on('connection', async (socket) => { //defino la conexión y recibo con "on" al cliente.

    //envio los productos históricos
    socket.emit('productosHistoricos', productos)

    //envio los mensajes históricos
    socket.emit('mensajesHistoricos', await imprimir())

    //escucho logins
    socket.on('nuevoLogin', data => {
        console.log(data)
    })

    //escucho nuevos productos
    socket.on('nuevoProducto', data => {
        data.id = productos.length + 1;
        productos.push(data)
        io.sockets.emit('productosHistoricos', productos)  //actualizo la vista, enviando nuevamente los productos históricos
    })

    //escucho nuevos mensajes
    socket.on('nuevoMensaje', async data => {
        await objMensajesDao.insertar(data)
        io.sockets.emit('mensajesHistoricos', await imprimir())  //actualizo la vista, enviando nuevamente la bandeja histórica
    })
})

/* --------------------------------INICIO SV-------------------------------- */
const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == 'CLUSTER';

if (modoCluster && cluster.isPrimary) {

    console.log(`Número de procesadores: ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString());
        cluster.fork();
    })
} else {
    logger.info(`Conf logger modo: ${process.env.NODE_ENV}`);
    /* --------------------------------Rutas-------------------------------- */
    /***GETS***/
    /* LOGIN */
    app.get('/login', (req, res, next) => {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} requerida`)
        res.render('login', {})
    });
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/', authType: 'reauthenticate' }));

    /* LOGOUT */
    app.get('/logout', (req, res) => {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} requerida`)
        const nombre = getNombreSession(req)
        const datosUsuario = {
            nombre: req.user.displayName,
            foto: req.user.photos[0].value,
        }
        req.session.destroy(err => {
            if (err) {
                res.json({ error: 'olvidar', body: err })
            } else {
                res.render('logout', {nombre: nombre, datos: datosUsuario})
            }
        })
        req.logout();
    })

    /* HOME */
    app.get('/', (req, res, next) => {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} requerida`)
        /*facebook*/
        if(req.isAuthenticated()){
            if (!req.user.contador) {
                req.user.contador = 0
            }
            req.user.contador++
            const datosUsuario = {
                nombre: req.user.displayName,
                foto: req.user.photos[0].value,
            }
            res.render('indexFacebook', {contador: req.user.contador, datos: datosUsuario});
        } else {
            if(req.session.nombre){
                res.render('index', {nombre: getNombreSession(req)})
            } else {
                req.session.nombre = req.query.nombre;
                res.render('index', {nombre: getNombreSession(req)})
            }
        }
    });

    /* SESSION COUNTER */
    app.get('/con-session', (req,res) => {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} requerida`)
        if (req.session.contador) {
            req.session.contador++
            res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces.`)
        } else {
            req.session.nombre = req.query.nombre; //por query pasamos nuestro nombre
            req.session.contador = 1
            res.send(`Te damos la Bienvenida ${getNombreSession(req)}`);
        }
    })

    /* INFO */

    app.get('/info', (req, res, next) => {
        const { url, method } = req
        logger.info(`Ruta ${method} ${url} requerida`)
        const datosProcess = {
            directorio: process.cwd(),
            id: process.pid,
            version: process.version,
            titulo: process.title,
            so: process.platform,
            argv: process.argv.slice(1),
            rss: process.memoryUsage().rss
        }
        console.log(process.argv)
        res.render('infoTable', {datosProcess: datosProcess})
    });

    /* RUTA INEXISTENTE */
    
    app.get('*', (req, res) => {
        const { url, method } = req
        logger.warn(`Ruta ${method} ${url} no implementada`)
        res.send(`Ruta ${method} ${url} no está implementada`)
    })
    /* --------------------------------Servidor-------------------------------- */
    const server = httpServer.listen(PORT, () => {  //escucho al httpserver, quien contiene el express
        console.log(
            `
            Servidor Http escuchando en el puerto  ${PORT}
        =====================================================
            PID WORKER ${process.pid}
            `
        );
    })
    server.on("error", error => console.log(`Se detecto un error: ${error}`));
}
