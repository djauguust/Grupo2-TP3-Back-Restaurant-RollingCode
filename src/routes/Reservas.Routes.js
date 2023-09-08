const express = require("express");
const router = express.Router();

const ReservasController = require("../controllers/reservaController");
const usuariosController = require("../controllers/usuarioController");


//POST
router.post("/reservas",usuariosController.validateToken, ReservasController.newReserva);

//DELETE
router.delete("/reservas/:id",usuariosController.validateToken, ReservasController.deleteReserva);

//GET
router.get("/reservas/",usuariosController.validateToken, ReservasController.getAllReservas);
router.get("/reservas/:fecha",usuariosController.validateToken, ReservasController.getReservasByFecha);
router.get(
  "/reservas/:fecha/:hora",usuariosController.validateToken,
  ReservasController.getDisponibilidadPorFechaYHora
);
router.get("/turnos/:fecha",usuariosController.validateToken, ReservasController.getHorariosDisponiblesByFecha);
router.get("/reservasByUsuario/:idUsuario",usuariosController.validateToken, ReservasController.getReservasByUser);

//PUT
router.put("/reservas/:id",usuariosController.validateToken, ReservasController.updateReserva);
router.put("/reservas/usada/:id",usuariosController.validateToken, ReservasController.reservaUsada);

module.exports = router;
