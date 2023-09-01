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
router.get(
  "/reservas/:fecha/:hora",
  ReservasController.getDisponibilidadPorFechaYHora
);
router.get("/turnos/:fecha", ReservasController.getHorariosDisponiblesByFecha);
router.get("/reservasByUsuario/:idUsuario", ReservasController.getReservasByUser);

//PUT
router.put("/reservas/:id", ReservasController.updateReserva);
router.put("/reservas/usada/:id", ReservasController.reservaUsada);

module.exports = router;
