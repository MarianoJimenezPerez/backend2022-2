
process.on('message', (message) => {
    console.log('Se abrio un nuevo hilo y está corriendo el proceso: ' + process.pid)
    const resultado = recibirYEnviar(message)
    process.send(resultado)   //envio el resultado de este hilo al server
})


function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

function recibirYEnviar(cant) {
    let array = [];
    for (let i = 0; i <= cant; i++){
        array.push(random(1, cant))
    }


    let arrayOrdenado = array.sort();   //ordeno el array de los números obtenidos
    let resultado = [];   //defino un array vacio donde pusheare los objetos que indicaran que numeros salieron sorteados y cuantas veces se repiten
    let contador = 1;
    for (let i = 0; i < arrayOrdenado.length; i++){
        if(arrayOrdenado[i + 1] === arrayOrdenado[i]){   //comparo posición del elemento recorrido con el siguiente, si es igual suma el contador
            contador++
        } else {
            resultado.push({                  // pusheo el objeto con el numero y la cantidad de veces que se repitio
                numero: arrayOrdenado[i],
                repeticiones: contador
            });
            contador = 1;   //reseteo el contador para el siguiente número
        }   
    }

    return(resultado)
}