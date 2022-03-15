/* --------------------------------Imports-------------------------------- */

import Express from 'express';

import { faker } from '@faker-js/faker';


/* --------------------------------Instancia de express-------------------------------- */

const app = Express();

/* --------------------------------Funciones-------------------------------- */

function generarUsuarios(cantidad){
    let usuarios = [];
    for (let i = 0; i < cantidad; i++){
        let usuario = {
            nombre: faker.name.findName(),
            apellido: faker.name.lastName(),
            color: faker.commerce.color() 
        }
        usuarios.push(usuario);
    }

    return usuarios;
}

/* --------------------------------Rutas-------------------------------- */

app.get('/test', (req, res) => {
    let cant = Number(req.query.cant) || 10
    let listaUsuarios = generarUsuarios(cant)
    res.status(200).json({
        msg: listaUsuarios
    });
    /* enviar params así por postman localhost:8080/test?cant=10   si quiero que salgan 10*/
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