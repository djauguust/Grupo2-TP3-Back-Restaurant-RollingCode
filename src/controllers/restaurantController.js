const Restaurant = require("../models/restaurant.model");


//GET
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    res.status(200).json(restaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//PUT
const updateRestaurant = async (req, res) => {
  try {
    const data = await Restaurant.find();
    const restaurant = data[0];
    console.log(restaurant);
    restaurant.nombre = req.body.nombre || restaurant.nombre;
    restaurant.maximoComensales =
      req.body.maximoComensales || restaurant.maximoComensales;
    restaurant.horario.desde =
      req.body.horario.desde || restaurant.horario.desde;
    restaurant.horario.hasta =
      req.body.horario.hasta || restaurant.horario.hasta;
    restaurant.reservasMaxima =
      req.body.reservasMaxima || restaurant.reservasMaxima;
    restaurant.tiempoMaximoReserva =
      req.body.tiempoMaximoReserva || restaurant.tiempoMaximoReserva;
    console.log(restaurant);
    await restaurant.save();
    res.status(200).json({ message: "Restaurante actualizado" });
  } catch (error) {
    console.log(error);
  }
};

// POST LISTO
const addFechaNoDisp = async (req, res) => {
  try {
    const data = await Restaurant.find();
    const restaurant = data[0];
    /* await Restaurant.findOneAndDelete({ _id: restaurant.id }); */
    let array = restaurant.fechasNoDisponibles || [];
    if (array.length != 0) {
      let index = restaurant.fechasNoDisponibles.findIndex(
        (f) => f.fecha == req.body.fecha
      );
      if (index == -1) {
        let aux = { fecha: req.body.fecha, admin: req.body.id };
        array = [...array, aux];
        restaurant.fechasNoDisponibles = array;
        await restaurant.save();
        res.status(200).json({ message: "Fecha no disponible agregada" });
      } else {
        res.status(404).json({ message: "Fecha no disponible ya existente" });
      }
    } else {
      let aux = { fecha: req.body.fecha, admin: req.body.id };
      array = [...array, aux];
      restaurant.fechasNoDisponibles = array;
      await restaurant.save();
      res.status(200).json({ message: "Fecha no disponible agregada" });
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE LISTO
const deleteFechaNoDisp = async (req, res) => {
  try {
    const fecha = req.params.fecha;
    const data = await Restaurant.find();
    const restaurant = data[0];
    /* await Restaurant.findOneAndDelete({ _id: restaurant.id }); */
    let array = restaurant.fechasNoDisponibles;
    if (restaurant.fechasNoDisponibles.length != 0) {
      let index = restaurant.fechasNoDisponibles.findIndex(
        (f) => f.fecha == fecha
      );
      if (index >= 0) {
        array.splice(index);
        restaurant.fechasNoDisponibles = array;
        await restaurant.save();
        res.status(200).json({
          message: "Ahora se pueden hacer reservas en la fecha " + fecha,
        });
      } else {
        res.status(200).json({
          message: "No existen tal fecha en la db",
        });
      }
    } else {
      res.status(404).json({ message: "No hay fechas No disponibles" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getRestaurant,
  updateRestaurant,
  deleteFechaNoDisp,
  addFechaNoDisp,
};
