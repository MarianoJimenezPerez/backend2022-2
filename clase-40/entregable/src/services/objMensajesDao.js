/* --------------------------------Modulos-------------------------------- */

const ContenedorMongoDB = require('../containers/ContenedorMongoDB.js');

/* --------------------------------DAO-------------------------------- */

const objMensajesDao = new ContenedorMongoDB(
    'mensajes',
    { 
        author: {
            id: {type: String, require: true},
            nombre: {type: String, require: true}, 
            apellido: {type: String, require: true}, 
            edad: {type: Number, require: true},
            alias: {type: String, require: true},
            avatar: {type: String, require: true},
        },
        hour: {type: String},
        text: {type: String, require: true},
    }    
)

module.exports = objMensajesDao;