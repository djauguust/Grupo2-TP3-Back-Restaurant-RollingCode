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

const hayDisponibilidad = async (fecha, hora, comensales,fueUsada,comensalesInicial,maximoComensales) => {

  try {
    let array = actualYTresTurnosPrevios(hora);
    let suma = 0;
    const reservasDelDia = await Reservas.find({ fecha: fecha });
    array.map((a) => {
      suma += cantComensalesXFechaYHora(reservasDelDia, fecha, a)[0];
    });
    if (suma - comensalesInicial <= maximoComensales - comensales) {
      return {valor : true,};
    } else {
      return {valor : false,
        suma : suma
        };
    }
  } catch (error) {}
};

//hayDisponibilidad()

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

function generarArrayDeHoras() {
  const horas = [];
  let hora = 12;
  let minutos = 0;

  while (hora <= 23 || (hora === 23 && minutos <= 30)) {
    const horaFormateada = `${hora.toString().padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")}`;
    horas.push(horaFormateada);

    minutos += 30;
    if (minutos === 60) {
      minutos = 0;
      hora += 1;
    }
  }

  return horas;
}

//POST
const newReserva = async (req, res) => {
  try {
    const { fecha, hora, comensales, usuario,comensalesInicial, maximoComensales} = req.body;
    const hour = estandarizarHora(hora);
    const algo = await hayDisponibilidad(fecha, hour, comensales,req.body.fueUsada,comensalesInicial,maximoComensales);
    console.log(comensalesInicial);
    if (algo.valor === true) {
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
        .json({ message: `¡Capacidad del restaurante insuficiente!, cantidad disponible =`,
        cantidadDisponible: maximoComensales - algo.suma });
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
    const allUsers = await Usuarios.find();
    let array = [];
    const c = result.map((r) => {
      let a = allUsers.find((f) => f._id == r.usuario);
      let aux;
      if (a) {
        aux = {
          _id: r._id,
          fecha: r.fecha,
          hora: r.hora,
          comensales: r.comensales,
          fueUsada: r.fueUsada,
          usuario: {
            _id: a._id,
            nombre: a.nombre,
            apellido: a.apellido,
            email: a.email,
            esActivo: a.esActivo,
            esAdmin: a.esAdmin,
          },
        };
      } else {
        aux = {
          _id: r._id,
          fecha: r.fecha,
          hora: r.hora,
          comensales: r.comensales,
          fueUsada: r.fueUsada,
          usuario: { _id: r.usuario, nombre: "Usuario NO encontrado" },
        };
      }
      array = [...array, aux];
    });
    res.status(200).json(array);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getReservasByUser = async (req, res) => {
  try {
    const usuario = req.params.idUsuario;
    const result = await Reservas.find();
    let array = [];
    const c = result.map((r) => {
      let aux;
      if (usuario == r.usuario) {
        aux = {
          _id: r._id,
          fecha: r.fecha,
          hora: r.hora,
          comensales: r.comensales,
          fueUsada: r.fueUsada,
        };
        array = [...array, aux];
      }
    });
    if (array.length != 0) {
      res.status(200).json(array);
    } else {
      res.status(400).json({ message: "¡Usuario no encontrado/Usuario sin reservas!" });
    }
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

const getDisponibilidadPorFechaYHora = async (req, res) => {
  try {
    const hora = req.params.hora;
    const fecha = req.params.fecha;
    let array = actualYTresTurnosPrevios(hora);
    let suma = 0;
    const reservasDelDia = await Reservas.find({ fecha: fecha });
    array.map((a) => {
      suma += cantComensalesXFechaYHora(reservasDelDia, fecha, a)[0];
    });
    res.status(200).json(suma);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getHorariosDisponiblesByFecha = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const turnos = generarArrayDeHoras();
    let respuesta = [];
    const promesas = turnos.map(async (t) => {
      let a = await hayDisponibilidad(fecha, t, 1);
      if (a) {
        respuesta = [...respuesta, t];
        return respuesta;
      }
    });
    const resultados = await Promise.all(promesas);
    await res.status(200).json(resultados[resultados.length - 1]);
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
      req.body.comensales,
      req.body.fueUsada,
      req.body.comensalesInicial,
      req.body.maximoComensales
    );
    if (reserva) {
      if (algo.valor === true) {
        reserva.fecha = req.body.fecha || reserva.fecha;
        reserva.hora = hour || reserva.hora;
        reserva.comensales = req.body.comensales || reserva.comensales;
        reserva.fueUsada = req.body.fueUsada || reserva.fueUsada;
        await reserva.save();
        res.status(201).json({ message: "¡Reserva Modificada!", reserva });
      } else {
        res
          .status(400)
          .json({ message: `¡Capacidad del restaurante insuficiente!, cantidad disponible =`,
          cantidadDisponible: req.body.maximoComensales - algo.suma });
      }
    } else {
      res.status(404).json({ error: "Reserva no encontrada" });
    }
  } catch (error) {
    console.log(error);
  }
};

const reservaUsada = async (req, res) => {
  try {
    const id = req.params.id;
    const reserva = await Reservas.findById(id);

    if (reserva) {
      reserva.fueUsada = req.body.fueUsada;

      await reserva.save();
      res.status(201).json({ message: "¡Reserva Utilizada!", reserva });
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
  getDisponibilidadPorFechaYHora,
  getHorariosDisponiblesByFecha,
  reservaUsada,
  getReservasByUser,
};
