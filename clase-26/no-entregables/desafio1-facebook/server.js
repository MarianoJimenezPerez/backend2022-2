/*============================[Modulos]============================*/
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import exphbs from "express-handlebars";
import passport from "passport";
import { Strategy } from "passport-facebook";

const FacebookStrategy = Strategy;

const app = express();
/*============================[Middlewares]============================*/
const FACEBOOK_APP_ID = 'xxxxxxxxxxxxxxxxxx';
const FACEBOOK_APP_SECRET = 'xxxxxxxxxxxxxxxxxxxx';

/*-------- [Conf Passport]*/
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    console.log('accessToken: ', accessToken)
    console.log('refreshToken: ', refreshToken)
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

/*----------- passport -----------*/
app.use(passport.initialize());
app.use(passport.session());

/*----------- Otros -----------*/
app.use(bodyParser.urlencoded({ extended: true }));

/*============================[Base de datos]============================*/
const usuariosDB = []

/*============================[Rutas]============================*/
app.get('/', (req, res)=>{
    res.render('facebook-login');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/', successRedirect: '/datos', authType: 'reauthenticate' }));

app.get('/datos', (req, res)=>{
   if(req.isAuthenticated()){
    if (!req.user.contador) {
        req.user.contador = 0
    }
    req.user.contador++
    const datosUsuario = {
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        email: req.user.emails[0].value,
    }
    res.render('datos', {contador: req.user.contador, datos: datosUsuario});
   } else {
    res.redirect('/')
    console.log('Usuario no autenticado')
   }
});

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
});

/*============================[Servidor]============================*/
const PORT = 8080;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});