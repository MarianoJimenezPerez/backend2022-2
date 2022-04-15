/**
¿Qué es?

Cuando ejecutamos un proyecto de Node en un servidor en el que lo tengamos desplegado, dejamos la consola “ocupada” con esa aplicación. Si queremos seguir haciendo cosas o arrancar otro proyecto no podemos, ya que tendríamos que detener la aplicación pulsando Ctrl+C quedando la consola libre nuevamente. 
Por otro lado, si el servidor se parara por un fallo, nuestra aplicación no se arrancaría de nuevo.
Ambos problemas se pueden resolver con el módulo Forever de Node.

Comparación con Nodemon

Como ya vimos, cada vez que hacemos cambios en alguno de los archivos del programa, debemos parar e iniciar nuevamente el servidor.
-El módulo Nodemon de Node, evita esto y se reinicia de forma automática ante cualquier cambio en los archivos del programa en ejecución.
-Sin embargo, Nodemon solo nos sirve en desarrollo. Cuando estamos en producción, no se puede hacer uso de este módulo
-Esta es la ventaja de Forever, ya que este puede utilizarse en producción. Además, nos sirve también para reiniciar el servidor ante un fallo del mismo.

Usando ‘forever’ por línea de comando

forever start <filename> [args]: inicia un nuevo proceso
forever list: lista todos los procesos activos
forever stop <PID>: detiene un proceso según su id de proceso
forever stopall: detiene todos los procesos activos
forever --help: muestra la ayuda completa

*/