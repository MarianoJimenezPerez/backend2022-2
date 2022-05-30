/* --------------------------------Modulos-------------------------------- */

const ContenedorMongoDB = require('../containers/ContenedorMongoDB.js');

/* --------------------------------DAO-------------------------------- */

const objProductosDao = new ContenedorMongoDB(
    'productos',
    {     
        title: {type: String, require: true},
        price: {type: Number, require: true},
        thumbnail: {type: String, require: true}
    }  
)

module.exports = objProductosDao;