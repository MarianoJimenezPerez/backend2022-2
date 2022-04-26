const { mongoose }  = require('mongoose');

async function conectar(){
    await mongoose.connect('mongodb+srv://marianoroot:5535538@ecommerce.b7leh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');
}

conectar()

class ContenedorMongoDB {
    constructor(coleccion, esquema){
        this.coleccion = mongoose.model(coleccion, esquema)
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
            
            const docs = await this.coleccion.find();
            return docs


        } catch (err) {
            console.log({
                msg: `Se produjo un error al intentar listarTodo desde mongodb en la coleccion ${this.coleccion}: ${err}`
            })
        }
    }
    async listarId(id){
        try {

            const doc = await this.coleccion.find({_id: id});
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