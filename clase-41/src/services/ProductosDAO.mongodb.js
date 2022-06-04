/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import MongoDBClient from "../classes/MongoDBClient.js";
import logger from "../utils/loggers.js";
/*========== Modulos especifico para DAOs ==========*/
import ProductoModel from "../models/Producto.model.js";
import DAO from "../classes/DAO.class.js";

class ProductosDAOMongoDB extends DAO{
    constructor(){
        super();
        this.colecction = ProductoModel;
        this.conn = new MongoDBClient();
    }
    
    async listarAll() {
        let docs = [];
        try {
            await this.conn.connect();
            docs = await this.colecction.find({})
            console.log(docs);

            return docs;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elementos listados ${docs.length}`);
        }
    }

    async guardar(elemento) {
        try {
            await this.conn.connect();
            await this.colecction.create(elemento);
            
            return elemento;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elemento guardado ${elemento}`);
        }
    }
}

export default ProductosDAOMongoDB;