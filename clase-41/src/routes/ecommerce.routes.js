import express from 'express';
const router = express.Router();

import EcommerceController from '../controllers/ecommerce.controller.js';

class RouterEcommerce {
    constructor(){
        this.controlador = new EcommerceController();
    }

    start(){

        router.get('/', this.controlador.isAuthenticated, this.controlador.getHome);

        router.get('/signin', this.controlador.getSignin);

        router.get('/signup', this.controlador.getSignup);

        router.post('/signup', this.controlador.insertAccount);

        router.post('/signin', this.controlador.findAccount);

        router.get('/:id?', this.controlador.obtenerNoticia);

        router.put('/:id', this.controlador.actualizarNoticia);

        router.delete('/:id', this.controlador.borrarNoticia);

        return router;
    }
}

export default RouterEcommerce;