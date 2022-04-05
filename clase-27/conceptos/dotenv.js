/*
DOTENV
¿De qué se trata?
    -Dotenv es un módulo de Node que carga variables de entorno desde un archivo .env a process.env.
    -El desarrollo con múltiples variables de entorno se vuelve rápidamente difícil de mantener. Entonces, utilizamos dotenv para que las variables queden almacenadas todas juntas en el archivo .env.

Usando dotenv

    -En primer lugar, instalamos el módulo con el comando: npm i dotenv
    -Luego, creamos el archivo .env, con las variables de entorno que queremos definir. Por ejemplo:

        FONDO=blanco
        FRENTE=negro

    -Ahora, creamos el archivo config.js, similar al del ejemplo anterior, con el siguiente código:

        require('dotenv').config()

        const fondo = process.env.FONDO
        const frente = process.env.FRENTE

        console.log({
        fondo,
        frente
        })

    -Veremos que las variables se encuentran cargadas correctamente al momento de la ejecución del programa!


Múltiples entornos con dotenv
    -Si deseamos configurar nuestra aplicación en diferentes entornos, dotenv nos permite definir tantos entornos como necesitemos. 
    -Supongamos que necesitamos configurar 2 entornos básicos: a color (colores) y en blanco y negro (byn). Entonces crearemos 2 archivos nuevos colores.env y byn.env, uno para cada entorno, los cuales contendrán la siguiente configuración:

        # byn
        FONDO=blanco
        FRENTE=negro

        # colores
        FONDO=verde
        FRENTE=violeta
    -Dotenv nos permite cargar a traves del método config() y el objeto path, el archivo .env que necesitemos de acuerdo al entorno deseado.

        const path = require('path')
        const dotenv = require('dotenv')

        dotenv.config({
        path:
            process.env.MODO == 'byn'
                ? path.resolve(__dirname, 'byn.env')
                : path.resolve(__dirname, 'colores.env')
        })

        const fondo = process.env.FONDO
        const frente = process.env.FRENTE

        console.log({
        fondo,
        frente
        })

*/  