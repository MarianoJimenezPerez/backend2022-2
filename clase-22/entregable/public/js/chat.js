/* --------------------------------Globales-------------------------------- */

const btnChatSubmit = document.querySelector('#btn-chat-submit');
const inputChatId = document.querySelector('#input-chat-id');
const inputChatMessage = document.querySelector('#input-chat-message');
const inputChatName = document.querySelector('#input-chat-name');
const inputChatLastname = document.querySelector('#input-chat-lastname');
const inputChatYearsold = document.querySelector('#input-chat-yearsold');
const inputChatAlias = document.querySelector('#input-chat-alias');
const inputChatAvatar = document.querySelector('#input-chat-avatar');
const chatBox = document.querySelector('#chat-box');
const regExMail =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const alertEmail = document.querySelector('#alert-email');

/* --------------------------------Funciones-------------------------------- */

function validarEmail(valor){ // devuelve true o false si pasa la regEx
    return regExMail.test(valor)
}

function enviarMensaje() {
    let date = new Date;
    alertEmail.innerHTML = '' //limpio la alerta del mail por si había un mensaje de error en el front
    socket.emit('nuevoMensaje', {
        author: {
            id: inputChatId.value, 
            nombre: inputChatName.value, 
            apellido: inputChatLastname.value, 
            edad: inputChatYearsold.value, 
            alias: inputChatAlias.value,
            avatar: inputChatAvatar.value
        },
        hour: `[${date.getHours()}:${date.getMinutes()}]`,
        text: inputChatMessage.value
    })
}

btnChatSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if(validarEmail(inputChatId.value)){
        enviarMensaje();
        inputChatMessage.value = ''; //limpiamos el input para evitar mensajes repetitivos
    } else {
        alertEmail.innerHTML = 'Debe introducir un mail correcto'
    }
});

/* --------------------------------Socket-------------------------------- */

socket.on('mensajesHistoricos', mensajes => {
    chatBox.innerHTML= ''
    mensajes.forEach(mensaje => {
        let p = document.createElement('p');
        p.innerHTML = `
            <b><span class="chat-autor">${mensaje.author.id}</span></b>
            <span class="chat-hour">${mensaje.hour}:</span>
            <i><span class="chat-message">${mensaje.text}</span>
        `
        chatBox.appendChild(p)
    });
});