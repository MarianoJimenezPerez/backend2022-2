import mongoose from "mongoose";

const UsuarioSchema = mongoose.Schema({
    nombre: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true}, 
    edad: {type: Number, require: true},
    direccion: {type: String, require: true},
    telefono: {type: Number, require: true},
    carrito: {type: Array, require: true}
});

const UsuarioModel = mongoose.model('usuarios', UsuarioSchema);

export default UsuarioModel;