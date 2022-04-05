/*============================[Modulos]============================*/
import express from "express";
import bodyParser from "body-parser";

const app = express();
/*============================[Middlewares]============================*/

/*----------- Otros -----------*/
app.use(bodyParser.urlencoded({ extended: true }));

/*============================[Base de datos]============================*/
const usuariosDB = []

/*============================[Rutas]============================*/
app.get('/', (req, res)=>{
    res.send('Server ok!');
});

/*============================[Servidor]============================*/
const PORT = 5454;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});

