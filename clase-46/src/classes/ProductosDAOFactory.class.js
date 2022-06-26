import config from "../utils/config.js";
import ProductosDAOMem from "../services/ProductosDAO.mem.js";
import ProductosDAOFile from "../services/ProductosDAO.file.js";
import ProductosDAOMongoDB from "../services/ProductosDAO.mongodb.js";

class ProductosDAOFactory {
    static get() {
        switch (config.srv.persistencia) {
            case 'MEMORIA':
                console.log('Persistencia: ', config.srv.persistencia);
                return new ProductosDAOMem();
            case 'FILE':
                console.log('Persistencia: ', config.srv.persistencia);
                return new ProductosDAOFile ();
            case 'MONGODB':
                console.log('Persistencia: ', config.srv.persistencia);
                return new ProductosDAOMongoDB();
            default:
                return //DAO mem;
        }
    }
}

export default ProductosDAOFactory;