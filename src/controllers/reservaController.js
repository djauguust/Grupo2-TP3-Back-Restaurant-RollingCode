const Reservas = require("../models/reservas.model");
const bcrypt = require("bcrypt");

// FUNCIONES INTERNAS:
const cantComensalesXFechaYHora = async (reservas, fecha, hora) => {
  try {
    let reservasFiltradas = [];
    let cantComensales = 0;
    let aux = reservas.map((r) => {
      if (r.fecha == fecha && r.hora == hora) {
        reservasFiltradas = [...reservasFiltradas, r];
        cantComensales += r.comensales;
      }
    });
    return cantComensales;
  } catch (error) {}
};

//POST
const newReserva = async (req, res) => {
  try {
    const { fecha, hora, comensales, usuario } = req.body;
    const reserva = new Reservas({
      fecha,
      hora,
      comensales,
      usuario,
      fueUsada: false,
    });
    await reserva.save();
    res.status(201).json({ message: "¡Reserva Creada!" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET
//PUT
//DELETE

module.exports = { newReserva };
