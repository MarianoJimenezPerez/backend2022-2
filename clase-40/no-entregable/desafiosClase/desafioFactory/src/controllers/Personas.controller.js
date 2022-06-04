import PersonasDAOFile from "../services/PersonasDAO.file.js";
import PersonaDTO from "../classes/PersonaDTO.class.js";
import config from "../utils/config.js";
import PersonasDAOMem from "../services/PersonasDAO.mem.js";
import PersonasDAOMongoDB from "../services/PersonasDAO.mongodb.js";

let prdDAO = null;

switch (config.srv.persistencia) {
    case 'mongodb':
        prdDAO = new PersonasDAOMongoDB();
        break;
    case 'file':
        prdDAO = new PersonasDAOFile();
        break;
    case 'memoria':
        prdDAO = new PersonasDAOMem();
        break;
    default:
        break;
}

const PersonaController = {
    async listar(dni){
        let doc = await prdDAO.listar(dni);
        return new PersonaDTO(doc.dni, doc.nombre, doc.apellido);
    },
    async listarAll(){
        let docs = await prdDAO.listarAll();

        let prdDTOs = docs.map(o=>{
            return new PersonaDTO(o.dni, o.nombre, o.apellido);
        })

        return prdDTOs;
    },
    async guardar(elem){
        await prdDAO.guardar(elem);
    },
    async actualizar(dni){
        await prdDAO.actualizar(dni);
    },
    async borrar(dni){
        await prdDAO.borrar(dni);
    },
    async borrarAll(){
        await prdDAO.borrarAll();
    }
}

export default PersonaController;