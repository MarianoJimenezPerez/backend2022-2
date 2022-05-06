/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const {Server: HttpServer } = require('http');

/* --------------------------------Instancia de express-------------------------------- */

const app = express();
const httpServer = new HttpServer(app); 

/* --------------------------------Rutas-------------------------------- */
/***GETS***/
app.get('/', (req, res, next) => {
    res.status(200).send("Desde Herou");
});

/* --------------------------------Servidor-------------------------------- */
const PORT = process.env.PORT || 8080;
const server = httpServer.listen(PORT, () => {  //escucho al httpserver, quien contiene el express
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
    =====================================================
        PID WORKER ${process.pid}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));
