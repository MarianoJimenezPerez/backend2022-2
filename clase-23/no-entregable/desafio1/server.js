const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser("553553")); //indico esto para que el sv tenga la capacidad de recibir e interpretar las cookies

//enviar la cookie server
app.get('/set', (req, res) => {
    res.cookie('server', 'express').send('Cookie Set'); // utilizo la respuesta para enviarle al navegador una cookie llamada server con el valor express.
});

//enviar la cookie server2 con un tiempo de vida de 30 seg
app.get('/setEx', (req, res) => {
    const cookieName = "server2";
    const cookieValue = "express2";
    res.cookie(cookieName, cookieValue, {maxAge: 30000}).send('Cookie SetEx');  // como 3 argumento envío el tiempo máximo de vida de la cookie (30 segundos)
});

//enviar una cookie firmada
app.get('/setSigned', (req, res) => {
    const cookieName = "server3";
    const cookieValue = "express3";
    res.cookie(cookieName, cookieValue, {signed: true} ).send('Cookie SetSigned');  // como 3 argumento envío que la cookie está firmada, dicha firma la paso en la linea 6 vía cookie parser
});

//leer una cookie
app.get('/get', (req, res) => {
    res.send({normales: req.cookies, firmadas: req.signedCookies}); //envío la respuesta de obtener las cookies del sv normales y las cookies firmadas 
});

//borrar una cookie
app.get('/clr', (req, res) => {
    res.clearCookie('server').send('Cookie Clear'); //elimino la cookie server
});

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));
