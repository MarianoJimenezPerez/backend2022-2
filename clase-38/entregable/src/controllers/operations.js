/* --------------------------------Modulos-------------------------------- */

const objProductosDao = require('../service/objProductosDao.js');
const session = require('express-session');
const passport = require('passport');
const enviarMailRegistro = require('./../utils/nodemailer.js');
const LocalStrategy = require('passport-local').Strategy;
const {encriptar, desencriptar} = require('./../utils/encriptador.js');

/* --------------------------------Passport -------------------------------- */
passport.use('local-signup', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, email, password, done) => {
        const user = {
            usuario: {
                nombre: req.body.name,
                email: email,
                password: await encriptar(password),
                edad: req.body.edad,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                carrito: []
            }
        }
        await objUsuariosDao.insertar(user);

        //envio mail
        let adminMail = "marianojimenezperez1@gmail.com";
        let asuntoMail = "Nuevo registro app node";
        let cuerpoMail = `
            <ul>
                <li>Mail: ${email}<li>
                <li>Password: ${password}<li>
            </ul>
        `
        await enviarMailRegistro(adminMail, asuntoMail, cuerpoMail)

        //done
        done(null, user)
}));

passport.use('local-signin', new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
    }, async (req, email, password, done) => {
        const dbUsuarios = await objUsuariosDao.listarTodo();
        let encontrado = false;
        for(usuario of dbUsuarios){
            if( usuario.usuario.email == req.body.email &&
                desencriptar(req.body.password, usuario.usuario.password)){
                encontrado = usuario;
            }
        }
        done(null, encontrado);
    }
));

/* --------------------------------Functions-------------------------------- */
function getNombreSession(req) {   //si no existe un nombre, crea uno vacío
    const nombre = req.session.nombre ?? '';
    return nombre;
}

async function getHome(req, res){
    let productos = await objProductosDao.listarTodo();
    if(req.isAuthenticated()){
        try {
            const datosUsuario = {
                nombre: req.user.usuario.nombre
            }
            return res.render('index', {datos: datosUsuario, productos: productos});
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            if(req.session.nombre){
                return res.render('index', {nombre: getNombreSession(req), productos: productos})
            } else {
                req.session.nombre = req.query.nombre;
                return res.render('index', {nombre: getNombreSession(req), productos: productos})
            }
        } catch (error) {
            console.log(error)
        }
    }
    try {
        let productos = await objProductosDao.listarTodo();
        const datosUsuario = {
            nombre: req.user.usuario.nombre
        }
        return res.render('index', {datos: datosUsuario});
    } catch (error) {
        console.log(error)
    }
}

async function getCarrito(req, res){
    if(req.isAuthenticated()){
        try {
            let usuario = req.user.usuario;
            let productosAgregados = usuario.carrito;
            res.render('carrito', {datos: usuario, productosAdd: productosAgregados})
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

async function getRegister(req, res){
    if(req.isAuthenticated()){
        try {
            res.redirect('/');
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            res.render('register', {})
        } catch (error) {
            console.log(error)
        }
    }
}

async function getLogin(req, res){
    if(req.isAuthenticated()){
        try {
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            res.render('login', {})
        } catch (error) {
            console.log(error)
        }
    }
}

async function getLogout(req, res){
    if(req.isAuthenticated()){
        try {
            const nombre = getNombreSession(req);
            const datosUsuario = {
            nombre: req.user.nombre
            }
            req.session.destroy(err => {
                if (err) {
                    res.json({ error: 'olvidar', body: err })
                } else {
                    res.render('logout', {nombre: nombre, datos: datosUsuario})
                }
            })
            req.logout();
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            res.render('login', {})
        } catch (error) {
            console.log(error)
        }
    }
}

async function postAgregarProducto(req, res){
    if(req.isAuthenticated()){
        try {
            const pId = req.body.id;

            let usuario = req.user.usuario;
            let productoDeseado = await objProductosDao.listarId(pId);
            usuario.carrito.push(productoDeseado[0]);
            res.redirect('/carrito');
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            res.redirect('/login')
        } catch (error) {
            console.log(error)
        }
    }
}

async function postLogin(req, res){
    try {
        return passport.authenticate('local-signin', {
            successRedirect: '/',
            failureRedirect: '/login',
            passReqToCallback: true
        })
    } catch (error) {
        console.log(error)
    }
}

async function postRegister(req, res){
    try {
        return await passport.authenticate('local-signup', {
            successRedirect: '/',
            failureRedirect: '/register',
            passReqToCallback: true
        })
    } catch (error) {
        console.log(error)
    }
}

async function postProductoN(req, res){
    try {
        let productoNuevo = {
            title: req.body.title,
            price: req.body.price,
            thumbnail: req.body.thumbnail
        };
        await objProductosDao.insertar(productoNuevo);
        return res.redirect("/")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getHome, getCarrito, getRegister, getLogin, getLogout, postAgregarProducto, postLogin, postRegister, postProductoN};
