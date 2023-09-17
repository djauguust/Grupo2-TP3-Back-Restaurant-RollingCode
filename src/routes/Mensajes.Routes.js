const express = require("express");
const router = express.Router();

const mensajesControllers = require("../controllers/mensajeController")
const tokenController = require("../controllers/tokenController")


//GET
router.get("/mensajes",tokenController.validateToken, mensajesControllers.getMessage);
// router.get("/mensajes/:userId", mensajesControllers.getMessageByUser)

//POST
router.post("/mensajes", mensajesControllers.createMessage)

//PUT
router.put("/mensajes/:messageId",tokenController.validateToken, mensajesControllers.editMessage)

//DELETE
router.delete("/mensajes/:messageId",tokenController.validateToken, mensajesControllers.deleteMessage)

module.exports = router;