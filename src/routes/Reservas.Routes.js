const express = require("express");
const router = express.Router();

const ReservasController = require("../controllers/reservaController");
const tokenController = require("../controllers/tokenController")


//POST
router.post("/reservas",tokenController.validateToken, ReservasController.newReserva);

//DELETE
router.delete("/reservas/:id",tokenController.validateToken, ReservasController.deleteReserva);

//GET
router.get("/reservas/",tokenController.validateToken, ReservasController.getAllReservas);
router.get("/reservas/:fecha",tokenController.validateToken, ReservasController.getReservasByFecha);
router.get(
  "/reservas/:fecha/:hora",tokenController.validateToken,
  ReservasController.getDisponibilidadPorFechaYHora
);
router.get("/turnos/:fecha",tokenController.validateToken, ReservasController.getHorariosDisponiblesByFecha);
router.get("/reservasByUsuario/:idUsuario",tokenController.validateToken, ReservasController.getReservasByUser);

//PUT
router.put("/reservas/:id",tokenController.validateToken, ReservasController.updateReserva);
router.put("/reservas/usada/:id",tokenController.validateToken, ReservasController.reservaUsada);

module.exports = router;
