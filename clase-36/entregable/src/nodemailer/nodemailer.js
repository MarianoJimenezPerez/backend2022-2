const nodemailer = require("nodemailer");

const ADMIN_EMAIL = 'kbcq7xzjlw77syg7@ethereal.email';
const PASS_EMAIL = 'DndgAnujXbqufsgngX';

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ADMIN_EMAIL, // generated ethereal user
      pass: PASS_EMAIL, // generated ethereal password
    },
});

async function enviarMailRegistro(destinatario, asunto, cuerpo){
    // send mail with defined transport object
    let emailContent = {
        from: 'System <elliott.bahringer18@ethereal.email>', // sender address
        to: destinatario, // list of receivers
        subject: asunto, // Subject line
        text: "Nueva cuenta registrada", // plain text body
        html: cuerpo, // html body
    };
    try {
        const info = await transporter.sendMail(emailContent);
    } catch (error) {
        console.log(error);
    }
    
};

module.exports = enviarMailRegistro;