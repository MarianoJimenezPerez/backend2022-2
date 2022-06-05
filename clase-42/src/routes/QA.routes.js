import express from 'express';
const router = express.Router();

import QAController from '../controllers/QA.constroller.js';

class RouterQA {
    constructor(){
        this.controlador = new QAController();
    }

    start(){

        router.get('/getProducts', this.controlador.getProducts);

        return router;
    }
}

export default RouterQA;