/*
¿Qué son las Cookies?
Las Cookies son archivos que podemos guardar del lado del cliente, en el navegador del usuario.

Características
    -A las cookies se les puede configurar un tiempo de vida. Una vez finalizado el mismo, la cookie se elimina del navegador.
    -Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecuada lo que se vaya a guardar como cookie.
    -Hay que recordar que no se deben almacenar datos sensibles en las cookies.

Empezando a usar cookies
Primero hay que instalar el paquete de cookie parser para poder utilizarlas:
    -npm i cookie-parser --save

Hay que requerirlo e incluirlo en la aplicación en la que se lo va a utilizar.
Es un middleware que se requiere a nivel de aplicación.
================================================================

    const express = require('express');
    const cookieParser = require('cookie-parser');
    const app = express();
    app.use(cookieParser());

================Crear una cookie================

En la ruta /set se crea una cookie de nombre “server” y valor “express”. La misma no tiene un tiempo de vida límite.

    app.get('/set', (req, res) => {
    res.cookie('server', 'express').send('Cookie Set');
    });

En la ruta /setEX se crea una cookie de nombre “server2” y valor “express”. En esta, se le seteó un tiempo de vida máximo de 30 segundos.

    app.get('/setEx', (req, res) => {
    res.cookie('server2', 'express2', {maxAge: 30000}).send('Cookie SetEx');
    });

================Leer una cookie================

Este es el código para leer las cookies del ejemplo anterior.
Se utiliza el parámetro de request, y el nombre asignado a la cookie que se quiere leer.

    app.get('/get', (req, res) => {
        res.send(req.cookies);
    });


================Borrar una cookie================

Para eliminar una cookie, se utiliza el parámetro response y el método clearCookie. El parámetro que se le pasa al método es el nombre de la cookie que se desea borrar.

    app.get('/clr', (req, res) => {
        res.clearCookie('server').send('Cookie Clear');
    });


*/