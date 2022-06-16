import { buildSchema } from 'graphql';

const ProductosSchema = buildSchema(`
  input ProductoInput {
    title: String!,
    price: Int!,
    thumbnail: String!
  }
  type Producto {
    title: String!,
    price: Int!,
    thumbnail: String!
  }
  type Query {
    getProductos: [Producto],
    getProducto(title: String): [Producto]
  }
  type Mutation {
    createProducto(datos: ProductoInput): Producto,
    agregarStock(title: String): Producto
  }
`);

export default ProductosSchema;