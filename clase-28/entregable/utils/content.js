const minimist = require('minimist');
const { fork } = require('child_process');
const express = require('express');
const {Server: HttpServer } = require('http');
const app = express();
const httpServer = new HttpServer(app);

const argsObj = minimist(process.argv.slice(2));
const args = Object.values(argsObj)[0];
const max = Math.max.apply(null, args);
const min = Math.min.apply(null, args);
const suma = args.reduce((a, b) => {
    let acumulador = 0;
    acumulador = parseInt(a) + parseInt(b)
    return parseInt(a) + parseInt(b);
});
const promedio = suma/(args.length);
const ejec = process.title;
const pid = process.pid;
const info = {
    datos: {
        numeros: args,
        promedio: promedio,
        max: max,
        min: min,
        ejec: ejec,
        pid: pid
    }
}

const tiposElementos = tipos(args)
evaluar(tiposElementos);

function tipos(args) {
    let array = [];
    args.forEach(element => {
        array.push(typeof(element))
    });
    return array;
}

function evaluar(params){
    params.forEach(element => {
        if(element == 'string'){
            console.log('Error: string detectado');
            process.exit(0)
        }
    });
}



console.log(info)
app.get('/randoms', (req, res, next) => {
    let cant = Number(req.query.cant) || 100000000  // si el param no se ingresa, calculo cien millones de números

    const child = fork('child.js');  //abro un hilo
    child.send(cant); // envio a mi nuevo hilo la cantidad recibida por param para hacerlo no bloqueante
    child.on('message', (message) => {
        res.json(message)
    })
});

const PORT = 8080
const server = httpServer.listen(PORT, () => {  //escucho al httpserver, quien contiene el express
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));