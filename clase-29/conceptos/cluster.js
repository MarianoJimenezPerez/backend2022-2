/*
¿Qué es Cluster?
Cuando hablamos de Cluster nos referimos al uso de subprocesos que permite aprovechar la capacidad del procesador del servidor donde se ejecute la aplicación.
Como vimos la clase pasada, Node se ejecuta en un solo proceso (single thread), y entonces no aprovechamos la máxima capacidad que nos puede brindar un procesador multicore (múltiples núcleos).
Al usar el cluster, lo que hacemos es, en el caso de estar ejecutando sobre un servidor multicore, hacer uso de todos los núcleos del mismo, aprovechando al máximo su capacidad.

¿Cómo funciona?
Node nos provee un módulo llamado cluster para hacer uso de esto. El mismo, permite crear fácilmente procesos hijo.
Lo que hace es clonar el worker maestro y delegarle la carga de trabajo a cada uno de ellos, de esa manera se evita la sobrecarga a un solo núcleo del procesador.
Con un método similar al que vimos de Fork, se crea una copia del proceso actual. En ese momento, el primer proceso se convierte en maestro o master, y la copia en un trabajador o worker.


Usar el módulo Cluster
Primero requerimos el módulo cluster y el http para crear el servidor.
En la constante numCPUs lo que hacemos es crear tantos workers como CPUs tengamos en el sistema.

    const cluster = require("cluster");
    const hhtp = require("http");
    const numCPUs = require('os').cpus().length; //devuelve la cantidad de procesadores lógicos

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

        http.createServer((req, res) => {
            res.writeHead(200);
            res.end("Hello world\n");
        }).listen(8000);

        console.log(`worker ${process.pid} started`);
    }

Es habitual hacer que el proceso master se dedique únicamente a gestionar a los workers, y que sean los workers los que hagan el “trabajo sucio”.

Entonces, si entra al if crea workers, y si va al else abre el servidor. Como vemos en el código.

-Dentro del for, en el proceso master, creamos un worker por cada CPU.
-Con cluster.on y el comando “exit” controlamos la salida de estos workers.
-Como mencionamos antes, en los workers, es decir, cuando cluster.isMaster es falso, creamos un servidor HTTP.
*/