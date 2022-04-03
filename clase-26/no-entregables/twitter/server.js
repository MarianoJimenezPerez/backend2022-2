/*============================[Modulos]============================*/
import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import exphbs from "express-handlebars";

import passport from "passport";
import { Strategy } from "passport-twitter";
const TwitterStrategy = Strategy;

const app = express();
/*============================[Middlewares]============================*/
const TWITTER_CONSUMER_KEY = 'xxxxxxxxxxxxxxxx';
const TWITTER_CONSUMER_SECRET = 'xxxxxxxxxxxxxxx'
const TWITTER_BEARER_TOKEN = 'xxxxxxxxxxxxxxxxx'
/*-------- [Conf Passport]*/
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:5252/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, cb) {
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
    res.render('twitter-login');
});

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/', successRedirect: '/datos', authType: 'reauthenticate' }));

app.get('/datos', (req, res)=>{
   if(req.isAuthenticated()){
    if (!req.user.contador) {
        req.user.contador = 0
    }
    req.user.contador++
    const datosUsuario = {
        nombre: req.user.displayName,
        username: req.user.username,
        foto: req.user.photos[0].value
    }
    res.render('datos', {contador: req.user.contador, datos: datosUsuario});
   } else {
    res.redirect('/')
   }
})

app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
});

/*============================[Servidor]============================*/
const PORT = 5252;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});