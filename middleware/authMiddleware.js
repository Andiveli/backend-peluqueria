import jwt from 'jsonwebtoken';
import {Usuario} from '../models/Usuario.js'
const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.usuario = await Usuario.findOne({
                  where: {id: decoded.id},
                  attributes: ['id', 'nombre', 'apellido', 'email', 'admin', 'telefono']
            });
            return next();

        } catch (error) {
            const e = new Error('Token no válido');
            console.log(error);
            return res.status(403).json({msg: e.message});
         }
    }
    if(!token) {
        const error = new Error('Token no valido o inexistente');
        return res.status(403).json({msg: error.nessage})
    }
}

export default checkAuth;
