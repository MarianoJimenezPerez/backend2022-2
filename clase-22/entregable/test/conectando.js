const ContenedorMongoDB = require('../src/ContenedorMongoDB.js')


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

async function imprimir(){
    await console.log(await objMensajesDao.listarTodo())
}

async function guardar(){
    await objMensajesDao.insertar({
        author: {
            id: 'desdeBack',
            nombre: 'desdeBack',
            apellido: 'desdeBack',
            edad: 12,
            alias: 'desdeBack',
            avatar: 'desdeBack',
        },
        hour: 'desdeBack',
        text: 'Mensaje insertado desde back'
    })
    await imprimir()
}

guardar()

async function imprimir(){
    await console.log(await objMensajesDao.listarTodo())
}

imprimir()


