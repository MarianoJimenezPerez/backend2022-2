/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import logger from "../utils/loggers.js";

class PersonasDAOMem {
    constructor(){
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

    listar(dni) {
        let persona = null;
        
        try {
            persona = this.colecction.find(persona => {
                return persona.dni == dni;
            });
            return persona;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al listar(dni)', error);
            logger.error(cuserr);
            throw cuserr;
        }
    }

    guardar(elemento) {
        let doc = null;
        try {
            if(!this.validarDuplicidad(elemento.dni)){
                doc = elemento;
                this.colecction.push(elemento);
                return doc;
            } else {
                doc = {code: 401, msg: "DNI repetido"};
                return doc;
            }
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al guardar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento guardado ${JSON.stringify(doc)}`);
        }
    }

    modificar(elemento){
        let doc = null;
        
        try {
            const index = this.colecction.findIndex( persona => persona.dni == elemento.dni);

            if (index == -1) {
                doc = {code: 401, msg: "DNI no encontrado"};
            } else {
                this.colecction[index] = elemento;
                doc = this.colecction[index];
            }

            return doc;
        } catch (error) {
            const cuserr = new CustomError(500, 'Error al modificar()', error);
            logger.error(cuserr);
            throw cuserr;
        } finally {
            logger.info(`Elemento modificado ${JSON.stringify(doc)}`);
        }
    }

    eliminar(dni) {
        let doc = null;
        
        try {
            const index = this.colecction.findIndex( persona => persona.dni == dni);

            if (index == -1) {
                doc = {code: 401, msg: "DNI no encontrado"};
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

    validarDuplicidad(dni){
        try {
            let persona = this.colecction.find(persona => {
                return persona.dni == dni;
            });

            if (persona) {
                return true;   
            } else {
                return false;
            }
        } catch (error) {
            
        }
    }
}

export default PersonasDAOMem;