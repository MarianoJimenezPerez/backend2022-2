const minimist = require('minimist');

const argsObj = minimist(process.argv.slice(2));
const args = Object.values(argsObj)[0];
const max = Math.max.apply(null, args);
const min = Math.min.apply(null, args);
const suma = args.reduce((a, b) => {
    let acumulador = 0;
    acumulador = parseInt(a) + parseInt(b)
    return parseInt(a) + parseInt(b);
});
const promedio = suma/(args.length);
const ejec = process.title;
const pid = process.pid;
const info = {
    datos: {
        numeros: args,
        promedio: promedio,
        max: max,
        min: min,
        ejec: ejec,
        pid: pid
    }
}

const tiposElementos = tipos(args)
evaluar(tiposElementos);

function tipos(args) {
    let array = [];
    args.forEach(element => {
        array.push(typeof(element))
    });
    return array;
}

function evaluar(params){
    params.forEach(element => {
        if(element == 'string'){
            console.log('Error: string detectado');
            process.exit(0)
        }
    });
}
console.log(info)