import PersonasDAOFile from "../services/PersonasDAO.file.js";
import PersonaDTO from "../classes/PersonaDTO.class.js";

const prdDAO = new PersonasDAOFile();

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