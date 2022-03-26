/*
SESSION REDIS

REDIS:
¿Qué es Redis?
Es un servidor de diccionarios remoto (Remote Dictionary Server).
Almacén de datos clave-valor en memoria de código abierto que se puede utilizar como base de datos, caché y agente de mensajes.
Se debe descargar el archivo comprimido(https://github.com/microsoftarchive/redis/releases) y luego agregar la ruta de la carpeta al PATH del sistema.
Para iniciar el servidor de Redis, en consola: redis-server

Características:
Los datos de Redis se almacenan en memoria del servidor, por lo que el acceso a los mismos es muy rápido.
Tiene mucha flexibilidad en cuanto a las estructuras de datos que admite (strings, listas, hashes, sets, entre otros). De esta forma, el código queda mucho más simple y con menos líneas.
Por persistencia, Redis admite copias de seguridad puntuales (guarda el conjunto de datos en el disco).
Crea soluciones con un alto nivel de disponibilidad, lo que ofrece fiabilidad y rendimiento estables.

Comando Keys
    -Las Redis Keys son binarias y seguras. Esto significa que puede usar cualquier secuencia binaria como clave, ya sea un string o un archivo de imagen.
    -El tipo más usado y recomendado por su mayor simpleza es un string como Redis Keys.
    -Con el uso de los comandos SET y GET configuramos y recuperamos un valor de un string.

SET key value
    -Es el comando con el que se pueden setear nuevos key value.
    -Se le puede especificar un tiempo de expiración en segundos o milisegundos.
    -Da como respuesta “OK” si el comando SET se ejecutó correctamente y, si hubo algún problema, devuelve “Null”.

GET key value
    -Es el comando con el que se puede leer el valor de la key.
    -Devuelve un error si el valor de la key es distinto de un string.
    -Si se ejecuta correctamente devuelve el valor de la key. Si esta no existe, devuelve la palabra reservada nil.

TTL key
    -Devuelve el tiempo de vida que le queda a la key, si es que tiene seteado un timeout.
    -Permite al cliente chequear por cuánto tiempo más esa key va a ser parte del conjunto de datos.
    -Devuelve -1 si la key no existe o no tiene un tiempo de expiración.

Empezando a usar Redis
Además de instalar express-session, se deben instalar las dependencias redis y connect-redis:

    npm i ioredis connect-redis --save

Se requiere redis y connect-redis de la forma que se muestra en la imagen. Además, se crea un Client de redis.

    ---------------------------------------------------------
    const express = require('express');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');

    --------------Persistencia por redis database ---------------

    const redis = require('redis');
    const client = redis.createClient();
    const RedisStore = require('connect-redis')(session);


    -------------- Con import ---------------

    import express from "express";
    import session from "express-session";
    import cookieParser from "cookie-parser";

    import redis from'ioredis';
    import connectRedis from'connect-redis';
    const RedisStore = connectRedis(session); 

    const app = express();

    const client = new redis({
        host: 'localhost',
        port: 6379
    });

    app.use(session({
        store: new RedisStore({
            client: client,
            ttl: 60
        }),
        secret: '1234567890!@#$%^&*()',
        resave: false,
        saveUninitialized: false
    }));


*/
