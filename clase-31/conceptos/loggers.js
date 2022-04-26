/*
LOGGERS

¿Qué son?

Cuando llevamos un sistema a producción, uno de los elementos más importantes a la hora de detectar cualquier problema o anomalía son los logs.
Cuando hay muchas peticiones concurrentes, los logs de todas ellas se mezclan haciendo imposible su seguimiento salvo que tengan un identificador único.

📝 Un log o historial de log refiere al registro secuencial de cada uno de los eventos que afectan un proceso particular constituyendo una evidencia del comportamiento del sistema.

Los loggers son librerías para facilitar la impresión de un identificador único.
Tienen la ventaja de que no necesitamos usar console.log para el registro de sucesos en el servidor, lo cual es más eficiente y permiten clasificar los mensajes por niveles de debug y enviarlos a distintos medios: file, database, email, consola, etc.

*/