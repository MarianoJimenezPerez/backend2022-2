/*
PROCESS.ARGV

Uso de process.argv

    -La forma más sencilla de recuperar argumentos en Node es a través del process.argv. Este es un objeto global que podemos usar sin importar bibliotecas adicionales.

    -Simplemente necesitamos pasar argumentos a una aplicación Node, tal como mostramos anteriormente, y se puede acceder a estos argumentos dentro de la aplicación a través del process.argv.

¿Cómo se usa process.argv?

1-El primer elemento del process.argv, el array, siempre será una ruta del sistema de archivos que apunta al Node ejecutable. 

2-El segundo elemento es el nombre del archivo JavaScript que se está ejecutando.

3-el tercer elemento es el primer argumento que realmente pasó el usuario.

Usando process.argv https://docs.google.com/presentation/d/1s8Gk3HXFtIWZUQkIuY6P9QK6K_QfbscsXS1RV6Ufm7U/edit#slide=id.gf0cf114749_0_144

    -Vemos un script de Node simple que imprima todos los argumentos de la línea de comando pasados ​​a la aplicación, junto con su índice. En el archivo “processargv.js”

    -Lo que hace este script es recorrer el process.argv array e imprime los índices, junto con los elementos almacenados en esos índices. Es muy útil para depurar si alguna vez nos preguntamos qué argumentos estamos recibiendo y en qué orden.

    -Para ejecutar el script, en la terminal nos posicionamos sobre el directorio de ese archivo y ejecutamos el comando:

    -Acá estamos pasando tres argumentos al programa “processargv.js”. El argumento “tom” se almacenará en el segundo índice, mientras que “jack” y “43” se almacenarán en el tercer y cuarto índice, respectivamente. La salida será:

    El primer índice contiene la ruta a nuestro node ejecutable y 
    el segundo índice contiene la ruta al archivo de script.

*/