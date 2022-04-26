/*

LIBRERÍA WINSTON

¿Qué es Winston?

Winston es una librería con soporte para múltiples transportes diseñada para el registro simple y universal.
Un transporte es esencialmente un dispositivo que nos permiten almacenar mensajes personalizados de seguimiento (al igual que console.log) en un archivo plano o desplegado por consola.
Cada logger de Winston puede tener múltiples transportes, configurados en diferentes niveles.

Para empezar a utilizarlo, primero debemos instalarlo:

    npm i winston

Requerimos el paquete Winston y lo configuramos:

    const winston = require('winston')

    const logger = winston.createLogger({
    level: 'warn',
    transports : [
        new winston.transports.Console({ level:'verbose' }),
        new winston.transports.File({ filename: 'info.log', level:'error' }),
    ]
    })

Dentro del método winston.createLogger definimos primero el nivel de registro que vamos a desplegar.
Luego, en este caso definimos 2 transportes. Uno en el nivel verbose que escribe en consola y otro en nivel error que escribe en el archivo info.log.

Niveles de salida
Los niveles de salida definidos en Winston son: Silly, Debug, Verbose, Info, Warn, Error.
Al igual que en Log4js, se imprime desde el nivel especificado hacia los niveles con mayor prioridad (los anteriores no se imprimen).
Se puede imprimir con el siguiente código, especificando el nivel de salida y el mensaje que se desea imprimir.
Con este código, se va a imprimir en todos los transportes (en el caso que configuramos antes, sería en consola y en el archivo:

    logger.log('level', 'message');

Niveles de salida y transportes
Ejecutando entonces los dos transportes con cada uno de los niveles de salida:
    logger.log('silly', "127.0.0.1 - log silly")
    logger.log('debug', "127.0.0.1 - log debug")
    logger.log('verbose', "127.0.0.1 - log verbose")
    logger.log('info', "127.0.0.1 - log info")
    logger.log('warn', "127.0.0.1 - log warn")
    logger.log('error', "127.0.0.1 - log error")

    
*/