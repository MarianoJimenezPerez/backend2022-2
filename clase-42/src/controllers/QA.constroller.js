import CustomError from "../classes/CustomError.class.js";
import ProductosDAOFactory from "../classes/ProductosDAOFactory.class.js";

const DAO = ProductosDAOFactory.get();

class QAController {
    isAuthenticated = async (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        } else {
            res.redirect('/signin');
        }
    }
    getProducts = async (req, res) => {
        try {
            let docs = await DAO.listarAll();
            return res.send(docs);
        } catch (error) {
            console.log(error)
            // throw new CustomError(500, 'Error en Metodo getProducts', error);
        }
    }
}

export default QAController;