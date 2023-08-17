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
    max: 10,
  },
  fechasNoDisponibles: [
    {
      desde: {
        type: Date,
        required: true,
      },
      hasta: {
        type: Date,
        required: true,
      },
      motivo: {
        type: String,
        min: 3,
        max: 200,
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
});
