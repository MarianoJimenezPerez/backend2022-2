/*
ARTILLERY

¿Qué es?

Artillery es una dependencia de Node moderna, potente, fácil y muy útil para realizar test de carga a servidores.
Cuenta con un conjunto de herramientas para tests de performance que se usa para enviar aplicaciones escalables que se mantengan eficaces y resistentes bajo cargas elevadas.
Podemos usar Artillery para ejecutar dos tipos de pruebas de rendimiento:
    -Pruebas que cargan un sistema, o sea, pruebas de carga, de estrés.
    -Pruebas que verifican que un sistema funciona como se esperaba, es decir, pruebas funcionales continuas.

Usando Artillery

Para empezar a usar Artillery, primero vamos a instalarlo.

    npm i -g artillery

A continuación, creamos un servidor. En este caso, vamos a poder encender el servidor en modo Fork o en modo Cluster.

    import express from 'express'
    import cluster from 'cluster'
    import { cpus } from 'os'

    const PORT = parseInt(process.argv[2]) || 8080
    const modoCluster = process.argv[3] == 'CLUSTER'

De esta forma terminamos de configurar el servidor:
    if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length

    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
    } else {
    const app = express()

    app.get('/', (req, res) => {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })

    app.listen(PORT, () => {
        console.log(`Servidor express escuchando en el puerto ${PORT}`
        console.log(`PID WORKER ${process.pid}`)
    })
    }

Usando Artillery: Función isPrime

👇 Esta es la función isPrime que utilizamos en el servidor.

    function isPrime(num) {
    if ([2, 3].includes(num)) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num) {
            if (num % i == 0) return false
            i += w
            w = 6 - w
        }
    }
    return true
    }

Su única funciones es recibir un número como parámetro y retornar true si el número es primo o false si no lo es.
Lo que vamos a hacer es realizar el test de carga sobre esta función desde la ruta get “/” configurada en el servidor.

Usando Artillery
Prendemos el servidor en modo Fork con el comando:

    node server.js 8081 FORK

Abrimos otra terminal sobre la carpeta del proyecto y con el siguiente comando hacemos el test de carga:

    artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > result_fork.txt

El resultado se va a guardar en el archivo result_fork.txt. Para poder visualizar el archivo, debemos apagar el servidor una vez finalizado el test.

Hacemos lo mismo con el servidor en modo Cluster:

    node server.js 8081 CLUSTER

    artillery quick --count 50 -n 40 http://localhost:8081?max=100000 > result_cluster.txt

Podemos ahora comparar los resultados de ambos archivos. Nos interesará fijamos en la última parte de los mismos:

    Mean response/sec
    median
    
Podemos ver que la media de respuestas (Mean response/sec) por segundo es mucho más alta en el Cluster, por lo que, comprobamos que es más eficiente.
Los milisegundos de latencia (Response time, median) es más alto en el Fork que en Cluster. Por lo que se vuelve a comprobar que es mejor el servidor en modo Cluster.


*/