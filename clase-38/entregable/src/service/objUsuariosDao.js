/* --------------------------------Modulos-------------------------------- */

const ContenedorMongoDB = require('../containers/ContenedorMongoDB.js');

/* --------------------------------DAO-------------------------------- */

const objUsuariosDao = new ContenedorMongoDB(
    'usuarios',
    { 
        usuario: {
            nombre: {type: String, require: true},
            email: {type: String, require: true},
            password: {type: String, require: true}, 
            edad: {type: Number, require: true},
            direccion: {type: String, require: true},
            telefono: {type: Number, require: true},
            carrito: {type: Array, require: true}
        }
    }   
)

module.exports = objUsuariosDao;