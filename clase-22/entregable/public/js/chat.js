/* --------------------------------Globales-------------------------------- */

const btnChatSubmit = document.querySelector('#btn-chat-submit');
const inputChatEmail = document.querySelector('#input-chat-email');
const inputChatMessage = document.querySelector('#input-chat-message');
const chatBox = document.querySelector('#chat-box');
const regExMail =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const alertEmail = document.querySelector('#alert-email');

/* --------------------------------Funciones-------------------------------- */

function validarEmail(valor){ // devuelve true o false si pasa la regEx
    return regExMail.test(valor)
}

function enviarMensaje() {
    alertEmail.innerHTML = '' //limpio la alerta del mail por si había un mensaje de error en el front
    let date = new Date
    socket.emit('nuevoMensaje', {
        email: inputChatEmail.value,
        message: inputChatMessage.value,
        hour: `[${date.getHours()}:${date.getMinutes()}]` //envio la fecha de en formato [hora:minutos] de cuando se envía un nuevo mensaje
    })
}

btnChatSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if(validarEmail(inputChatEmail.value)){
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
            <b><span class="chat-autor">${mensaje.email}</span></b>
            <span class="chat-hour">${mensaje.hour}:</span>
            <i><span class="chat-message">${mensaje.message}</span>
        `
        chatBox.appendChild(p)
    });
});