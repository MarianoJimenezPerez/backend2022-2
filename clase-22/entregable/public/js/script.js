/* --------------------------------Globales-------------------------------- */

const tBodyProductos = document.querySelector('#t-body-productos');
const inputTitle = document.querySelector('#input-title');
const inputPrice = document.querySelector('#input-price');
const inputThumbnail = document.querySelector('#input-thumbnail');
const btnProductSubmit = document.querySelector('#btn-product-submit');
const productForm = document.querySelector('#product-form');


/* --------------------------------Funciones-------------------------------- */

function enviarProducto() {
    socket.emit('nuevoProducto', {
        title: inputTitle.value,
        price: inputPrice.value,
        thumbnail: inputThumbnail.value
    })
    return false 
}

btnProductSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    enviarProducto();
    productForm.reset();
});
/* --------------------------------Socket-------------------------------- */

const socket = io.connect();
socket.on('productosHistoricos', productos => {
    tBodyProductos.innerHTML= ''
    productos.forEach(producto => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td>
                <img class="img-thumbnail"src="${producto.thumbnail}"></img>
            </td>
        `
        tBodyProductos.appendChild(tr)
    });
})
