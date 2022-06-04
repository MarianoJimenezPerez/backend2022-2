/*========== Modulos globales para DAOs ==========*/
import CustomError from "../Classes/CustomError.class.js";
import logger from "../utils/loggers.js";
import { promises as fs } from 'fs'
import config from "../utils/config.js";
import DAO from "./DAO.class.js";

class PersonasDAOFile extends DAO {
    constructor(ruta) {
        super();
        this.ruta = `${config.filedb.pathdb}/personas.json`;
    }

    async listar(dni) {
        const objs = await this.listarAll()
        const buscado = objs.find(o => o.dni == dni)
        return buscado
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async guardar(obj) {
        const objs = await this.listarAll();

        const newObj = { ...obj}
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newObj
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(elem) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.dni == elem.dni)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${id}`)
        } else {
            objs[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        }
    }

    async borrar(dni) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.dni == dni)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

export default PersonasDAOFile;