const FechaNDModel = require("../models/fechasNoDisponibles.model");
const FechasND = require("../models/fechasNoDisponibles.model");

//GET
const getFechasNoDisponibles = async (req, res) => {
  try {
    const fechas = await FechasND.find();
    // TO DO Hacer que solo devuelva las fechas presentes y futuras
    res.status(200).json(fechas);
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
    console.log(error);
  }
};

//DELETE
const deleteFecha = async (req, res) => {
  try {
    const id = req.params.id;
    await FechasND.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Fecha No disponible eliminada" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Fecha no disponible no encontrada" });
  }
};

module.exports = { deleteFecha, getFechasNoDisponibles, newFechaND };
