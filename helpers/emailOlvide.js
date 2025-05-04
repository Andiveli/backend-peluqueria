import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const emailOlvide = async (data) => {
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
        subject: 'Recupera tu cuenta en AppSalon',
        text: 'Recupera tu cuenta en AppSalon',
        html: `<p>Hola ${nombre}, has solicitado recuperar tu cuenta en AppSalon</p>
               <p>Sigue el siguiente enlace para establecer una nueva contraseña:</p>
               <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Restablecer contraseña</a>

               <p>Si no solicitaste este cambio, puedes ignorar este mensaje</p>`,
    });
    console.log('Mensaje enviado: %s', info.messageId);
}

export default emailOlvide;