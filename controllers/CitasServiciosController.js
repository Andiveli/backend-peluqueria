import { Citas } from "../models/Citas.js";
import { CitasServicios } from "../models/CitasServicios.js";
import { Servicios } from "../models/Servicios.js";
import { Usuario } from "../models/Usuario.js";


const reservarCita = async (req, res, next) => {
    const {fecha, hora, serviciosCita} = req.body;
    if(!fecha || !hora || !serviciosCita.length) {
        const error = new Error("Todos los campos son obligatorios");
        return res.status(400).json({ msg: error.message });
    }
    if(fecha < new Date().toISOString().split('T')[0]) {
        const error = new Error("La fecha no puede ser menor a la actual");
        return res.status(400).json({ msg: error.message });
    } else if (fecha === new Date().toISOString().split('T')[0] && hora < new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })) {
        const error = new Error("La hora no puede ser menor a la actual");
        return res.status(400).json({ msg: error.message });
    }
    //Validar que no haya citas en la misma fecha y hora
    const citaExistente = await Citas.findOne({ where: { fecha, hora } });
    if (citaExistente) {
        const error = new Error("Ya existe una cita en esa fecha y hora");
        return res.status(400).json({ msg: error.message });
    }
    const idServicios = serviciosCita.map(servicio => servicio.id);
    console.log(idServicios);
    const cita = new Citas({
        fecha,
        hora,
        usuarioId: req.usuario.dataValues.id
    })
    try {
        const resultado = await cita.save();
        const serviciosCita = await Promise.all(
            idServicios.map(async (id) => {
                const servicio = await Servicios.findOne({ where: { id: id } });
                if (!servicio) {
                    const error = new Error("Servicio no encontrado");
                    return res.status(404).json({ msg: error.message });
                }
                return new CitasServicios({
                    hora,
                    cliente: req.usuario.dataValues.id,
                    email: req.usuario.dataValues.email,
                    telefono: req.usuario.dataValues.telefono,
                    precio: servicio.precio,
                    citaId: resultado.id,
                    servicioId: id
                })
            })
        )
        await Promise.all(serviciosCita.map( servicioCita => servicioCita.save()));
        res.status(201).json({msg: "Cita reservada correctamente"});
    } catch (error) {
        const e = new Error("Error al reservar la cita");
        return res.status(500).json({ msg: e.message });
    }
}

const obtenerCitas = async (req, res, next) => {
    try {
        const citas = await CitasServicios.findAll();
        const formatear = await Promise.all(
            citas.map(async (cita) => {
                const servicio = await Servicios.findOne({ where: { id: cita.servicioId } });
                const usuario = await Usuario.findOne({ where: { id: cita.cliente } });
                const citaInfo = await Citas.findOne({ where: { id: cita.citaId } });
                return {
                    id: cita.id,
                    citaId: cita.citaId,
                    servicioId: servicio.id,
                    fecha: citaInfo.fecha,
                    hora: citaInfo.hora,
                    cliente: usuario.nombre,
                    email: usuario.email,
                    telefono: usuario.telefono,
                    servicio: servicio.nombre,
                    precio: cita.precio,
                    completa: citaInfo.completa
                }
            })
        )
        const resultado = Object.values(
            formatear.reduce((acc, cita) => {
                const citaId = cita.citaId;
                if (!acc[citaId]) {
                    acc[citaId] = {
                        id: cita.citaId,
                        ids: [],
                        servicioId: [],
                        fecha: cita.fecha,
                        hora: cita.hora,
                        cliente: cita.cliente,
                        email: cita.email,
                        telefono: cita.telefono,
                        servicios: [],
                        precio: 0,
                        completa: cita.completa
                    };
                }
                acc[citaId].ids.push(cita.id);
                acc[citaId].servicioId.push(cita.servicioId);
                acc[citaId].servicios.push(cita.servicio);
                acc[citaId].precio += cita.precio;
                return acc;
            }, {})
        )    
        res.status(200).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener las citas" });
    }
}

const actualizarCita = async (req, res) => {
    const { id } = req.params;
    const cita = await Citas.findOne({ where: { id } });
    if (!cita) {
        const error = new Error("Cita no encontrada");
        return res.status(404).json({ msg: error.message });
    }
    try {
        
        await cita.update({ completa: true });
        res.status(200).json({ msg: "Cita Completada correctamente" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar la cita" });
    }
}

const eliminarCita = async (req, res) => {
    const { id } = req.params;
    try {
        const citasServicios = await CitasServicios.findAll({ where: { citaId: id } });
        const cita = await Citas.findOne({ where: { id } });
        await Promise.all(citasServicios.map(citaServicio => citaServicio.destroy()))
        cita.destroy()
        res.status(200).json({ msg: "Cita eliminada correctamente" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar la cita" });
    }
}
export {
    reservarCita,
    obtenerCitas,
    actualizarCita,
    eliminarCita
}