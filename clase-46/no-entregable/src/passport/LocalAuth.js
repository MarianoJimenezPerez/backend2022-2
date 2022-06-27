import passport from 'passport';
import LocalStrategy from 'passport-local';
import ProductosDAOFactory from '../classes/ProductosDAOFactory.class.js';

class LocalAuth {
    constructor(){
        this.DAO = ProductosDAOFactory.get();
    }

    async start(){

        passport.serializeUser((user, cb) => {
            cb(null, user);
        });
        
        passport.deserializeUser( async (user, cb) => {
            cb(null, user);
        });

        passport.use('local-signup', new LocalStrategy.Strategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
            }, async (req, email, password, done) => {
                const user = {
                    usuario: {
                        nombre: req.body.name,
                        email: email,
                        password: password /* await encriptar(password) */,
                        edad: req.body.edad,
                        direccion: req.body.direccion,
                        telefono: req.body.telefono,
                        carrito: []
                    }
                }
                await this.DAO.guardar(user);
        
                //envio mail
                let adminMail = "marianojimenezperez1@gmail.com";
                let asuntoMail = "Nuevo registro app node";
                let cuerpoMail = `
                    <ul>
                        <li>Mail: ${email}<li>
                        <li>Password: ${password}<li>
                    </ul>
                `
                /* await enviarMailRegistro(adminMail, asuntoMail, cuerpoMail) */
        
                //done
                done(null, user)
        }));
        
        passport.use('local-signin', new LocalStrategy ({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
            }, async (req, email, password, done) => {
                const dbUsuarios = await this.DAO.listarAll();
                let encontrado = false;
                for(usuario of dbUsuarios){
                    if( usuario.usuario.email == req.body.email/*  &&
                        desencriptar(req.body.password, usuario.usuario.password) */){
                        encontrado = usuario;
                    }
                }
                done(null, encontrado);
            }
        ));

        return passport;
    }
}

export default LocalAuth;