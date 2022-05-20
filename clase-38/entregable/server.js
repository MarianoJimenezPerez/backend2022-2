/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const {Server: HttpServer } = require('http');
const {Server: IOServer } = require('socket.io');
const { engine } = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const connectMongo = require('connect-mongo');
const passport = require('passport');
const router = require('./src/routes/routes.js');
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

app.use(passport.initialize());
app.use(passport.session());

/* --------------------------------Globales-------------------------------- */
// esta función conecta de manera asyncrona con el back y obtiene los mensajes almacenados allí
async function imprimir(){
    let mensajes = await objMensajesDao.listarTodo();
    return mensajes;
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

app.use('/', router)

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