const express = require("express");
const router = express.Router();

const mensajesControllers = require("../controllers/mensajeController")
const usuariosController = require("../controllers/usuarioController");


//GET
router.get("/mensajes",usuariosController.validateToken, mensajesControllers.getMessage);
// router.get("/mensajes/:userId", mensajesControllers.getMessageByUser)


//POST
router.post("/mensajes", mensajesControllers.createMessage)

//PUT
router.put("/mensajes/:messageId",usuariosController.validateToken, mensajesControllers.editMessage)

//DELETE
router.delete("/mensajes/:messageId",usuariosController.validateToken, mensajesControllers.deleteMessage)

module.exports = router;