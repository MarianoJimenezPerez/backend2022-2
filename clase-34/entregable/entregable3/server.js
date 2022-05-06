/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const {Server: HttpServer } = require('http');
const app = express();
const httpServer = new HttpServer(app);

/* --------------------------------Rutas-------------------------------- */

/***GETS***/

/* LOGIN */
app.get('/', (req, res, next) => {
    res.status(200).send("Incialización correcta de la niña pequeñita");
});

/* --------------------------------Servidor-------------------------------- */

const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {  //escucho al httpserver, quien contiene el express
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));