import express from "express";
import "dotenv/config"
import morgan from "morgan";
import cors from "cors"


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

//MIDDLEWARES: Configuraciones extras del backend antes de que se ejecuten las rutas

//1-middleares nativos de express

app.use(express.json()) //Permite recibir objetos en formato json
app.use(express.urlencoded({extended:true})) //Permite recibir parametros en las rutas

//2-middle de terceros

app.use(morgan("dev")) //Nos brinda detalles de nuestra terminal
app.use(cors()) //Permite recibir peticiones remotras
