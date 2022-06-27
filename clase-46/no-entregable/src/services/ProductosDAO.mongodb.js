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
            docs = await this.colecction.find({}).lean()
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

    async listarTitle(title) {
        let doc = {}
        try {
            await this.conn.connect();
            doc = await this.colecction.find({title: title}).lean()
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarTitle()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elemento listado ${doc}`);
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
    async actualizar(title) {
        let doc = {}
        try {
            await this.colecction.updateOne({title: title}, {$set: {stock: 100}});
            doc = await listarTitle(title)
            return doc
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al actualizar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            this.conn.disconnect();
            logger.info(`Elemento actualizado ${doc}`);
        }
    }
}

export default ProductosDAOMongoDB;