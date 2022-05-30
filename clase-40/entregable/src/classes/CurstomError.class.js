
class CustomError {
    constructor(codigo, descripcion, detalle) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.detalle = detalle;
    }
};

module.exports = CustomError;