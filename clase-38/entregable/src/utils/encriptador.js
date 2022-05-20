const bcrypt = require('bcrypt');
const saltRounds = 10;

function encriptar(pass){
    const hash = bcrypt.hashSync(pass, saltRounds);
    return hash
}

function desencriptar(pass, hashed){
    const real = bcrypt.compareSync(pass, hashed);
    return real
}

module.exports = {encriptar, desencriptar};