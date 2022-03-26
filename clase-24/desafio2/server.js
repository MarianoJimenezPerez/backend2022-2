import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

import redis from 'ioredis';
import connectRedis from'connect-redis';
const RedisStore = connectRedis(session); 

const app = express();

const client = new redis({
    host: 'localhost',
    port: 6379
});

app.use(session({
    store: new RedisStore({
        client: client,
        ttl: 60
    }),
    secret: '1234567890!@#$%^&*()',
    resave: false,
    saveUninitialized: false
}));

function getNombreSession(req) {
    const nombre = req.session.nombre ?? '';
    return nombre;
}

app.get('/', (req, res)=>{
    if (req.session.contador) {
        req.session.contador++
        res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces.`)
    } else {
        req.session.nombre = req.query.nombre;
        req.session.contador = 1
        res.send(`Te damos la Bienvenida ${getNombreSession(req)}`);
    }
});

app.get('/olvidar', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        res.json({ error: 'olvidar', body: err })
      } else {
        res.send(`Hasta luego!`)
      }
    })
})
  
const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor: ${error}`))
  