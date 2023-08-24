const express = require("express");
const router = express.Router();

const ReservasController = require("../controllers/reservaController");

//POST
router.post("/reservas", ReservasController.newReserva);

//DELETE
router.delete("/reservas/:id", ReservasController.deleteReserva);

//GET
router.get("/reservas/", ReservasController.getAllReservas);
router.get("/reservas/:fecha", ReservasController.getReservasByFecha);
router.get("/reservas/:fecha/:hora", ReservasController.getDisponibilidadPorFechaYHora);
router.get("/turnos/:fecha", ReservasController.getHorariosDisponiblesByFecha);

//PUT
router.put("/reservas/:id", ReservasController.updateReserva);

module.exports = router;
