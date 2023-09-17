const express = require("express");
const router = express.Router();

const fechasNDController = require("../controllers/fechasNoDisponiblesController");
const tokenController = require("../controllers/tokenController")


//POST
router.post("/fechasnd/",tokenController.validateToken, fechasNDController.newFechaND);

//GET
router.get("/fechasnd/",tokenController.validateToken, fechasNDController.getFechasNoDisponibles);

//DELETE
router.delete("/fechasnd/:id",tokenController.validateToken, fechasNDController.deleteFecha);

module.exports = router;