/* --------------------------------Modulos-------------------------------- */

const express = require('express');
const {getHome, getCarrito, getRegister, getLogin, getLogout, postAgregarProducto, postLogin, postRegister, postProductoN} = require('./../controllers/operations.js')

/* --------------------------------Routers-------------------------------- */

const router = express.Router();

/* --------------------------------Routes-------------------------------- */

/**************GETS**************/
/* HOME */
router.get('/', getHome);

/* CARRITO */
router.get('/carrito', getCarrito);

/* LOGIN */
router.get('/register', getRegister);

/* LOGIN */
router.get('/login', getLogin);

/* LOGOUT */
router.get('/login', getLogout);

/**************POSTS**************/

/* AGREGAR PRODUCTO AL CARRITO */
router.post('/agregarProducto', postAgregarProducto);

/* LOGIN */
router.post('/login', postLogin);

/* REGISTER */
router.post('/register', postRegister);

/* PRODUCTO NUEVO */
router.post('/productoN', postProductoN);


module.exports = router;