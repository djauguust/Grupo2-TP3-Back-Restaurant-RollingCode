const Reservas = require("../models/reservas.model");
const Usuarios = require("../models/usuarios.model");
const bcrypt = require("bcrypt");

// FUNCIONES INTERNAS:
const cantComensalesXFechaYHora = (reservas, fecha, hora) => {
  try {
    let reservasFiltradas = [];
    let cantComensales = 0;
    let aux = reservas.map((r) => {
      if (r.fecha === fecha && r.hora === hora) {
        reservasFiltradas = [...reservasFiltradas, r];
        cantComensales += r.comensales;
      }
    });
    return [cantComensales, reservasFiltradas];
  } catch (error) {}
};

const actualYTresTurnosPrevios = (hora) => {
  const hour = parseInt(hora.split(":")[0]);
  const min = parseInt(hora.split(":")[1]);
  const min2 = hora.split(":")[1];
  return [
    `${hora}`,
    `${min == 0 ? `${hour - 1}:30` : `${hour}:00`}`,
    `${hour - 1}:${min2}`,
    `${min == 0 ? `${hour - 2}:30` : `${hour - 1}:00`}`,
  ];
};

const hayDisponibilidad = async (fecha, hora, comensales) => {
  try {
    let array = actualYTresTurnosPrevios(hora);
    let suma = 0;
    const reservasDelDia = await Reservas.find({ fecha: fecha });
    array.map((a) => {
      suma += cantComensalesXFechaYHora(reservasDelDia, fecha, a)[0];
    });
    if (suma <= 10 - comensales) {
      return true;
    } else {
      return false;
    }
  } catch (error) {}
};

const estandarizarHora = (hora) => {
  try {
    const hour = hora.split(":")[0];
    const min = hora.split(":")[1];
    if (min <= 29) {
      return hour + ":00";
    } else {
      return hour + ":30";
    }
  } catch (error) {}
};

//POST
const newReserva = async (req, res) => {
  try {
    const { fecha, hora, comensales, usuario } = req.body;
    const hour = estandarizarHora(hora);
    const algo = await hayDisponibilidad(fecha, hour, comensales);
    if (algo) {
      const reserva = new Reservas({
        fecha,
        hora: hour,
        comensales,
        usuario,
        fueUsada: false,
      });
      await reserva.save();
      res.status(201).json({ message: "¡Reserva Creada!" });
    } else {
      res
        .status(400)
        .json({ message: "¡Capacidad del restaurante insuficiente!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET
const getReservasByFecha = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const result = await Reservas.find({ fecha: fecha });
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAllReservas = async (req, res) => {
  try {
    const allReservas = await Reservas.find();
    const allUsers = await Usuarios.find();
    let array = [];
    const c = allReservas.map((r) => {
      allUsers.find((f) => {
        if (f._id == r.usuario) {
          let aux = {
            _id: r._id,
            fecha: r.fecha,
            hora: r.hora,
            comensales: r.comensales,
            fueUsada: r.fueUsada,
            usuario: {
              _id: f._id,
              nombre: f.nombre,
              apellido: f.apellido,
              email: f.email,
              esActivo: f.esActivo,
              esAdmin: f.esAdmin,
            },
          };
          array = [...array, aux];
          console.log(aux);
        }
      });
    });
    res.status(200).json(array);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//PUT
const updateReserva = async (req, res) => {
  try {
    const id = req.params.id;
    const reserva = await Reservas.findById(id);
    const hour = estandarizarHora(req.body.hora);
    const algo = await hayDisponibilidad(
      req.body.fecha,
      hour,
      req.body.comensales
    );
    if (reserva) {
      if (algo) {
        reserva.fecha = req.body.fecha || reserva.fecha;
        reserva.hora = req.body.hora || reserva.hora;
        reserva.comensales = req.body.comensales || reserva.comensales;

        await reserva.save();
        res.status(201).json({ message: "¡Reserva Modificada!", reserva });
      } else {
        res
          .status(400)
          .json({ message: "¡Capacidad del restaurante insuficiente!" });
      }
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    console.log(error);
  }
};

//DELETE
const deleteReserva = async (req, res) => {
  try {
    const id = req.params.id;
    await Reservas.findOneAndDelete({ _id: id });
    res.status(200).json({ message: "Reserva eliminada" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Reserva no encontrada" });
  }
};

module.exports = {
  newReserva,
  deleteReserva,
  getReservasByFecha,
  getAllReservas,
  updateReserva,
};
