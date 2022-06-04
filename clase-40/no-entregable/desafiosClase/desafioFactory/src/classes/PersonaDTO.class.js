class PersonaDTO {
    constructor(dni, nombre, apellido){
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
    }

    getDni(){
        return this.dni;
    }

    setDni(dni){
        return this.dni = dni;
    }

    getNombre(){
        return this.nombre;
    }

    setNombre(nombre){
        return this.Nombre = nombre;
    }

    getApellido(){
        return this.apellido;
    }

    setApellido(apellido){
        return this.apellido = apellido;
    }
}

export default PersonaDTO;