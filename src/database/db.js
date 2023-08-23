const mongoose = require("mongoose");
//const CanchaModel = require("../models/canchas.model");

const uri = process.env.URI;
const db = process.env.DB;

const conectDb = async () => {
  try {
    /* await mongoose.connect(`${uri}${db}`, { */
    await mongoose.connect(`mongodb+srv://djauguust:FhOXKqYC4L5NzWWO@cluster0.jrw9sxt.mongodb.net/`, {
    useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = conectDb;
