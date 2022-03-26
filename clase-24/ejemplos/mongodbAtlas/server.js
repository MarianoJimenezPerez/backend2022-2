const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const connectMongo = require('connect-mongo');
const MongoStore = connectMongo.create({
    mongoUrl: 'mongodb+srv://coderhouse:coderhouse@cluster0.m8qjx.mongodb.net/sesiones?retryWrites=true&w=majority',
    ttl: 60
})

const app = express();

app.use(cookieParser());
app.use(session({
    store: MongoStore,
    secret: '123456789!@#$%^&*()',
    resave: false,
    saveUninitialized: false
}));

app.get('/', (req,res) => {
    res.send('Servidor express ok!')
})

app.get('/con-session', (req,res) => {
    if (req.session.contador) {
        req.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`)
    } else {
        req.session.contador = 1;
        res.send('Bienvenido!');
    }
})

app.get('/logout', (req,res) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout ok!')
        else res.send({status: 'Logout ERROR', body: err})
    })
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${PORT}`)
});