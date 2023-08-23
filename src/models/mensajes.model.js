const mongoose = require("mongoose")
const {Schema} = mongoose

const mensajesModel = new Schema(
  {
    nombre: {
      type: String,
      require: true,
      min: 8,
      max: 35,
      trim: true
    },
    email: {
      type: email,
      require: true,
      min: 4,
      max: 25,
      trim: true
    },
    mensaje: {
      type: String,
      require: true,
      min: 50,
      max: 1000,
      trim: true
    }
  },
  {versionKey: false}
)

const MensajeModel = mongoose.model("mensajes",mensajesModel)

module.exports = MensajeModel