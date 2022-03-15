/*

¿Qué es normalizr?

Es un paquete muy útil que utiliza la definición de esquemas personalizados para crear datos normalizados.
Se puede instalar desde npm a través de npm i normalizr

Normalizr npm site: https://www.npmjs.com/package/normalizr 
Normalizr github site: https://github.com/paularmstrong/normalizr

Ejemplo de uso en un blog: https://docs.google.com/presentation/d/1utkhMrqmerHoHodSuIhvfWNJEHDTbc3gtF-5shTU-0o/edit#slide=id.gfd88b8612d_0_0


¿Cómo funciona?

    -Normalizr funciona definiendo esquemas y luego declarando cómo estos esquemas se representan a través de entidades.
    -El único requisito es que cada entidad (publicación, comentario, autor)
    tenga la propiedad ‘id’.

////////////////////////////         ////////////////////////////
//////////////////////////// EJEMPLO ////////////////////////////
////////////////////////////         ////////////////////////////


//////////////////////////// ARTICULO ////////////////////////////
{
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}

//////////////////////////// ESTRUCTURA ////////////////////////////

import { normalize, schema } from 'normalizr';
 
// Define a users schema
const user = new schema.Entity('users');
 
// Define your comments schema
const comment = new schema.Entity('comments', {
  commenter: user
});
 
// Define your article
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});
 
const normalizedData = normalize(originalData, article);

//////////////////////////// OUTPUT ////////////////////////////

{
  result: "123",
  entities: {
    "articles": {
      "123": {
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: [ "324" ]
      }
    },
    "users": {
      "1": { "id": "1", "name": "Paul" },
      "2": { "id": "2", "name": "Nicole" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}

*/
