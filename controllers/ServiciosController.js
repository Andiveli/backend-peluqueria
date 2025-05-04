import { Servicios } from "../models/Servicios.js";
import isAdmin from "../middleware/adminMiddleware.js";

const agregarServicios = async (req, res, next) => {
  const servicio = new Servicios(req.body);
    try {
      const resultado = await servicio.save();
      res.status(201).json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error al agregar el servicio" });
    }
};

const obtenerServicios = async (req, res, next) => {
  
  await Servicios.findAll()
    .then((servicios) => {
      res.status(200).json(servicios);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ msg: "Error al obtener los servicios" });
    });
};

const obtenerServicio = async (req, res, next) => {
    const { id } = req.params;
    const servicio = await Servicios.findOne({ where: { id } });
    if (!servicio) {
      const error = new Error("Servicio no encontrado");
      return res.status(404).json({ msg: error.message });
    }
    res.status(200).json(servicio);
};

const actualizarServicio = async (req, res, next) => {
  const { id } = req.params;
    try {
      const servicio = await Servicios.findOne({ where: { id } });
      if (!servicio) {
        const error = new Error("Servicio no encontrado");
        return res.status(404).json({ msg: error.message });
      }
      const resultado = await servicio.update(req.body);
      res.status(200).json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error al actualizar el servicio" });
    }
};

const eliminarServicio = async (req, res, next) => {
  const { id } = req.params;
    try {
      const servicio = await Servicios.findOne({ where: { id } });
      if (!servicio) {
        const error = new Error("Servicio no encontrado");
        return res.status(404).json({ msg: error.message });
      }
      await servicio.destroy();
      res.status(200).json({ msg: "Servicio eliminado" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Error al eliminar el servicio" });
    }
};

export {
  agregarServicios,
  obtenerServicios,
  obtenerServicio,
  actualizarServicio,
  eliminarServicio,
};
