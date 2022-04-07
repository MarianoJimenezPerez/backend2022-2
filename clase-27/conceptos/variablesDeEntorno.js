/*
VARIABLES DE ENTORNO
¿De qué se trata?

    -Las variables de entorno son variables externas a nuestra aplicación que residen en el sistema operativo o en el contenedor de la aplicación que se está ejecutando. Una variable de entorno es simplemente un nombre asignado a un valor.
    -Nos permiten administrar la configuración de nuestras aplicaciones por separado de nuestro código base. 
    -Las configuraciones separadas facilitan la implementación de nuestra aplicación en diferentes entornos (desarrollo, test, producción, etc).
    -Por convención, el nombre se escribe con mayúscula y los valores son cadenas de texto, por ejemplo: PORT=8080.
    -Normalmente, nuestras aplicaciones requieren que se establezcan muchas variables de entorno para que funcionen. Al confiar en configuraciones externas, nuestra aplicación se puede implementar fácilmente en diferentes entornos. Estos cambios son independientes de los cambios en el código, por lo que no requieren que nuestra aplicación sea reconstruida.
    -Los datos que cambian según el entorno en el que se ejecuta su aplicación deben configurarse como variables de entorno. Algunos ejemplos comunes son:
        -Dirección y Puerto HTTP.
        -Credenciales de Base de Datos.
        -Ubicación de archivos y carpetas estáticos.
        -Credenciales de API's externas.

Usando variables de entorno
En primer lugar, en nuestro proyecto, creamos un archivo llamado config.js que centralizará nuestras variables de entorno.



*/