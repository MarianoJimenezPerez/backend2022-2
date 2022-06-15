/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import logger from "../utils/loggers.js";
import DAO from "../classes/DAO.class.js";

class ProductosDAOMem extends DAO {
    constructor(){
        super();
        this.colecction = [];
    }
    
    listarAll() {
        let docs = [];
        try {
            docs = this.colecction;
            return docs;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listarAll()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elementos listados ${docs.length}`);
        }
    }

    listar(id) {
        let noticia = null;
        
        try {
            noticia = this.colecction.find(noticia => {
                return noticia.id == id;
            });
            return noticia;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar(id)', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    guardar(elemento) {
        let doc = null;
        try {
            let newId;
            if (this.colecction.length == 0) {
                newId = 1
            } else {
                newId = this.colecction[this.colecction.length - 1].id + 1
            }

            doc = {...elemento, id: newId};
            this.colecction.push(doc);
            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento guardado ${JSON.stringify(doc)}`);
        }
    }

    actualizar(elemento){
        let doc = null;
        
        try {
            const index = this.colecction.findIndex( noticia => noticia.id == elemento.id);

            if (index == -1) {
                doc = {code: 401, msg: "id no encontrado"};
            } else {
                this.colecction[index] = elemento;
                doc = this.colecction[index];
            }

            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al actualizar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento modificado ${JSON.stringify(doc)}`);
        }
    }

    borrar(id) {
        let doc = null;
        
        try {
            const index = this.colecction.findIndex( noticia => noticia.id == id);

            if (index == -1) {
                doc = {code: 401, msg: "id no encontrado"};
            } else {
                doc = this.colecction.splice(index, 1);
            }

            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al eliminar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento eliminado ${JSON.stringify(doc)}`);
        }
    }

    validarDuplicidad(id){
        try {
            let noticia = this.colecction.find(noticia => {
                return noticia.id == id;
            });

            if (noticia) {
                return true;   
            } else {
                return false;
            }
        } catch (error) {
            
        }
    }
}

export default ProductosDAOMem;

