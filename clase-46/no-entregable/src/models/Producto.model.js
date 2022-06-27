import mongoose from "mongoose";

const ProductoSchema = mongoose.Schema({
    title: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true}
});

const ProductoModel = mongoose.model('productos', ProductoSchema);

export default ProductoModel;