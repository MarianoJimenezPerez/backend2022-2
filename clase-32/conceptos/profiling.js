/*
PROFILING

¿Qué es?

Profiling en español es análisis de rendimiento. Es la investigación del comportamiento de un programa usando información reunida desde el análisis dinámico del mismo.
El objetivo es averiguar el tiempo dedicado a la ejecución de diferentes partes del programa para detectar los puntos problemáticos y las áreas donde sea posible llevar a cabo una optimización del rendimiento (ya sea en velocidad o en consumo de recursos).​
Un profiler puede proporcionar distintas salidas, como una traza de ejecución o un resumen estadístico de los eventos observados.

Profiling en NodeJs
Cualquier navegador moderno, como Google Chrome, tiene un built-in profiler integrado en DevTools, que registra toda la información sobre las funciones y cuánto tiempo lleva ejecutarlas en un archivo de registro.
Luego, el navegador analiza este archivo de log, brindándonos información legible sobre lo que está sucediendo, para que podamos entenderlo y encontrar cuellos de botella.
Node también tiene un built-in profiler pero con una diferencia: este no analiza archivos de log como los navegadores, sino que simplemente recopila toda la información en estos archivos de log.
Significa que necesita tener alguna herramienta separada que pueda comprender este archivo de log y proporcionarnos la información de forma legible.

Antes de empezar a ver cómo utilizamos el Node built-in profiler, vamos a ver qué es Curl y cómo lo podemos usar para esto.


Curl

Curl es una herramienta de línea de comandos y librería para transferir datos con URL. Se usa en líneas de comando o scripts para transferir datos.
Es utilizado a diario por prácticamente todos los usuarios de Internet en el mundo.
Además, se utiliza en automóviles, televisores, teléfonos móviles, tabletas, entre otros y es el motor de transferencia de Internet para miles de aplicaciones de software en más de diez mil millones de instalaciones.

Curl - instalación
Para usarlo, debemos descargarlo e instalarlo. Lo podemos hacer desde: https://curl.se/download.html
Una vez descargado, descomprimimos el zip y en la carpeta “bin” encontramos el archivo de instalación “.exe” llamado curl.exe. (Posiblemente tengamos que ejecutarlo como administrador)
Una vez instalado, ya lo podemos utilizar como comando en la consola.


La mayoría de las veces, es más fácil usar el profiler que ya tiene Node, en lugar de usar otra herramienta para esto.
Para empezar a usar este profiler, primero creamos una pequeña aplicación en Express con un servidor y algunas rutas.


Configuramos el archivo server.js como sigue:

    const express = require("express");
    const crypto = require("crypto");

    const app = express();

    const users = {};

    app.use(express.static('public'));

    const PORT = parseInt(process.argv[2]) || 8080;
    const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
    server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.get("/getUsers", (req, res) => {
  res.json({ users })
})

app.get("/newUser", (req, res) => {
  let username = req.query.username || "";
  const password = req.query.password || "";

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || users[username]) {
    return res.sendStatus(400);
  }

  const salt = crypto.randomBytes(128).toString("base64");
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

  users[username] = { salt, hash };

  res.sendStatus(200);
});

Con la ruta /getUsers se muestra el listado de usuarios registrados.
Con la ruta /newUser se registra un nuevo usuario.
Se utiliza el módulo crypto para encriptar las contraseñas.

app.get("/auth-bloq", (req, res) => {
  let username = req.query.username || "";
  const password = req.query.password || "";

  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    process.exit(1)
    // return res.sendStatus(400);
  }

  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    process.exit(1)
    // res.sendStatus(401);
  }
});

La ruta /auth-bloq realiza el login del usuario.
En este caso, el proceso por el cual se realizar el login es sincrónico, por lo tanto es un proceso bloqueante.

app.get("/auth-nobloq", (req, res) => {
  let username = req.query.username || "";
  const password = req.query.password || "";
  username = username.replace(/[!@#$%^&*]/g, "");

  if (!username || !password || !users[username]) {
    process.exit(1)
    // return res.sendStatus(400);
  }
  crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
    if (users[username].hash.toString() === hash.toString()) {
      res.sendStatus(200);
    } else {
      process.exit(1)
      //res.sendStatus(401);
    }
  });
});

La ruta /auth-nobloq también realiza el login del usuario.
En este caso, el proceso por el cual se realizar el login es asincrónico, por lo tanto es un proceso NO bloqueante.

Node built-in profiler
Una vez configurado el servidor y las rutas, vamos a usar nuevamente Artillery para realizar los test de carga y obtener la información necesaria.

Finalmente, ya estamos listos para poder prender el servidor, y lo vamos a hacer en modo profiler.
Para eso usamos el siguiente comando: 

    npm --prof server.js


*/