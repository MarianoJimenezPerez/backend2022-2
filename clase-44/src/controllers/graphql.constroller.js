import CustomError from "../classes/CustomError.class.js";
import ProductosDAOFactory from "../classes/ProductosDAOFactory.class.js";

const DAO = ProductosDAOFactory.get();

const GraphqlController = {
    async getProductos (){
        try {
            let docs = await DAO.listarAll();
            return docs;
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    },
    async getProducto ({ title }){
        try {
            const producto = await DAO.listarTitle(title);
            return producto[0];
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    },
    async createProducto ( datos ){
        try {
            const productoS = JSON.stringify(datos.datos);
            const productoJ = JSON.parse(productoS);
            await DAO.guardar(productoJ);
            return productoJ;
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    },
    async agregarStock ( title, producto ){
        console.log(title)
        try {
            console.log(producto)
            await DAO.actualizar(title, producto)
            return producto;
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
}

export default GraphqlController;