/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const {Server: HttpServer } = require('http');
const {Server: IOServer } = require('socket.io');
const fs = require('fs');
const { engine } = require('express-handlebars');
const { faker } = require('@faker-js/faker');



/* --------------------------------Instancia de express-------------------------------- */

const app = express();
const httpServer = new HttpServer(app); //creo mi sv http
const io = new IOServer(httpServer); //configuro mi sv de io

/* --------------------------------Middlewares-------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static( __dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'hbs')
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    partialsDir: __dirname + '/views/partials',
    layoutsDir: __dirname + '/views/layouts/'
}))


/* --------------------------------Globales-------------------------------- */

let date = new Date;

const mensajes = [
    {
        email: "System",
        message: "Bienvenido",
        hour: `[${date.getHours()}:${date.getMinutes()}]` // envio la fecha en formato [hora:minutos] de cuando se conecta el socket
    }
];

/* --------------------------------Funciones-------------------------------- */

function generarProductos(cantidad){
    let productos = [];
    for (let i = 0; i < cantidad; i++){
        let product = {
            id: i,
            title: faker.commerce.product(),
            price: faker.datatype.float({ min: 100, max: 1000, precision: 0.01 }),
            thumbnail: faker.image.abstract() 
        }
        productos.push(product);
    }

    return productos;
}

function escribirArchivo(){
    let productosJson = JSON.stringify(productos);
    try {
        fs.writeFileSync('productos.json', productosJson);
        const archivo1 =  fs.readFileSync('productos.json', 'utf-8', (err, resp) =>{
            if(err){
                console.error("Se frenó la ejecución. Archivo ilegible")
            } else {
                return resp
            }
        })
    } catch (error) {
        console.error("Detalle del error: " + error)
    }
}

/* --------------------------------Websocket-------------------------------- */

let productos = generarProductos(5);

io.on('connection', (socket) => { //defino la conexión y recibo con "on" al cliente.

    //envio los productos históricos
    socket.emit('productosHistoricos', productos)

    //envio los mensajes históricos
    socket.emit('mensajesHistoricos', mensajes)

    //escucho nuevos productos
    socket.on('nuevoProducto', data => {
        data.id = productos.length + 1;
        productos.push(data)
        escribirArchivo()
        io.sockets.emit('productosHistoricos', productos)  //actualizo la vista, enviando nuevamente los productos históricos
    })

    //escucho nuevos mensajes
    socket.on('nuevoMensaje', data => {
        mensajes.push(data)
        io.sockets.emit('mensajesHistoricos', mensajes)  //actualizo la vista, enviando nuevamente la bandeja histórica
    })
})

/* --------------------------------Rutas-------------------------------- */

app.get('/', (req, res, next) => {
    res.render('index', {})
});

app.get('/api/productos-test', (req, res, next) => {
    res.status(200).json({
        msg: productos
    });
});

/* --------------------------------Servidor-------------------------------- */

const PORT = 8080
const server = httpServer.listen(PORT, () => {  //escucho al httpserver, quien contiene el express

    //escribo mi primer archivo con los textos en la db
    /*escribirArchivo()*/

    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));