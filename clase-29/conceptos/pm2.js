/*
MÓDULO PM2
¿Qué es?
Es un gestor de procesos (Process Manager), es decir, un programa que controla la ejecución de otro proceso. 
Permite chequear si el proceso se está ejecutando, reiniciar el servidor si este se detiene por alguna razón, gestionar los logs, etc. 
Lo más importante es que PM2 simplifica las aplicaciones de Node para ejecutarlas como cluster.
Es decir, que podemos escribir nuestra aplicación sin pensar en el cluster, y luego PM2 se encarga de crear un número dado de worker processes para ejecutar la aplicación.
Es capaz de aguantar cantidades enormes de tráfico con un consumo de recursos realmente reducido y con herramientas que permiten realizar la monitorización de las aplicaciones de manera remota.
La ventaja principal sobre el módulo forever es el tema del cluster embebido en este módulo, como mencionamos antes.


Empezar a usarlo

npm i pm2 -g

pm2 start app.js

Se puede iniciar la ejecución en modo fork o en modo cluster. Los comandos que utilizamos son:

-----modo fork-----
pm2 start app.js --name"ServerX" --watch -- PORT
pm2 start app.js --name"Server1" --watch -- 8081
pm2 start app.js --name"Server2" --watch -- 8082

-----modo cluster-----
pm2 start app.js --name"ServerX" --watch -i -max -- PORT
pm2 start app.js --name"Server1" --watch -i -max -- 8083


Usar PM2
Podemos listar todas las aplicaciones que se están ejecutando con
    pm2 list
El listado puede resultar muy similar a este
Para detener, reiniciar o eliminar una de las aplicaciones de la lista, podemos ejecutar alguno de los siguientes comandos
    pm2 stop <app_name|namespace|id|'all'|json_conf>
    pm2 restart <app_name|namespace|id|'all'|json_conf>
    pm2 delete <app_name|namespace|id|'all'|json_conf>

Para obtener detalle de una aplicación: 
    pm2 describe <id|app_name>
*/