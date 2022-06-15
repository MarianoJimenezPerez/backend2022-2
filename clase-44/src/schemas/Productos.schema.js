import { buildSchema } from 'graphql';

const ProductosSchema = buildSchema(`
  type Producto {
    id: ID!
    title: String!,
    price: Int!,
    thumbnail: String!
  }
  type Query {
    getProductos: [Producto],
    getProducto(title: String): Producto,
  }
`);

export default ProductosSchema;