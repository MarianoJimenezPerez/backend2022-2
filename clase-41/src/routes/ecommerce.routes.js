import express from 'express';
const router = express.Router();

import EcommerceController from '../controllers/ecommerce.controller.js';

class RouterEcommerce {
    constructor(){
        this.controlador = new EcommerceController();
    }

    start(){
        router.get('/', this.controlador.getProducts);

        router.get('/:id?', this.controlador.obtenerNoticia);
        
        router.post('/', this.controlador.guardarNoticia);

        router.put('/:id', this.controlador.actualizarNoticia);

        router.delete('/:id', this.controlador.borrarNoticia);

        return router;
    }
}

export default RouterEcommerce;