/*
SESSION MEMORYSTORE

¿Qué es y cómo se utiliza el memoryStore ?
Cuando nos manejamos con session-memory, de forma predeterminada estaremos utilizando el almacenamiento en memoria: el memoryStore.
Al reiniciar el servidor, estos datos se borran, de modo que no tienen persistencia. Por eso, memoryStore solo está disponible en desarrollo (nunca en producción).

>> Para superar esta limitación utilizaremos Session FileStore.

SESSION FILESTORE

¿Qué es y cómo se utiliza el fileStore ?
Se utiliza igual que memoryStore, con la diferencia de que se crea una carpeta de archivos en donde se almacenan los datos de session.
Estos tendrán persistencia, ya que quedarán guardados en el servidor.

Empezando a usar fileStore
Además de tener instalado el express-session habrá que instalar session-file-store:

    npm i session-file-store --save

Por otro lado, requerimos el session-file-store de la siguiente forma
    ---------------------------------------------------------
    const express = require('express');
    const cookieParser = require('cookie-parser');
    const session = require('express-session');

    --------------Persistencia por file store ---------------

    const Filestore = require('session-file-store')(session);


    ---------------------------------------------------------

Se incluye session como middleware a nivel aplicación, como lo vimos la clase pasada.
Pero se agrega la clave store en el objeto, de la forma que se muestra en la imagen. El path especificado es la ubicación y nombre de la carpeta que se crea.

    -------------- Con import ---------------
    import express from "express";
    import session from "express-session";
    import cookieParser from "cookie-parser";
    import FileStore from "session-file-store";

    const FileStoreA = FileStore(session);

    const app = express();

    app.use(session({
        store: new FileStoreA({
            path: './session', ttl: 60, retries: 0  
        }),
        secret: 'miClave',
        resave: false,
        saveUninitialized: false
    }));

Una vez que se ejecuta el código y se guardan datos en req.session, se crea la carpeta con un archivo .json.
El nombre de este archivo corresponderá a las cookies de session-

*/