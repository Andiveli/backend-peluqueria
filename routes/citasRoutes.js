import express from 'express'
import checkAuth from '../middleware/authMiddleware.js'
import {
    reservarCita,
    obtenerCitas,
    actualizarCita,
    eliminarCita,
} from '../controllers/CitasServiciosController.js'

import {
    obtenerServicios
} from '../controllers/ServiciosController.js'
import isAdmin from '../middleware/adminMiddleware.js'

const router = express.Router()

router.route("/")
    .post(checkAuth, reservarCita)
    .get(checkAuth, obtenerServicios)

router.route('/citas-pendientes')
    .get(checkAuth, isAdmin, obtenerCitas)

router.route('/acciones-cita/:id')
    .delete(checkAuth, isAdmin, eliminarCita)
    .put(checkAuth, isAdmin, actualizarCita)
export default router;