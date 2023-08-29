import express from "express";
import "dotenv/config";
import cors from "cors";
import morgan from "morgan";
const conectDb = require("./src/database/db.js");

console.log("Hello there");

// Instanciamos express
const app = express();

// configuramos el puerto en el que se va a ejecutar nuestro backend
app.set("port", process.env.PORT || 5050);

// Inicializamos el backend
const initApp = async () => {
  try {
    await conectDb();
    app
      .listen(app.get("port"), () => {
        console.log(`estoy escuchando el puerto ${app.get("port")}`);
      })
      .on("error", (error) => {
        console.log("ERROR : ", error);
        process.exit(1);
      });
  } catch (error) {
    console.log("ERROR : ", error);
    process.exit(1);
  }
};

initApp();

// 1- middle nativo de express
app.use(express.json()); // permite recibir obj en formato json
app.use(express.urlencoded({ extended: true })); // permite recibir parametros en las rutas

app.use(morgan("dev")); // brinda detalles en nuestra terminal
app.use(cors()); // permite recibir peticiones remotas

app.use(
  "/api",
  require("./src/routes/Usuarios.Routes.js"),
  require("./src/routes/Reservas.Routes.js"),
  require("./src/routes/Mensajes.Routes.js"),
  require("./src/routes/Restaurant.Routes.js"),
  require("./src/routes/FechasNoDisponibles.Routes.js")
);
