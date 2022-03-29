/* --------------------------------Modulos-------------------------------- */
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';
import path from 'path';


/* --------------------------------Instancia de express-------------------------------- */

const app = express();

/* --------------------------------Middlewares-------------------------------- */
/* --Session-- */
app.use(cookieParser());
app.use(session({
    secret: "miClave",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 200000 // 20 seg
    }
}))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* --MOTOR DE PLANTILLAS-- */
app.set('view engine', '.hbs');
app.set('views', path.join(path.dirname(''), './src/views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs'
}))

/* --------------------------------BASE DE DATOS-------------------------------- */

const usuariosDB = [];

/* --------------------------------Rutas-------------------------------- */

app.get('/', (req, res) => {
    if(req.session.email){
        res.redirect('/datos');
    } else {
        res.redirect('/login');
    }
});

app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const existe = await usuariosDB.find(usuario => usuario.email == email && usuario.password == password)
    console.log(existe)
    if(existe != undefined) {
        req.session.email = email;
        req.session.password = password;
        res.redirect('datos');
    } else {
        res.redirect('login-error');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/register', (req, res) => {
    const {nombre, email, password} = req.body;
    usuariosDB.push({nombre, email, password});
    console.log(usuariosDB)
    res.send(usuariosDB);
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.get('/datos', (req, res) => {
    res.render('datos', {});
});

app.get('/login-error', (req, res) => {
    res.render('loginError');
});

/* --------------------------------Servidor-------------------------------- */

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));