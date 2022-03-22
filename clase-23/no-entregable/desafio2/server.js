const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

//Definir un método GET que devuelva todas las cookies presentes.

app.get('/cookies', (req, res) => {
    res.send({normales: req.cookies, firmadas: req.signedCookies}); //envío las cookie normales y las signed
});

//Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
//Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
//Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.

app.post('/', (req, res) => {
    const {nombre, valor, tiempo} = req.body; //destructuro todos estos params que vendrán por ruta
    console.log({nombre, valor, tiempo})
    if(!nombre || !valor){
        res.send({error: 'falta nombre ó valor'});
    } else if (!tiempo) {
        res.cookie(nombre, valor).send({proceso: 'ok, cookie sin tiempo'}); //creo la cookie con los params recibidos (sin tiempo) y envío el objeto "proceso ok"
    } else {
        res.cookie(nombre, valor, {maxAge: tiempo}).send({proceso: 'ok, cookie con tiempo'}); //creo la cookie con los params recibidos (con tiempo) y envío el objeto "proceso ok"
    }                           
});


//Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.

app.delete('/', (req, res) => {
    const {nombre} = req.body;
    if(!nombre){
        res.send({error: 'Ingrese nombre de la cookie a eliminar'}); // si no detecta params, no tiene que eliminar
    } else {
        res.clearCookie(nombre).send('Cookie eliminada'); // si tiene param, tomo el nombre de la cookie a eliminar
    }
});

/*============ SERVIDOR ============*/
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(
        `
        Servidor Http escuchando en el puerto  ${PORT}
        `
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));