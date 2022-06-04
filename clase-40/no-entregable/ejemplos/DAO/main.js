import ProductosDAO from "./src/services/ProductosDAO.js";

const obj = new ProductosDAO();

console.log(await obj.guardar({name : "Star Wars Lava Lamp", description : "20inch red lava", price : 200 }));
console.log(await obj.guardar({name : "Laptop", description : "Razer Blade 14inch", price : 600 }));
console.log(await obj.listarAll());