import { Usuario } from "../models/Usuario.js";

const isAdmin = async (req, res, next) => {

    try {
        const usuario = await Usuario.findOne({where: {id: req.usuario.id}});
        if (!usuario) {
            const error = new Error("El usuario no existe");
            return res.status(404).json({ msg: error.message });
        }
        if(usuario.admin) {
            return next()
        } else {
            const error = new Error("No tienes permisos para acceder a esta ruta");
            return res.status(403).json({ msg: error.message });
        }
    } catch (error) {
        const e = new Error("Error al verificar el usuario");
        return res.status(500).json({ msg: e.message });
    }
}
export default isAdmin;