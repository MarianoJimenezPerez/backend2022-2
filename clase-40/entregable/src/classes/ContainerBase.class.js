/* --------------------------------Modulos-------------------------------- */

const CustomError = require('./CurstomError.class.js');

/* --------------------------------Contenedor base-------------------------------- */

class ContainerBase {
    async insertar(){
        throw new CustomError(500, "Falta implementar 'insertar' en Sub Clase");
    };
    async listarTodo(){
        throw new CustomError(500, "Falta implementar 'listarTodo' en Sub Clase");
    };
    async listarId(){
        throw new CustomError(500, "Falta implementar 'listarId' en Sub Clase");
    };
    async eliminarId(){
        throw new CustomError(500, "Falta implementar 'eliminarId' en Sub Clase");
    };
    
}

module.exports = ContainerBase;