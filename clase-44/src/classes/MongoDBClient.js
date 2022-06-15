import CustomError from "./CustomError.class.js";
import DBClient from "./DBClient.class.js";
import config from "../utils/config.js";
import mongoose from "mongoose";

class MongoDBClient extends DBClient {
    constructor(){
        super();
        this.connected = false;
        this.client = mongoose;
        console.log(config.mongodb.connstr);
    }

    async connect(){
        try {

            await this.client.connect(config.mongodb.connstr, config.mongodb.options);
            this.connected = true;

            console.log('Base de datos conectada');
        } catch (error) {
            throw new CustomError(500, "Error al conectarse a mongodb", error);
        }
    }

    async disconnect(){
        try {
            await this.client.connection.close();
            this.connected = false;

            console.log('Base de datos desconectada');
        } catch (error) {
            throw new CustomError(500, "Error al desconectarse a mongodb", error);
        }
    }
}

export default MongoDBClient;