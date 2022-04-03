/*============================[Modulos]============================*/
import express from "express";
import bodyParser from "body-parser";

import jwt from "jsonwebtoken";
const PRIVATE_KEY = '1234567890!@#$%^&*()';

const app = express();
/*============================[Middlewares]============================*/
function generateToken(user) {
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn: '60s'})
    return token;
}

function auth(req, res, next) {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"] || '';

    if (!authHeader) {
        return res.status(401).json({error: 'not authenticated'});
    }

    console.log('TOKEN', authHeader);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, PRIVATE_KEY, (err, datos)=>{
        if (err) {
            return res.status(403).json({
                error: 'not authorized'
            });
        }

        console.log('datos', datos)

        req.user = datos;
        next();
    });
}

/*----------- Otros -----------*/
app.use(bodyParser.urlencoded({ extended: true }));

/*============================[Base de datos]============================*/
const usuariosDB = []

/*============================[Rutas]============================*/
app.get('/', (req, res)=>{
    res.send('Server ok!');
});

app.post('/login', (req, res)=>{
    const { nombre, password } = req.body

    const existeUsuario = usuariosDB.find(usr => usr.nombre == nombre && usr.password == password);
    if (existeUsuario) {
        const accessToken = generateToken(existeUsuario);
        res.status(200).json({codigo: 200, msg: 'Usuario logueado!', accessToken: accessToken});
    } else {
        return res.json({error: 'Credenciales incorrectas'});
    }
});

app.post('/registro', (req, res)=>{
    const { nombre, password, direccion } = req.body;
    console.log('registro body', req.body)
    const existeUsuario = usuariosDB.find(usr => usr.nombre == nombre);
    if (existeUsuario) {
        return res.json({error: 'Usuario ya existe'});
    } else {
        const datosUsuario = { nombre, password, direccion }
        usuariosDB.push(datosUsuario);

        const accessToken = generateToken(datosUsuario);
        res.status(200).json({codigo: 200, msg: 'Usuario registrado!', accessToken: accessToken});
    }
});

app.get('/datos', auth, (req, res)=>{
    const datosUsuario = usuariosDB.find(usr => usr.nombre == req.user.nombre);
    res.json(datosUsuario);
});

/*============================[Servidor]============================*/
const PORT = 5454;
const server = app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en puerto ${PORT}`);
})
server.on('error', error=>{
    console.error(`Error en el servidor ${error}`);
});

