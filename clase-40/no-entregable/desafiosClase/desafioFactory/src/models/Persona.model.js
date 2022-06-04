import mongoose from "mongoose";

const PersonaSchema = mongoose.Schema({
    dni: {type:String, required: true},
    nombre: {type:String, required: true},
    apellido: {type:String, required: true}
});

const PersonaModel = mongoose.model('personas', PersonaSchema);

export default PersonaModel;