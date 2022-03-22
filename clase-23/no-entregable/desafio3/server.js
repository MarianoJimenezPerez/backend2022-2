/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const app = express();
const session = require('express-session');

/* --------------------------------Middlewares-------------------------------- */

app.use(session({
    secret: 'secreto',  //llave con la que encripto los valores de sesion
    resave: false,       // 
    saveUninitialized: false //
}));

let contador = 0;

/* --------------------------------Rutas-------------------------------- */

app.get('/', (req, res) => {
    res.status(200).json({contador : contador++});  
})

/*================Guardar datos en session================*/

app.get('/con-session', (req, res) =>{
    if(!req.session.contador){
        req.session.contador = 1;
        res.send('Bienvenido!');
    } else {
        res.session.contador++;
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces`);
    }
})

/*================logout================*/

app.get('/logout', (req, res) =>{
    req.session.destroy(err => {
        if(!err){
            res.send('Logout ok');
        } else {
            res.send({status: 'Logout ERROR', body: err});
        }
    })
})

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