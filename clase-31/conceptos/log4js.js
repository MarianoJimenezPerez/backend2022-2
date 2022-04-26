/*

LIBRERÍA LOG4JS

Es una de las librerías de loggers más utilizada. Aunque actualmente está siendo reemplazada por Winston y luego por Pino, que es hoy el más moderno.

Para empezar a utilizarlo, primero debemos instalarlo:

    npm i log4js

Luego, lo requerimos en el app.js o archivo principal de la aplicación.

    const log4js = require('log4js');

Luego, debemos configurarlo, mediante el siguiente código.

    log4js.configure({
    appenders: {
    miLoggerConsole: { type: "console" },
    miLoggerFile: { type: 'file', filename: 'info.log' },
    miLoggerFile2: { type: 'file', filename: 'info2.log' }
    },
    categories: {
    default: { appenders: ["miLoggerConsole"], level: "trace" },
    consola: { appenders: ["miLoggerConsole"], level: "debug" },
    archivo: { appenders: ["miLoggerFile"], level: "warn" },
    archivo2: { appenders: ["miLoggerFile2"], level: "info" },
    todos: { appenders: ["miLoggerConsole", "miLoggerFile"], level: "error" }
    }
    })


Definimos 3 apéndices:
miLoggerConsole usa el apéndice stdout escribe en la salida estándar (consola). Los otros 2, usan el archivo adjunto. miLoggerFile escribe en el archivo info.log y miLoggerFile2 en el archivo info2.log.

Definimos 5 categorías con distintos niveles:
Las categorías default y consola utilizan el apéndice del tipo consola.
Las categorías archivo y archivo2 utilizan los apéndices de tipo file.
La categoría todos utiliza apéndice de tipo consola y tipo file.

Niveles de salida y ventajas

Definimos 6 niveles de salida: Trace, Debug, Info, Warn, Error, Fatal.
Los niveles que se imprimen, son desde el especificado en la configuración de categorías para abajo. Por ejemplo, si el nivel configurado es Warn, se imprimirá solo Warn, Error y Fatal.
La ventaja de esto es que en un entorno de producción podemos solo preocuparnos por las excepciones y errores y no por la información de depuración.
Otra ventaja es que el código se puede mezclar con varios códigos de impresión de registros. Siempre que modifiquemos el nivel de salida en un archivo de configuración, la salida del registro cambiará sin modificar todo el código.

Niveles de salida y categorías

Ejecutando la categoría default
    const logger = log4js.getLogger();
    logger.trace("Entering cheese testing");
    logger.debug("Got cheese.");
    logger.info("Cheese is Comté.");
    logger.warn("Cheese is quite smelly.");
    logger.error("Cheese is too ripe!");
    logger.fatal("Cheese was breeding ground for listeria.");

Niveles de salida y categorías
Es posible definirle a un appender directamente un nivel para que loguee usando ese criterio siempre, independientemente de la categoría que lo use. Esto nos permite, por ejemplo, definir una categoría que loguee en un archivo todo lo que sea nivel info, y loguee por consola todos los errores. Para esto, debemos crear dentro de los appenders un ítem especial que defina dichos criterios:

    appenders: {
    // defino dos soportes de salida de datos
    consola: { type: 'console' },
    archivo: { type: 'file', filename: 'errores.log' },
    // defino sus niveles de logueo
    loggerConsola: { type: 'logLevelFilter', appender: 'consola', level: 'info' },
    loggerArchivo: { type: 'logLevelFilter', appender: 'archivo', level: 'error' }
    },

Luego al definir las categorías, defino una que utilice más de un appender. Es importante que al momento de utilizar appenders con niveles personalizados, definamos el nivel de la categoría como ‘all’, para que permita los distintos valores que definimos anteriormente.

    categories: {
    default: {
        appenders: ['loggerConsola'], level: 'all'
    },
    custom: {
        appenders: ['loggerConsola', 'loggerArchivo'], level: 'all'
    }
    }

    
*/