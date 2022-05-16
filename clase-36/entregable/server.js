/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const {Server: HttpServer } = require('http');
const {Server: IOServer } = require('socket.io');
const fs = require('fs');
const { engine } = require('express-handlebars');
const { faker } = require('@faker-js/faker');
const ContenedorMongoDB = require('./src/ContenedorMongoDB.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const enviarMailRegistro = require('./src/nodemailer/nodemailer.js');
const {encriptar, desencriptar} = require('./src/bcrypt/encriptador.js');
/* --------------------------------Instancia de express-------------------------------- */

const app = express();
const httpServer = new HttpServer(app); //creo mi sv http
const io = new IOServer(httpServer); //configuro mi sv de io


/* Conexión con mongo atlas, con ttl */

const MongoStore = connectMongo.create({
    mongoUrl: 'mongodb+srv://marianoroot:5535538@ecommerce.b7leh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ttl: 60
})

/* --------------------------------Middlewares-------------------------------- */

/* Lectura */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public'));

/* Session */
app.use(cookieParser());
app.use(session({
    store: MongoStore,
    secret: 'miClave',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        maxAge: 200000 //200 seg
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
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser( async (user, cb) => {
    cb(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

/* Conf Passport local */



passport.use('local-signup', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, email, password, done) => {
        const user = {
            usuario: {
                nombre: req.body.name,
                email: email,
                password: await encriptar(password),
                edad: req.body.edad,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                carrito: []
            }
        }
        await objUsuariosDao.insertar(user);

        //envio mail
        let adminMail = "marianojimenezperez1@gmail.com";
        let asuntoMail = "Nuevo registro app node";
        let cuerpoMail = `
            <ul>
                <li>Mail: ${email}<li>
                <li>Password: ${password}<li>
            </ul>
        `
        await enviarMailRegistro(adminMail, asuntoMail, cuerpoMail)

        //done
        done(null, user)
    }
))
passport.use('local-signin', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, email, password, done) => {
        const dbUsuarios = await objUsuariosDao.listarTodo();
        let encontrado = false;
        for(usuario of dbUsuarios){
            if( usuario.usuario.email == req.body.email &&
                desencriptar(req.body.password, usuario.usuario.password)){
                encontrado = usuario;
            }
        }
        done(null, encontrado)
    }
))

/* --------------------------------Globales-------------------------------- */
/* BASE DE DATOS */
let date = new Date;


const objProductosDao = new ContenedorMongoDB(
    'productos',
    {     
        title: {type: String, require: true},
        price: {type: Number, require: true},
        thumbnail: {type: String, require: true}
    }  
)

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

const objUsuariosDao = new ContenedorMongoDB(
    'usuarios',
    { 
        usuario: {
            nombre: {type: String, require: true},
            email: {type: String, require: true},
            password: {type: String, require: true}, 
            edad: {type: Number, require: true},
            direccion: {type: String, require: true},
            telefono: {type: Number, require: true},
            carrito: {type: Array, require: true}
        }
    }   
)

// esta función conecta de manera asyncrona con el back y obtiene los mensajes almacenados allí
// tuve que crearla así, para que no haya problemas con el async
async function imprimir(){
    let mensajes = await objMensajesDao.listarTodo();
    return mensajes;
}

/* --------------------------------Funciones-------------------------------- */

/*function generarProductos(cantidad){
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
*/
function getNombreSession(req) {   //si no existe un nombre, crea uno vacío
    const nombre = req.session.nombre ?? '';
    return nombre;
}

/* --------------------------------Websocket-------------------------------- */

/*let productos = generarProductos(5);*/

io.on('connection', async (socket) => { //defino la conexión y recibo con "on" al cliente.

    //envio los productos históricos
    socket.emit('productosHistoricos', productos)

    //envio los mensajes históricos
    socket.emit('mensajesHistoricos', await imprimir())

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

/* --------------------------------Rutas-------------------------------- */

/*******GETS*******/

/* LOGIN */
app.get('/login', (req, res, next) => {
    res.render('login', {})
});
/* REGISTER */
app.get('/register', (req, res, next) => {
    res.render('register', {})
});
/* LOGOUT */
app.get('/logout', (req, res) => {
    const nombre = getNombreSession(req);
    const datosUsuario = {
        nombre: req.user.nombre
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
app.get('/', async (req, res, next) => {
    let productos = await objProductosDao.listarTodo();
    /*Local*/
    if(req.isAuthenticated()){
        if (!req.user.contador) {
            req.user.contador = 0
        }
        req.user.contador++
        const datosUsuario = {
            nombre: req.user.usuario.nombre
        }
        res.render('index', {contador: req.user.contador, datos: datosUsuario, productos: productos});
    } else {
        if(req.session.nombre){
            res.render('index', {nombre: getNombreSession(req), productos: productos})
        } else {
            req.session.nombre = req.query.nombre;
            res.render('index', {nombre: getNombreSession(req), productos: productos})
        }
    }
});

/* CARRITO */
app.get('/carrito', async (req, res, next) => {
    if(req.isAuthenticated()){
        let usuario = req.user.usuario;
        let productosAgregados = usuario.carrito;
        res.render('carrito', {datos: usuario, productosAdd: productosAgregados})
    } else {
        res.redirect('/login')
    }
});

/*******POSTS*******/

/* PRODUCTO NUEVO */
app.post('/productoN', async (req, res, next) => {
    let productoNuevo = {
        title: req.body.title,
        price: req.body.price,
        thumbnail: req.body.thumbnail
    };
    console.log(productoNuevo);
    await objProductosDao.insertar(productoNuevo);
    res.redirect("/")
});

/* AGREGAR PRODUCTO AL CARRITO */
app.post('/agregarProducto', async (req, res, next) => {
    if(req.isAuthenticated()){
        const pId = req.body.id;

        let usuario = req.user.usuario;
        let productoDeseado = await objProductosDao.listarId(pId);
        usuario.carrito.push(productoDeseado[0])
        res.redirect('/carrito')
    } else {
        res.redirect('/login')
    }
});

/* LOGIN */
app.post('/login', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}))

/* REGISTER */
app.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    passReqToCallback: true
}))


/* --------------------------------Servidor-------------------------------- */

const PORT = 8080
const server = httpServer.listen(PORT, () => {  //escucho al httpserver, quien contiene el express
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));