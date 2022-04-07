/*
Objeto Process

Como ya hemos visto, el objeto process es una variable global disponible en NodeJS que nos ofrece diversas informaciones y utilidades acerca del proceso que está ejecutando un script Node. 
Contiene diversos métodos, eventos y propiedades que nos sirven no solo para obtener datos del proceso actual, sino también para controlarlo.
Al ser un objeto global quiere decir que lo puedes usar en cualquier localización de tu código NodeJS, sin tener que hacer el correspondiente require().

Algunos ejemplos de los datos del proceso que se pueden consultar con el objeto process.

Directorio actual de trabajo:

    process.cwd();

Id del proceso: 

    process.pid;

Version de Node: 

    process.version;

Titulo del proceso;

    process.title;

Sistema operativo:

    process.platform;

Uso de la memoria:

    process.memoryUsage();

Salir de ejecución:
    process.exit(); 

El método exit puede recibir opcionalmente un código de salida. Si no indicamos nada se entiende "0" como código de salida. 
    process.exit(3)

Función ‘.on( )’

La mayor funcionalidad de process está contenida en la función ‘.on()’. 
Dicha función está escuchando durante todo el proceso que se ejecuta, es por eso que solo se puede actuar sobre su callback.
Se define como se definen los eventos en Javascript. En el método on, indicando el tipo de evento que queremos escuchar y un callback que se ejecutará cuando ese evento se dispare.

    process.on("evento", callback);

Evento ‘beforeExit’

Normalmente, el proceso de Node se cerrará cuando no haya trabajo programado, pero un oyente registrado en el evento beforeExit puede realizar llamadas asincrónicas y, por lo tanto, hacer que el proceso de Node continúe.
No debe usarse como una alternativa al evento de exit a menos que la intención sea programar trabajo adicional.

    process.on("beforeExit", (code) => {
        console.log('Process beforeExit event with code', code);
    });

Evento ‘exit’

El evento exit se emite cuando el proceso de Node está a punto de salir como resultado de que:
    -El método process.exit( ) se llama explícitamente.
    -El ciclo de eventos de Node ya no tiene ningún trabajo adicional que realizar.
No hay forma de evitar la salida del bucle de eventos en este punto, y una vez que todos los oyentes de 'salida' hayan terminado de ejecutar, el proceso de Node terminará.

    process.on("exit", (code) => {
        console.log('About no exit with code', code);
    });

Evento ‘uncaughtException’

Se emite cuando una excepción es devuelta hacia el bucle de evento. 
Si se agregó un listener a esta excepción, no se producirá la acción por defecto (imprimir una traza del stack y salir).
Es un mecanismo muy básico para manejar excepciones.

    process.on("uncaughtException", function (err) => {
        console.log('Exepcion recogida', err);
    });

    setTimeOut(function () {
        console.log('Esto seguirá ejecutandose');
    }, 500)

    //se fuerza la exepción pero no se recoge

    nonexistentFunc();

    console.log('Esto no se ejecutará');

‘process.execPath’

Esta propiedad devuelve el nombre de la ruta absoluta del ejecutable que inició el proceso Node. Los enlaces simbólicos, si los hay, se resuelven.

Ejemplo de ruta: 
    '/usr/local/bin/node'

‘process.stdout.write’

La propiedad process.stdout devuelve una secuencia conectada a stdout.
Es un stream de escritura para stdout.

Ejemplo de la definición de console.log: 

    console.log = function (d) {
        process.stdout.write(d + '\n');
    }
*/