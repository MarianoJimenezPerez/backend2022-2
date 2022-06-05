import assert from 'assert';
import ProductosDAOFactory from '../classes/ProductosDAOFactory.class.js';


describe("Test de lectura y escritura de productos", () => {
    it('Debería leer todos los productos y mostrarlos', async () => {
        const DAO = ProductosDAOFactory.get();
        const docs = await DAO.listarAll();
        assert.strictEqual(docs.length, 6)
    })
})