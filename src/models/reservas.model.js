const mongoose = require("mongoose");
const { Schema } = mongoose;

const reservaModel = new Schema({
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: Number,
    required: true,
  },
  comensales: {
    type: Number,
    required: true,
    min: 1,
    max: 50,
  },
  fueUsada: {
    type: Boolean,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
});

const ReservaModel = mongoose.model("reservas", reservaModel); // crea la colección en la db

module.exports = ReservaModel;
