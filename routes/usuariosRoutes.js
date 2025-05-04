import express from 'express';
import { 
    perfil, 
    registrar, 
    confirmar, 
    autenticar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    editarPerfil,
    cambiarPass
} from '../controllers/UsuariosController.js';

import checkAuth from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/', registrar);
router.get('/confirmar/:token', confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPassword);

router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, editarPerfil)
router.put('/cambiar-pass/', checkAuth, cambiarPass)


export default router;
