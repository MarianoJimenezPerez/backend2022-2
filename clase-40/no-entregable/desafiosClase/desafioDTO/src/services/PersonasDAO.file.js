/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import logger from "../utils/loggers.js";
import { promises as fs } from 'fs'
import config from "../utils/config.js";

class PersonasDAOFile {
    constructor(ruta) {
        this.ruta = `${config.filedb.pathdb}/personas.json`;
    }

    async listar(dni) {
        try {
            const docs = await this.listarAll();
            const buscado = docs.find(o => o.dni == dni)
            return buscado
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar(dni)', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    async listarAll() {
        let docs = [];

        try {
            docs = await fs.readFile(this.ruta, 'utf-8')
            docs = JSON.parse(docs);
            return docs;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elementos listados ${docs.length}`);
        }
    }

    async guardar(obj) {
        const docs = await this.listarAll();

        const doc = { ...obj}
        docs.push(doc)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2))
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento guardado ${JSON.stringify(doc)}`);
        }
    }

    async actualizar(elem) {

        const docs = await this.listarAll()
        const index = docs.findIndex(o => o.dni == elem.dni)
        
        let doc = null;
        if (index == -1) {
            doc = {code: 401, msg: "DNI no encontrado"};
        } else {
            docs[index] = elem
            doc = elem;
            try {
                await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2));
                return doc;
            } catch (error) {
                const cuserr = new CustomError(500, 'Error al modificar()', error);
                logger.error(cuserr);
                throw cuserr;
            } finally {
                logger.info(`Elemento modificado ${JSON.stringify(doc)}`);
            }
        }
    }

    async borrar(dni) {
        const docs = await this.listarAll();
        const index = docs.findIndex(o => o.dni == dni);

        let doc = null;
        if (index == -1) {
            doc = {code: 401, msg: "DNI no encontrado"};
        } else {
            doc = docs.splice(index, 1);

            try {
                await fs.writeFile(this.ruta, JSON.stringify(docs, null, 2));
                return doc;
            } catch (error) {
                const cuserr = new CustomError(500, 'Error al eliminar()', error);
                logger.error(cuserr);
                throw cuserr;
            } finally {
                logger.info(`Elemento eliminado ${JSON.stringify(doc)}`);
            }
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al borrarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }
}

export default PersonasDAOFile;