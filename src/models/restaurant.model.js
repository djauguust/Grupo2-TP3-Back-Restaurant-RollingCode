const mongoose = require("mongoose");
const { Schema } = mongoose;

const restaurantModel = new Schema({
  nombre: {
    type: String,
    required: true,
    max: 100,
    min: 3,
    trim: true,
  },
  maximoComensales: {
    type: Number,
    required: true,
    min: 1,
  },
  fechasNoDisponibles: [
    {
      fecha: {
        type: String,
        required: true,
      },
      admin: {
        type: String,
        required: true,
      },
    },
  ],
  horario: {
    desde: {
      type: Number,
      min: 0,
      max: 2358,
    },
    hasta: {
      type: Number,
      min: 1,
      max: 2359,
    },
  },
  reservasMaxima: {
    type: Number,
    required: true,
  },
  tiempoMaximoReserva: { type: Number, required: true, min: 1, max: 5 },
});

const RestaurantModel = mongoose.model("restaurant", restaurantModel); // crea la colección en la db

module.exports = RestaurantModel;
