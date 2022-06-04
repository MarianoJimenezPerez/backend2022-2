import PersonasDAOMem from "./src/services/ProductoDAO.mem.js";

const persona = new PersonasDAOMem();

console.log(persona.listarAll());
persona.guardar({dni: '1234', nombre: 'Luigi', apellido: 'Bros'});
persona.guardar({dni: '5678', nombre: 'Mario', apellido: 'Bros'});
persona.guardar({dni: '5678', nombre: 'Mario', apellido: 'Bros'});


console.log(persona.listarAll());
console.log(persona.listar('1234'));

console.log(persona.modificar({dni: '1234', nombre: 'Luigi', apellido: 'Bowser'}));

console.log(persona.listarAll());

console.log(persona.eliminar('1234'));

console.log(persona.listarAll());
