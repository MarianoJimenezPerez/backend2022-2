import CustomError from "../classes/CustomError.class.js";
import ProductosDAOFactory from "../classes/ProductosDAOFactory.class.js";
import passport from 'passport';

const DAO = ProductosDAOFactory.get();

class EcommerceController {
    isAuthenticated = async (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/signin');
        }
    }
    getHome = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            return res.render('index', {productos: docs});
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
    getSignin = async (req, res) => {
        try {
            return res.render('signin', {});
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
    getSignup = async (req, res) => {
        try {
            return res.render('signup', {});
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
    insertAccount = async (req, res) => {
        try {
            return await passport.authenticate('local-signup', {
                successRedirect: '/',
                failureRedirect: '/register',
                passReqToCallback: true
            })
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
    findAccount = async (req, res) => {
        try {
            return await passport.authenticate('local-signin', {
                successRedirect: '/',
                failureRedirect: '/login',
                passReqToCallback: true
            })
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
    obtenerNoticia = async (req, res) => {
        try {
            res.send('Metodo obtenerNoticia')
        } catch (error) {
            
        }
    }

    guardarNoticia = async (req, res) => {
        try {
            let doc = await DAO.guardar(req.body);
            res.json({metodo: 'Metodo guardarNoticia', data: {...doc}})
        } catch (error) {
            throw new CustomError(500, 'Error en Metodo guardarNoticia', error);
        }
    }

    actualizarNoticia = async (req, res) => {
        try {
            res.send('Metodo actualizarNoticia')
        } catch (error) {
            
        }
    }

    borrarNoticia = async (req, res) => {
        try {
            res.send('Metodo borrarNoticia')
        } catch (error) {
            
        }
    }
}

export default EcommerceController;