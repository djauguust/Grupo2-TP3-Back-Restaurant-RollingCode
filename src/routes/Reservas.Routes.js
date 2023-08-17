const express = require("express");
const router = express.Router();

const ReservasController = require("../controllers/reservaController");

//POST
router.post("/reservas", ReservasController.newReserva);

module.exports = router;
