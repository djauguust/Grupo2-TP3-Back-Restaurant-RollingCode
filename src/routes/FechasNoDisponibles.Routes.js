const express = require("express");
const router = express.Router();

const fechasNDController = require("../controllers/fechasNoDisponiblesController");
const usuariosController = require("../controllers/usuarioController");


//POST
router.post("/fechasnd/",usuariosController.validateToken, fechasNDController.newFechaND);

//GET
router.get("/fechasnd/",usuariosController.validateToken, fechasNDController.getFechasNoDisponibles);

//DELETE
router.delete("/fechasnd/:id",usuariosController.validateToken, fechasNDController.deleteFecha);

module.exports = router;