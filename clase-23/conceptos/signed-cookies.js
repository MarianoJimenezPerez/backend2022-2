/*
SIGNED COOKIES

Características:
    -A las cookies se les puede agregar un mecanismo de validación que consiste en adjuntar a cada cookie una versión encriptada de su contenido. 
    -Dicha encriptación se realiza mediante una palabra clave o “secreto” definido del lado del servidor, y desconocido por los clientes. 
    -El servidor es capaz de verificar si la cookie que se recibe desde el cliente ha sido adulterada o no, chequeando contra la versión encriptada.

cookieParser(secret)
Secret: string o array de strings que se utiliza para firmar las cookies enviadas, y para analizar las recibidas.
    -Es opcional y, si no se especifica, no firmará ni analizará las cookies recibidas. 
    -Si es un string, se utiliza como secret. Si es un array de strings, se firmará la cookie con cada string en el orden provisto (y lo mismo al analizar).


Crear una cookie firmada
    -Para firmar una cookie antes de enviarla al cliente, solo basta con agregar a los dos argumentos usuales (nombre y valor), un tercer argumento de tipo objeto (como se hizo para setear la expiración) con la propiedad “signed” en true. { signed: true }
    -Las cookies firmadas recibidas, que hayan pasado la verificación de su firma, ya no se encontrarán en req.cookies, sino que aparecerán en req.signedCookies. Aquellas que no hayan pasado la verificación, no aparecerán, como si no existieran.

*/