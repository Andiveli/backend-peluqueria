import { Citas } from "../models/Citas.js";
import { CitasServicios } from "../models/CitasServicios.js";
import { Servicios } from "../models/Servicios.js";

const agregarCita = async (req, res, next) => {
    const cita = new Citas(req.body);
    try {
        const resultado = await cita.save();
        res.status(201).json(resultado);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al agregar la cita" });
    }
}

export {
    agregarCita,
    obtenerCitas
}