const express = require("express");
const router = express.Router();

const ReservasController = require("../controllers/reservaController");

//POST
router.post("/reservas", ReservasController.newReserva);

//DELETE
router.delete("/reservas/:id", ReservasController.deleteReserva);

//GET
router.get("/reservas/:fecha", ReservasController.getReservasByFecha);
router.get("/reservas/", ReservasController.getAllReservas);

//PUT
router.put("/reservas/:id", ReservasController.updateReserva);

module.exports = router;
