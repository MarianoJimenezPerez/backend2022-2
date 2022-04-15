const minimist = require('minimist');
const { fork } = require('child_process');
const express = require('express');
const cluster = require("cluster");
const numCPUs = require('os').cpus().length; //devuelve la cantidad de procesadores lógicos
const {Server: HttpServer } = require('http');
const app = express();
const httpServer = new HttpServer(app);

const argsObj = minimist(process.argv.slice(2));
const args = Object.values(argsObj)[0];
const info = {
    datos: {
        metodo: args,
    }
}

const modoSv = detectarModo(args)
const tipo = evaluar(modoSv);

function detectarModo(args) {
    let modo = {};
    
    if(args[0]){
        modo.puerto = parseInt(args[0]);
    }
    if (!args[0]){
        modo.puerto = undefined;
    }
    if(args[1] == 'FORK' || args[1] == 'fork'){
        modo.modo = 'FORK'
    }
    if (args[1] == 'CLUSTER' || args[1] == 'cluster' ){
        modo.modo = 'CLUSTER'
    }

    return modo;
}

function evaluar(params){
    if(params.puerto == undefined){
        console.log("No se ha indicado por parametro(1) el puerto de inicio del servidor")
        process.exit(0);
    }
    if(params.modo == 'FORK'){
        let tipo = 'FORK';
        return tipo
    } else if (params.modo == 'CLUSTER'){
        let tipo = 'CLUSTER';
        return tipo
    } else { // si no recibo por param el modo, freno la ejecución del sv
        console.log("No se ha indicado por parametro (2) el tipo de inicio de servidor (fork o cluster)")
        process.exit(0);
    }
}



app.get('/randoms', (req, res, next) => {
    let cant = Number(req.query.cant) || 10  // si el param no se ingresa, calculo cien millones de números
    const child = fork('child.js');  //abro un hilo
    child.send(cant); // envio a mi nuevo hilo la cantidad recibida por param para hacerlo no bloqueante
    child.on('message', (message) => {
        res.json(message)
    })
});

if(tipo == 'CLUSTER'){
    if(cluster.isMaster){

        console.log(`master ${process.pid} is running`)

        //fork workers, procesos hijos
        for(let i = 0; i < numCPUs; i++ ){
            cluster.fork();  //por cada procesador levanto un proceso hijo
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker-process.pid} died`);
        })

    } else {

        //workers can share any TCP connection, el worker sería como un proceso hijo
        // in this case it is an HHTP Server

        console.log(`worker ${process.pid} started`);
        const server = httpServer.listen(modoSv.puerto, () => { //escucho al httpserver, quien contiene el express
            server.on("error", error => console.log(`Se detecto un error: ${error}`));
        })
    }
}
if(tipo == 'FORK'){
    const server = httpServer.listen(modoSv.puerto, () => { //escucho al httpserver, quien contiene el express
        
        app.get('/randoms', (req, res, next) => {
            let cant = Number(req.query.cant) || 100000000  // si el param no se ingresa, calculo cien millones de números
        
            const child = fork('child.js');  //abro un hilo
            child.send(cant); // envio a mi nuevo hilo la cantidad recibida por param para hacerlo no bloqueante
            child.on('message', (message) => {
                res.json(message)
            })
        });
        
        console.log(
            `
            Servidor Http escuchando en el puerto  ${modoSv.puerto}
            `
        );
        server.on("error", error => console.log(`Se detecto un error: ${error}`));
    })  
}