const mongoose = require("mongoose")

//Guardar los valores de la url y la carpeta de la base de datos
const url = process.env.PORTDB
const db = process.env.DB

//Funcion para conectarse al BackEnd
const connectDb = async () => {
    try {
        await mongoose.connect(`${url}/${db}`), { useNewUrlParser: true, useUnifiedTopology: true}
        console.log("Conexion con la base de datos existosa");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDb