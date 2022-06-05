/*============================[Modulos]============================*/
import express from 'express';
import cors from 'cors';
import config from './src/utils/config.js';
import {engine} from 'express-handlebars';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import RouterEcommerce from './src/routes/ecommerce.routes.js';
import LocalAuth from './src/passport/LocalAuth.js'
import RouterQA from './src/routes/QA.routes.js';

const app = express();
/* const la = new LocalAuth;
la.start();
console.log("la creado") */

/*============================[Middlewares]============================*/
app.use(express.static('public'));
app.use(express.json());

/****   Motor de plantillas */
app.set('views', './views');
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'layout',
    partialsDir: './views/partials',
    layoutsDir: './views/layouts/'
}))
app.set('view engine', 'hbs');

/****   Session & Passport*/
const MongoStore = connectMongo.create({
    mongoUrl: config.mongodb.connstr,
    ttl: 6000
})

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
app.use(passport.initialize());
app.use(passport.session());

/****   Cors */
if(config.srv.entorno == 'development') {
    app.use(cors());
} else {
    app.use(cors({
        origin: 'http://localhost:5000',
        optionsSucessStatus: 200,
        methods: "GET, PUT, POST"
    }));
}
/****   Rutas */
app.use('/', (new RouterEcommerce()).start());
app.use('/qa', (new RouterQA()).start());

/*============================[Servidor]============================*/
const PORT = config.srv.port;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});