/* --------------------------------Modulos-------------------------------- */

const { mongoose }  = require('mongoose');
const ContainerBase = require('../classes/ContainerBase.class.js');
const config = require('../utils/config.js')

/* --------------------------------DB conection--------------------------------*/
const DBurl = config.mongodb.connstr.toString();

async function conectar(){
    await mongoose.connect(DBurl);
    return console.log("DB conectada");
}

async function desconectar(){
    await mongoose.disconnect();
    return console.log("DB desconectada");
}

/* --------------------------------Contenedor mongodb-------------------------------- */

class ContenedorMongoDB extends ContainerBase {
    constructor(coleccion, esquema){
        super();
        this.coleccion = mongoose.model(coleccion, esquema);
    }

    async insertar(objeto){
        try {
            const doc = await this.coleccion.create(objeto);
            return doc
        } catch (err) {
            console.log({
                msg: `Se produjo un error al intentar insertar desde mongodb en la coleccion ${this.coleccion}: ${err}`
            })
        }
    }

    async listarTodo(){
        try {
            await conectar();
            const docs = await this.coleccion.find().lean();
            return docs


        } catch (err) {
            console.log({
                msg: `Se produjo un error al intentar listarTodo desde mongodb en la coleccion ${this.coleccion}: ${err}`
            })
        } finally {
           desconectar()
            /*logger.info(`Elementos listados ${docs.length}`);*/
        }
    }
    async listarId(id){
        try {

            const doc = await this.coleccion.find({_id: id}).lean();
            return doc

        } catch (err) {
            console.log({
                msg: `Se produjo un error al intentar listarId(${id}) desde mongodb en la coleccion ${this.coleccion}: ${err}`
            })
        }
    }

    async eliminarId(id){
        try {
            const doc = await this.coleccion.deleteOne({_id: id});
            return doc

        } catch (err) {
            console.log({
                msg: `Se produjo un error al intentar eliminarId(${id}) desde mongodb en la coleccion ${this.coleccion}: ${err}`
            }) 
        }
    }
}


module.exports = ContenedorMongoDB;