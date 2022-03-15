/* --------------------------------Modulos-------------------------------- */
const express = require('express');
const router  = express.Router(); 

/* --------------------------------Instancia de express-------------------------------- */

const app = express();

/* --------------------------------Middlewares-------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', router);

/* --------------------------------Rutas-------------------------------- */

router.get('/', (req, res) => {
    res.status(200).send('get ok');  
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


/*
    1) Servidor base con express y router. Para poder utilizarlo se deberá ejecutar en consola:

        npm i express.
    
    2) Agregar en el package.json el código de abajo para poder ejecutar "npm run dev" y abrir con nodemon

        "dev": "nodemon server.js"

    3) Si se desea agregar morgan declarar en modulos:
    
        const morgan = require('morgan');

    e instalar en consola con:

        npm i morgan

    4) Si se desea agregar una carpeta public o cualquier carpeta estática, agregar en middlewares:

        app.use(express.static('public')); 
 */