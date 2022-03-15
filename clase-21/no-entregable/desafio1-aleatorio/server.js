/* --------------------------------Modulos-------------------------------- */

const express = require('express');

/* --------------------------------Instancia de express-------------------------------- */

const app = express();

/* --------------------------------Middlewares-------------------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* --------------------------------Arrays-------------------------------- */

const arrayNombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana'];
const arrayApellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei'];
const arrayColores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta'];


/* --------------------------------Funciones-------------------------------- */

function generarUsuarios(nombres, apellidos, colores, cantidad){
    let usuarios = [];
    for (i = 0; i < cantidad; i++){
        let usuario = {
            nombre: nombres[Math.floor(Math.random(nombres) * nombres.length)],
            apellido: apellidos[Math.floor(Math.random(apellidos) * apellidos.length)],
            colores: colores[Math.floor(Math.random(colores) * colores.length)]
        }
        usuarios.push(usuario);
    }

    return usuarios;
}

/* --------------------------------Rutas-------------------------------- */

app.get('/test', (req, res) => {
    let listaUsuarios = generarUsuarios(arrayNombres, arrayApellidos, arrayColores, 10)
    res.status(200).json({
        msg: listaUsuarios
    });  
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