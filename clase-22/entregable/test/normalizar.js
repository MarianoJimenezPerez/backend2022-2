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
    const data = await objMensajesDao.listarTodo();
    const dataMensajes = {
        id: '999',
        mensajes: data
    }

    //entidad más pequeña: autores
    
    const schemaAutor = new schema.Entity('author', {}, {idAttribute: 'email'});

    //entidad que le sigue: mensaje

    const schemaMensaje= new schema.Entity('post', {author: schemaAutor});

    //entidad que le sigue: mensajes

    const schemaMensajes = new schema.Entity("comentarios", {mensajes: [ schemaMensaje ]})

    const dataNormalizada = normalize(dataMensajes, schemaMensajes);

    const dataDesnormalizada = denormalize(dataNormalizada.result, schemaMensajes, dataNormalizada.entities)

    const longO = JSON.stringify(dataMensajes).length;
    const longN = JSON.stringify(dataNormalizada).length;
    const longD = JSON.stringify(dataDesnormalizada).length;

    const porcentaje = (longN * 100) / longO
    console.log(`Porcentaje de mejora: `, porcentaje.toFixed(2), `%`)
    print(dataNormalizada);

})();