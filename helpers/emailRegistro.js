import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const emailRegistro = async (data) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    const {nombre, email, token} = data;
    const info = await transporter.sendMail({
        from: `"AppSalon" <no-reply>`,
        to: email,
        subject: 'Confirma tu cuenta en AppSalon',
        text: 'Confirma tu cuenta en AppSalon',
        html: `<p>Hola ${nombre}, confirma tu cuenta en AppSalon</p>
               <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>
               <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a>

               <p>Si no creaste esta cuenta, puedes ignorar este mensaje</p>`,
    });
    console.log('Mensaje enviado: %s', info.messageId);
}

export default emailRegistro;