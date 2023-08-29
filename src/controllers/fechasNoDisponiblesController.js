const FechaNDModel = require("../models/fechasNoDisponibles.model");
const FechasND = require("../models/fechasNoDisponibles.model");
const Usuarios = require("../models/usuarios.model");

//GET
const getFechasNoDisponibles = async (req, res) => {
  try {
    const fechas = await FechasND.find();
    const users = await Usuarios.find();
    // TO DO Hacer que solo devuelva las fechas presentes y futuras
    let aux = [];
    let element;
    fechas.map((f) => {
      let user = users.find((u) => u._id == f.admin);
      if (user) {
        element = {
          _id: f._id,
          fecha: f.fecha,
          admin: f.admin,
          restaurant: f.restaurant,
          nombre: user.nombre,
          apellido: user.apellido,
        };
      } else {
        element = {
          _id: f._id,
          fecha: f.fecha,
          admin: f.admin,
          restaurant: f.restaurant,
          nombre: "No encontrado",
          apellido: "No encontrado",
        };
      }
      aux = [...aux, element];
    });
    res.status(200).json(aux);
  } catch (error) {
    res.status(500).json(error);
  }
};

//POST
const newFechaND = async (req, res) => {
  try {
    const { idRestaurant, fecha, idAdmin } = req.body;
    const allFechas = await FechasND.find();
    let fechaRepetido = allFechas.find((e) => e.fecha == fecha);
    if (fechaRepetido) {
      res.status(500).json({ message: "Fecha No Disponible existente" });
    } else {
      const fechaNDisp = new FechaNDModel({
        fecha: fecha,
        admin: idAdmin,
        restaurant: idRestaurant,
      });
      await fechaNDisp.save();
      res.status(201).json({ message: "¡Fecha No disponible Creada!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE
const deleteFecha = async (req, res) => {
  try {
    const id = req.params.id;
    await FechasND.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Fecha No disponible eliminada" });
  } catch (error) {
    res.status(404).json({ error: "Fecha no disponible no encontrada" });
  }
};

module.exports = { deleteFecha, getFechasNoDisponibles, newFechaND };
