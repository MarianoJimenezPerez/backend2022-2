import mongoose from "mongoose";

const MensajeSchema = mongoose.Schema({
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
});

const MensajeModel = mongoose.model('mensajes', MensajeSchema);

export default MensajeModel;