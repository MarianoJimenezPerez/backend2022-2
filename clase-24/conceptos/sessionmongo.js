/*
SESSION MONGO Y MONGO ATLAS
¿Qué es?
Mediante el paquete de Node llamado connect-mongo se puede utilizar la base de datos de MongoDB para persistir los datos almacenados en Session.
Instalación del módulo:
    npm i connect-mongo --save

    ---------------------------------------------------------
    const express = require('express');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');

    --------------Persistencia por mongoDB ---------------

    const connectMongo = require('connect-mongo');
    const MongoStore = connectMongo.create({
        mongoUrl: 'mongodb://localhost:27017/sesiones',
        ttl: 60
    })

    const app = express();

    app.use(cookieParser());
    app.use(session({
        store: MongoStore,
        secret: '123456789!@#$%^&*()',
        resave: false,
        saveUninitialized: false
    }));

    app.get('/', (req,res) => {
        res.send('Servidor express ok!')
    })

Mongo Atlas

Es lo mismo que session con Mongo pero la diferencia es que Atlas es la base de datos en la nube, por lo que allí se van a almacenar los datos de session. 
Se necesitan los mismos módulos que para mongo session y se requieren como se muestra a continuación:

*/