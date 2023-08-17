import express from "express";
import "dotenv/config"

const connectDb = require("./src/BaseDeDatos/database")

console.log("Hola Mundo");

//Creamos una instancia de express y la guardamos en una constante app
const app = express()

//Capturamos el puerto en el que vamos a setear nuestro backend
app.set("port", process.env.PORT )

//Funcion para iniciar nuestro BackEnd
const iniciarBack = async () =>{
    try {
        await connectDb()
        app.listen(app.get("port"), () => {
            console.log(`Servidor corriendo en el puerto ${app.get(`port`)}`);
        }).on("Error", (error) =>{
            console.log(error);
        })
    } catch (error) {
        console.log("Error :", error);
    }
}

iniciarBack()