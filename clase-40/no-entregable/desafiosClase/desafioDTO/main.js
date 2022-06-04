import PersonasDAOFile from "./src/services/PersonasDAO.file.js";
import PersonaController from "./src/controllers/Personas.controller.js";

const obj = new PersonasDAOFile();

console.log(await obj.listarAll());
await obj.guardar({dni: '1234', nombre: 'Mario', apellido: 'Bros'});
await obj.guardar({dni: '5678', nombre: 'Luigi', apellido: 'Bros'});
await obj.guardar({dni: '5678', nombre: 'Luigi', apellido: 'Bros'});

console.log(await obj.listarAll());
console.log(await obj.listar('1234'));

// =========== Listar con DTOs

console.log(await PersonaController.listarAll());
console.log(await PersonaController.listar('1234'));
await PersonaController.borrarAll();
