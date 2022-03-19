const ContenedorMongoDB = require('../src/ContenedorMongoDB.js')
const { schema, normalize, denormalize } = require('normalizr');
const util = require('util');


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

async function print(obj){
    console.log(util.inspect(obj, false, 12, true ))  //recibe el objeto, boleando para imprimir lo oculto, cantidad máxima de registros, y boleano para colores
}

let imprimir = (async function () {
    let data = await objMensajesDao.listarTodo();
    const dataMensajes = {
        id: '999',
        mensajes: data
    }

    //entidad más pequeña: autores

    const autores = new schema.Entity(
        'autores',
        {},
        {idAttribute: 'email'}
    );

    //entidad que le sigue: mensajes macro
    const mensajesMacro = new schema.Entity('mensajes', {
        mensajes: [autores]
    });

    //entidad que le sigue: mensajes macro


    const dataNormalizada = normalize(dataMensajes, mensajesMacro);

    return print(dataNormalizada);

})();