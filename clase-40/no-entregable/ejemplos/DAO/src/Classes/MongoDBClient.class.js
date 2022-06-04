import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import config from "../utils/config.js";
import mongoose from "mongoose";
import logger from '../utils/loggers.js'

class MongoDBClient extends DBClient {
    constructor(){
        super();
        this.connected = false;
        this.client = mongoose;
        console.log(config.db.connstr);
    }

    async connect(){
        try {

            await this.client.connect(config.db.connstr, config.db.options);
            this.connected = true;

            logger.info('Base de datos conectada');
        } catch (error) {
            const objErr = new CustomError(500, "Error al conectarse a mongodb", error);
            logger.error(objErr);
            throw objErr;
        }
    }

    async disconnect(){
        try {
            await this.client.connection.close();
            this.connected = false;

            console.log('Base de datos desconectada');
            logger.info('Base de datos desconectada');
        } catch (error) {
            const objErr = new CustomError(500, "Error al desconectarse a mongodb", error);
            logger.error(objErr);
            throw objErr;
        }
    }
}

export default MongoDBClient;