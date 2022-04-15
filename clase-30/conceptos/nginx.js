/*
NGINX
¿Qué es?
Nginx es un servidor web, orientado a eventos (como Node) que actúa como un proxy lo que nos permite redireccionar el tráfico entrante en función del dominio de dónde vienen, hacia el proceso y puerto que nos interese.
Se usa para solucionar el problema que se genera al correr nuestra app Node en el puerto 80, para que sea accesible desde una IP o dominio, y queremos utilizar el mismo puerto con otro proceso.

Configurar Nginx para Windows
Para configurar Nginx para Windows, primero debemos descargarlo del link: http://nginx.org/en/download.html
Descargar la última versión mainline.
Para empezar a configurarlo, en consola (por ejemplo, en el disco C: directamente) descomprimimos el archivo descargado, e inicializamos el Nginx abriendo el ejecutable: nginx.exe
La configuración se encuentra en la carpeta llamada conf.
El espacio público está en la carpeta llamada html.

Luego, para listar los procesos de Nginx, podemos usar el comando tasklist (aunque también podemos usar el Administrador de Tareas).
    -Uno de los procesos es el master y el otro es worker.
    -Si Nginx no inicia, buscar la razón del error en la carpeta logs/error.log.
    -Si no existe el archivo, entonces la razón la encontramos en el Windows Event Log.
Nginx en Windows se ejecuta como una aplicación estándar, pero también se puede operar mediante los siguientes comandos por consola:

    ./nginx.exe -s stop //para un apagado rápido.
    ./nginx.exe -s quit //para un cierre más elegante.
    ./nginx.exe -s reload //para reiniciar el servidor al cambiar la configuración, iniciar nuevos procesos de trabajo con una nueva configuración, cierre elegante de los procesos de trabajo antiguos.
    ./nginx.exe -s reopen //para reabrir logs de archivos.

Configurar Nginx con proxy inverso
Vamos a configurar un servidor Nginx para utilizarlo con proxy inverso.
Para eso, primero, cambiamos el archivo nginx.conf de la carpeta conf del Nginx por el siguiente código.
Podemos ver que están definidos los dos servidores de Node. 
El segundo se está usando como balanceador de carga (por eso se pone  weight=3 ). Si no estuviera el peso, la carga se distribuye mitad para cada uno.
Luego, configuramos el puerto, el nombre del servidor de Nginx y la ruta hacia el espacio público del proyecto en Node. En este caso, un directorio más arriba, dentro del proyecto de servidor node.
Luego, creamos un proyecto de Node, donde el server.js lo configuramos de la siguiente forma.
Debemos tener instalado el módulo PM2 para que todo funcione.
En el código anterior, vemos que está comentada la línea de código del recurso del espacio público
    app.use(express.static('public'));
Está comentado, ya que si nuestro servidor Node se encargará de recursos, perdería rendimiento.
Es por eso que Nginx se encarga de ofrecer los recursos estáticos.

Con esto hecho, ya podemos iniciar el proyecto de Node, tanto en modo Fork como en modo Cluster.
Prender el servidor en modo Fork:
    pm2 start server.js --name="server1" --watch -- 8081
Prender el servidor en modo Cluster:
    pm2 start server.js --name="server2" --watch -i max -- 8082

*/