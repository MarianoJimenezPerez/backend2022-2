import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";

const FileStoreA = FileStore(session);

const app = express();

app.use(session({
    store: new FileStoreA({
        path: '../session', ttl: 60, retries: 0
    }),
    secret: '1234567890!@#$%^&*()',
    resave: false,
    saveUninitialized: false
}));

function getNombreSession(req) {   //si no existe un nombre, crea uno vacío
    const nombre = req.session.nombre ?? '';
    return nombre;
}

app.get('/', (req, res)=>{
    if (req.session.contador) {
        req.session.contador++
        res.send(`${getNombreSession(req)} visitaste la página ${req.session.contador} veces.`)
    } else {
        req.session.nombre = req.query.nombre; //por query pasamos nuestro nombre
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
  