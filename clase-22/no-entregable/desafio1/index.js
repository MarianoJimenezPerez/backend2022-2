import { normalize, schema} from 'normalizr';



/*
            +++ EJEMPLO BASADO EN POSTS +++

Colección: posts
Entidades: usuarios, comentarios, articulo, posts

****posts: [
    ***{
        id,
        *autor: usuario,
        titulo,
        **comentarios: [
            {
                id,
                *comentador: usuario
            }
        ]
    }
]
*/

const datos = [
    {
        id : '999',
        posts : [
            {
                id: '1',
                autor: {
                    id: '1',
                    name: 'mariano'
                },
                titulo: 'Mi primer posteo, soy Mariano',
                comentarios: [
                    {
                        id: '1',
                        cometador: {
                            id: '1',
                            comentario: 'Dénle like! Soy Mariano'
                        }
                    },
                    {
                        id: '2',
                        cometador: {
                            id: '2',
                            comentario: 'Le dí like! Soy Aldana'
                        }
                    }
                ]
            },
            {
                id: '2',
                autor: {
                    id: '2',
                    name: 'aldana'
                },
                titulo: 'Mi primer posteo, soy Aldana',
                comentarios: [
                    {
                        id: '3',
                        cometador: {
                            id: '2',
                            comentario: 'Dénle like! Soy Aldana'
                        }
                    },
                    {
                        id: '4',
                        cometador: {
                            id: '1',
                            comentario: 'Le dí like! Soy Mariano'
                        }
                    }
                ]
            }
        ]
    }
]

//definir la entidad más pequeña (usuario)

const usuarios = new schema.Entity('usuarios');


//definir la entidad más pequeña que le sigue (comentario) y analizo si se anida algún esquema ya creado

const comentarios = new schema.Entity('cometarios', {
    comentador : usuario //anido el esquema usuario
});


//definir la entidad más pequeña que le sigue (articulo) y analizo si se anida algún esquema ya creado

const articulos = new schema.Entity('articulos', {
    autor: usuario, //anido el esquema usuario
    comentarios: [comentario] //anido el esquema comentario en modo de arreglo, porque contendrá 1 o más
})


//definir la entidad más pequeña que le sigue (post) y analizo si se anida algún esquema ya creado

const posts = new schema.Entity('posts', {
    posts: [articulo] //anido el esquema articulo en modo de arreglos, porque contendrá 1 o más
})


const datosNormalizados = normalize(datos, posts);   // el método normalize pide la data sin normalizar, y el esquema más grande (que contiene a los otros esquemas)

console.log(datos);
console.log(datosNormalizados);

