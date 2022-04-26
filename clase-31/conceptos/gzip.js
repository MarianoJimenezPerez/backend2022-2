/*

                COSAS QUE HACER EN EL CÓDIGO

1) Utilizar la compresión de gzip

Una de las cosas que podemos hacer en el código para mejorar el rendimiento de una aplicación Express al desplegarla en producción es utilizar la compresión de gzip.
Su uso puede disminuir significativamente el tamaño del cuerpo de respuesta y, por lo tanto, aumentar la velocidad de una aplicación web. Utilizamos gzip, un middleware de compresión de Node para la compresión en aplicaciones Express.
Atención: No resulta la mejor opción para una aplicación con tráfico elevado en producción.

    const express = require('express');
    const compression = require('compression');
    const app = express();
    app.use(compression());

2) No utilizar funciones síncronas

Las funciones síncronas y los métodos impiden el avance del proceso de ejecución hasta que vuelven. 
Una llamada individual a una función síncrona puede volver en pocos microsegundos, aunque en sitios web de tráfico elevado, estas llamadas se suman y reducen el rendimiento de la aplicación.
Evite su uso en producción. Para esto, utilizar funciones asíncronas.
La única vez que está justificado utilizar una función síncrona es en el arranque inicial.

3) Realizar un registro correcto

El uso de console.log() o console.err() para imprimir mensajes de registro en el terminal es una práctica común en el desarrollo. No obstante, estas funciones son síncronas cuando el destino es un terminal o un archivo. De este modo, no resultan adecuadas para producción, a menos que canalice la salida a otro programa.
En general, hay dos motivos para realizar un registro desde la aplicación:
    -A efectos de depuración: en lugar de utilizar console.log(), utilice un módulo de depuración especial como debug.
    -Para registrar la actividad de la aplicación (básicamente, todo lo demás): en lugar de utilizar console.log(), utilice una biblioteca de registro como Winston o Bunyan.

4) Manejar las excepciones correctamente

Las aplicaciones Node se bloquean cuando encuentran una excepción no capturada. Si no manejamos las excepciones ni realizamos las acciones necesarias, la aplicación Express se bloqueará y quedará fuera de línea. 
Si seguimos el consejo de asegurarnos de que la aplicación se reinicia automáticamente más abajo, esta se recuperará de un bloqueo.
Las aplicaciones Express normalmente necesitan un breve tiempo de arranque. Igualmente, deseamos evitar el bloqueo en primer lugar y, para ello, deberemos manejar correctamente las excepciones.
Para asegurarnos de manejarlas todas y de forma correcta podemos usar Try/Catch y Promises.

                COSAS QUE HACER EN EL ENTORNO/CONFIGURACIÓN


1) Establecer NODE_ENV en producción

La variable de entorno NODE_ENV especifica el entorno en el que se ejecuta una aplicación (normalmente, desarrollo o producción). Una de las cosas más sencillas que puede hacer para mejorar el rendimiento es establecer NODE_ENV en producción. Puede mejorarlos hasta 3 veces.
Al establecerlo, Express almacenar en caché las plantillas de vistas y los archivos CSS generador y genera menos mensajes de error detallados.
Si necesitamos escribir código específico del entorno, podemos comprobar el valor de NODE_ENV con process.env.NODE_ENV. 
Tener en cuenta que comprobar el valor de una variable de entorno supone una reducción de rendimiento, por lo que debe hacerse 
de forma moderada.

2) Que la App se reinicia automáticamente

En producción, no deseamos que la aplicación esté fuera de línea en ningún momento. Esto significa que debe asegurarse de que se reinicia si la aplicación o el servidor se bloquean. 
Aunque esperamos que no se produzca ninguno de estos sucesos, si somos realistas, debemos tener en cuenta ambas eventualidades de la siguiente manera:
    -Utilizando un gestor de procesos para reiniciar la aplicación (y Node) cuando se bloquea.
    -Utilizando el sistema init que proporciona su OS para reiniciar el gestor de procesos cuando se bloquea el OS.

3) Ejecutar la App en un Cluster

En un sistema multinúcleo, podemos multiplicar el rendimiento de una aplicación Node iniciando un clúster de procesos. 
Como ya vimos, un clúster ejecuta varias instancias de la aplicación, idealmente una instancia en cada núcleo de CPU, lo que permite distribuir la carga y las tareas entre las instancias.
En las aplicaciones en clúster, los procesos worker pueden bloquearse individualmente sin afectar al resto de los procesos. 
Aparte de las ventajas de rendimiento, el aislamiento de errores es otro motivo para ejecutar un clúster de procesos de aplicación. Siempre que se bloquee un proceso worker, hay que asegurarse de registrar el suceso y generar un nuevo proceso utilizando cluster.fork().

4)Almacenar en caché los resultados de la solicitud

Otra estrategia para mejorar el rendimiento en producción es almacenar en caché el resultado de las solicitudes, para que la aplicación no repita la operación de dar servicio a la misma solicitud repetidamente.
Utilizar un servidor de almacenamiento en memoria caché como Nginx, mejora significativamente la velocidad y el rendimiento de la aplicación.

5) Utilizar el balanceador de carga

Una única instancia sólo puede manejar una cantidad limitada de carga y tráfico. Una forma de escalar una aplicación es ejecutar varias instancias de la misma y distribuir el tráfico utilizando un balanceador de carga.
Un balanceador de carga, como ya vimos, es un proxy inverso que orquesta el tráfico hacia y desde los servidores y las instancias de aplicación. 
Entonces, con el balanceador de carga, configurado por ejemplo con Nginx, podemos mejorar el rendimiento y velocidad de la aplicación permitiendo escalarla más que con una sola instancia

6) Utilizar un proxy inverso

Como ya vimos, un proxy inverso se coloca delante de una aplicación web y realiza operaciones de soporte en las solicitudes, aparte de dirigir las solicitudes a la aplicación. Puede manejar las páginas de errores, la compresión, el almacenamiento en memoria caché, el servicio de archivos y el equilibrio de carga, entre otros.
La entrega de tareas que no necesitan saber el estado de la aplicación a un proxy inverso permite a Express realizar tareas de aplicación especializadas. Por este motivo, se recomienda ejecutar Express detrás de un proxy inverso como Nginx en producción.

*/