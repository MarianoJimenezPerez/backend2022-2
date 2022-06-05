/* --------------------------------Globales-------------------------------- 

const inputLoginName = document.querySelector('#input-login-name');
const alertNombre = document.querySelector('#alert-nombre');
const btnLoginSubmit = document.querySelector('#btn-login-submit');
const socket2 = io.connect();
*/
/* --------------------------------Funciones-------------------------------- 

function validarNombre(valor){ // devuelve true o false si pasa la regEx
    if(valor != ''){
        return true
    } else {
        return false
    }
}

function enviarLogin() {
    alertNombre.innerHTML = '' //limpio la alerta de nombre por si había un mensaje de error en el front
    socket2.emit('nuevoLogin', {
        nombre: inputLoginName.value
    })
}

btnLoginSubmit.addEventListener('click', (e) => {
    e.preventDefault();
    if(validarNombre(inputLoginName.value)){
        enviarLogin();
        window.location.replace(`/?nombre=${inputLoginName.value}`) //redirecciono a la home
    } else {
        alertNombre.innerHTML = 'Debe introducir un nombre correcto'
    }
});*/