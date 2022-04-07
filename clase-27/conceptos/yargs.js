/*
YARGS

Usando yargs
    -Otro módulo que nos ayudará a analizar los argumentos de la línea de comandos pasados ​​a los programas de Node es el módulo yargs. Inicialmente funciona de igual manera que Minimist, con algunas modificaciones y en su sintaxis. Sin embargo, esta librería posee muchísimas más funcionalidades.

    -Lo instalamos con npm (npm i yargs) y lo utilizamos de la siguiente manera:
        const yargs = require('yargs/yargs')(process.argv.slice(2))
        const args = yargs.argv

    Si queremos agregar valores por defecto, lo hacemos de la siguiente manera:

    const yargs = require('yargs/yargs')(process.argv.slice(2))
    const args = yargs
    .default({
        nombre: 'pepe',
        apellido: 'copado'
    })
    .argv

    Si queremos agregar alias, lo hacemos de la siguiente manera:

    const yargs = require('yargs/yargs')(process.argv.slice(2))
    const args = yargs
    .alias({
        n: 'nombre',
        a: 'apellido'
    })
    .argv

    Si queremos que algún argumento sea interpretado como un valor booleano, lo hacemos de la siguiente manera:

    const yargs = require('yargs/yargs')(process.argv.slice(2))
    const args = yargs
    .boolean('vivo')
    .argv

    Para ver el resto de las (innumerables!) funcionalidades, se puede consultar la documentación oficial:
        https://github.com/yargs/yargs/blob/HEAD/docs/api.md
    
*/