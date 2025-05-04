import {Usuario} from '../models/Usuario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js'
import emailRegistro from '../helpers/emailRegistro.js';
import emailOlvide from '../helpers/emailOlvide.js';
const registrar =  async (req, res, next) => {
    const {nombre, apellido, email, password, telefono } = req.body;
    const existeUsuario = await Usuario.findOne({where: {email}});
    if(existeUsuario) {
        const error = new Error('El usuario ya existe');
        return res.status(400).json({msg: error.message});
    }

    try {
        const usuario = new Usuario(req.body);
        const usuarioGuardado = await usuario.save();
        if(!usuarioGuardado) {
            const error = new Error('Error al guardar el usuario');
            return res.status(400).json({msg: error.message});
        }
        emailRegistro({ nombre, email, token: usuarioGuardado.token});
        res.json(usuarioGuardado);
    } catch (error) {
        console.log(error);
    }
}

const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Usuario.findOne({where: {token}});
    if(!usuarioConfirmar) {
        const error = new Error('Token no válido');
        return res.status(404).json({msg: error.message});
    }
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.json({msg: 'Usuario confirmado correctamente'});
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Hubo un error'});
    }
}

const autenticar = async (req, res) => {
    const {email, password} = req.body;
    const usuario = await Usuario.findOne({where: {email}});
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(403).json({msg: error.message});
    }
    if(!usuario.confirmado) {
        const error = new Error('El usuario no ha confirmado su cuenta');
        return res.status(403).json({msg: error.message})
    }

    
    if(await usuario.verificarPassword(password)) {
        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            email: usuario.email,
            telefono: usuario.telefono,
            admin: usuario.admin,
            token: generarJWT(usuario.id),
        });
    } else {
        const error = new Error('La contraseña es incorrecta');
        return res.status(403).json({msg: error.message});
    }

}
const perfil = (req, res, next) => {
    const { usuario } = req;
    res.json(usuario);
}

const editarPerfil = async (req, res, next) => {
    const { id } = req.params;
    const usuario = await Usuario.findOne({where: {id}});
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    const { nombre, apellido, email, telefono } = req.body;
    if(email !== usuario.email) {
        const existeEmail = await Usuario.findOne({where: {email}});
        if(existeEmail) {
            const error = new Error('El email ya está en uso');
            return res.status(400).json({msg: error.message});
        }
    }
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.telefono = telefono;
    try {
        const usuarioActualizado = await usuario.save();
        res.json({
            id: usuarioActualizado.id,
            nombre: usuarioActualizado.nombre,
            apellido: usuarioActualizado.apellido,
            email: usuarioActualizado.email,
            telefono: usuarioActualizado.telefono,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Hubo un error'});
    }
}

const olvidePassword = async (req, res, next) => {
    const {email} = req.body;
    const existeUsuario = await Usuario.findOne({where: {email}})
    if(existeUsuario) {
        try {
            existeUsuario.token = generarId();
            const resultado = await existeUsuario.save();
            if(resultado) {
                res.json({msg: 'Email enviado con las instrucciones'});
            }
            emailOlvide({email, nombre: existeUsuario.nombre, token: existeUsuario.token});
        } catch (error) {
            console.log(error);
        }
    } else {
        const error = new Error('El usuario no existe');
        return res.status(403).json({'msg': error.message});

    }
}

const comprobarToken = async (req, res, next) => {
    const { token } = req.params;
    const tokenValido = await Usuario.findOne({where: {token}});
    if(tokenValido) {
        res.json({msg: 'Coloca tu nueva contraseña'});
    } else {
        const error = new Error('El token no es valido');
        return res.status(400).json({msg: error.message});
    }
}

const nuevoPassword = async (req, res, next) => {
    const {token} = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ where: {token}});
    if(!usuario) {
        const error = new Error('Hubo un error ');
        return res.status(400).json({msg: error.message});
    }

    try {
        usuario.token = null;
        usuario.password = password;
        await usuario.save();
        res.json({msg: 'Password cambiada con exito'});
    } catch (error) {
        console.log(error);
    }
}

const cambiarPass = async (req, res) => {
    const { id } = req.usuario;
    const usuario = await Usuario.findOne({where: {id}});
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }
    const { mipass, newpass } = req.body;
    try {
        if(await usuario.verificarPassword(mipass)) {
            usuario.password = newpass;
            const usuarioActualizado = await usuario.save();
            res.json({
                id: usuarioActualizado.id,
                nombre: usuarioActualizado.nombre,
                apellido: usuarioActualizado.apellido,
                email: usuarioActualizado.email,
                telefono: usuarioActualizado.telefono,
            });
        } else {
            const error = new Error('La contraseña es incorrecta');
            return res.status(403).json({msg: error.message});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg: 'Hubo un error'});
    }
}

export {
    registrar,
    confirmar,
    autenticar,
    perfil,
    editarPerfil,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    cambiarPass
}
