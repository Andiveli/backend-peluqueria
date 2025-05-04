import express from 'express';
import {agregarServicios, obtenerServicios, obtenerServicio, actualizarServicio, eliminarServicio} from '../controllers/ServiciosController.js'
import checkAuth from '../middleware/authMiddleware.js'
import isAdmin from '../middleware/adminMiddleware.js';
const router = express.Router();

router.route("/")
    .post(checkAuth, isAdmin, agregarServicios)
    .get(checkAuth, obtenerServicios);

router.route("/cancelar-cita/:id")
    .get(checkAuth, isAdmin, obtenerServicio)
    .put(checkAuth, isAdmin, actualizarServicio)
    .delete(checkAuth, isAdmin, eliminarServicio);
    
export default router;

