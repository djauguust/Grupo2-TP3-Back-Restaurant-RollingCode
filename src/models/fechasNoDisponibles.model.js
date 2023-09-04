const mongoose = require("mongoose");
const { Schema } = mongoose;

const fechaNoDisponibletModel = new Schema({
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  admin: {
    type: String,
    required: true,
  },
  restaurant: {
    type: String,
    required: true,
  },
});

const FechaNDModel = mongoose.model("fechasNoDisponibles", fechaNoDisponibletModel)
module.exports = FechaNDModel;