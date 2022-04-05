/*============================[Modulos]============================*/
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import exphbs from "express-handlebars";

const app = express();
/*============================[Middlewares]============================*/

/*----------- Session -----------*/
app.use(cookieParser());
app.use(session({
    secret: '1234567890!@#$%^&*()',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: 'auto',
        maxAge: 20000 //20 seg
    }
}));

/*----------- Motor de plantillas -----------*/
app.set('views', path.join(path.dirname(''), '/src/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs');

/*----------- Otros -----------*/
app.use(bodyParser.urlencoded({ extended: true }));

/*============================[Base de datos]============================*/
const usuariosDB = []

/*============================[Rutas]============================*/
app.get('/', (req, res)=>{
    res.send('Server template ok!');
});

/*============================[Servidor]============================*/
const PORT = 5151;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});