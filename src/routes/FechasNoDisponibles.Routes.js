const express = require("express");
const router = express.Router();

const fechasNDController = require("../controllers/fechasNoDisponiblesController");

//POST
router.post("/fechasnd/", fechasNDController.newFechaND);

//GET
router.get("/fechasnd/", fechasNDController.getFechasNoDisponibles);

//DELETE
router.delete("/fechasnd/:id", fechasNDController.deleteFecha);

module.exports = router;