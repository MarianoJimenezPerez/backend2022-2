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


/* --------------------------------Instancia de express-------------------------------- */

const app = express();
const httpServer = new HttpServer(app); //creo mi sv http
const io = new IOServer(httpServer); //configuro mi sv de io


/* Conexión con mongo atlas, con ttl */

const MongoStore = connectMongo.create({
    mongoUrl: 'mongodb+srv://coderhouse:coderhouse@cluster0.m8qjx.mongodb.net/sesiones?retryWrites=true&w=majority',
    ttl: 60
})

/* --------------------------------Middlewares-------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static( __dirname + '/public'));
app.use(session({
    store: MongoStore,
    secret: 'miClave',
    resave: false,
    saveUninitialized: false
}));
app.set('views', './views');
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts/'
}))


/* --------------------------------Globales-------------------------------- */

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
    const nombre = req.session.nombre;
    return nombre;
}

/* --------------------------------Websocket-------------------------------- */

let productos = generarProductos(5);

io.on('connection', async (socket) => { //defino la conexión y recibo con "on" al cliente.

    //envio login
    

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
        escribirArchivo()
        io.sockets.emit('productosHistoricos', productos)  //actualizo la vista, enviando nuevamente los productos históricos
    })

    //escucho nuevos mensajes
    socket.on('nuevoMensaje', async data => {
        await objMensajesDao.insertar(data)
        io.sockets.emit('mensajesHistoricos', await imprimir())  //actualizo la vista, enviando nuevamente la bandeja histórica
    })
})

/* --------------------------------Rutas-------------------------------- */

app.get('/login', (req, res, next) => {
    res.render('login', {})
});

app.get('/', (req, res, next) => {
    req.session.nombre = req.query.nombre;
    res.render('index', {nombre: getNombreSession(req)})
});

app.get('/api/productos-test', (req, res, next) => {
    res.status(200).json({
        msg: productos
    });
});

app.get('/con-session', (req,res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces.`)
    } else {
        req.session.nombre = req.query.nombre; //por query pasamos nuestro nombre
        req.session.contador = 1
        res.send(`Te damos la Bienvenida ${getNombreSession(req)}`);
    }
})

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