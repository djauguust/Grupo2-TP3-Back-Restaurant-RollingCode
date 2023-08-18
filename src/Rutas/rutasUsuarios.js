const express = require("express")
const router = express.Router()

const usuarioController = require("../Controladores/usuarioControllers")

//Login
router.post("/login", usuarioController.Login)

//Registro
router.post("/registro", usuarioController.Registro)

module.exports = router

