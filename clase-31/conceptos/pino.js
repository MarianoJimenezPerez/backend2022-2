/*

LIBRERÍA PINO

¿Qué es?
Pino es la librería más moderna de las utilizadas actualmente. Es veloz y cuenta con un buen ecosistema de trabajo.

Para empezar a utilizarlo:

Debemos instalarlo: 

    npm i pino

Lo requerimos tal como muestra el siguiente código:

    const logger = require('pino')();

Seteamos su nivel

    logger.level = 'info';

Instancias de Logger

La instancia del Logger es el objeto devuelto por la función principal de Pino.
Su propósito principal es proveer los métodos de logging.
Los métodos por default son: Trace, Debug, Info, Warn, Error y Fatal.
Todos los métodos tienen la siguiente forma genérica:

    logger.method([mergingObject], [message], [...interpolationValues]).

Instancias de Logger MergingObject

Opcionalmente, se puede proporcionar un objeto como primer parámetro. Cada par clave valor enumerable del mergingObject se copia en la línea de log JSON.

Instancias de Logger Message

Se puede proporcionar opcionalmente, un string como parámetro. Por default, se fusiona en el log JSON, en la clave msg.
Este parámetro tiene prioridad respecto al de mergingObject. Es decir, si mergingObject tiene un mensaje y además se especifica el parámetro message, el que se va a imprimir es el de message.
Los string de message, pueden contener algún marcador de posición (placeholder). Estos son “%s” para string, “%d” para dígitos, “%0”, “%o” y “%j” para objetos. Los valores para estos marcadores de posición se proporcionan como un parámetro extra.

Instancias de Logger InterpolationValues

Todos los argumentos suministrados después del mensaje se serializan e interpolan de acuerdo con los marcadores de posición de estilo printf, suministrados para formar el valor de mensaje de salida final para la línea de log JSON.
En el siguiente código, vemos que está solo el parámetro de message.
    logger.info('pino info');
    logger.error('pino error');

Instancias de Logger InterpolationValues

En el siguiente código, en la primera línea usamos el marcador de posición “%d” para el número 42. En las siguientes líneas, utilizamos mergingObjects con distintos objetos.

    logger.info('La respuesta es %d',42)
    logger.info({a:42},'Hola mundo')
    logger.info({a:42,b:2},'Hola mundo')
    logger.info({c: {a:42,b:2}},'Hola mundo')

Método logger.child

El método logger.child permite la creación de registradores con estado (stateful loggers), donde los pares clave-valor se pueden anclar a un logger, lo que hace que se generen en cada línea de log.
Los logger.child usan el mismo flujo de salida que el padre y heredan el nivel de log actual del padre en el momento en que se generan.
El nivel de registro de un logger.child es mutable. Se puede configurar independientemente del padre, ya sea configurando el acceso de nivel después de crear el log secundario o usando la clave reservada bindings.level.
Los logger.child heredan los serializadores del log principal.

En el siguiente código, vemos cómo podemos usar este método.

    const child = logger.child({a: 'property'});
    child.info('Hola child info');
    child.info('Hola child info 2');
    child.error('Hola child error')
*/;