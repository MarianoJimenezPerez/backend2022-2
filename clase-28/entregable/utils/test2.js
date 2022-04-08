function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

let array = [];
let cant = 50;
for (let i = 0; i <= cant; i++){
    array.push(random(1, cant))
}

console.log(array)