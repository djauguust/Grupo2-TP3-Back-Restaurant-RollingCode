const express = require("express");
const router = express.Router();

const mensajesControllers = require("../controllers/mensajeController")

//GET
router.get("/mensajes", mensajesControllers.getMessage);
// router.get("/mensajes/:userId", mensajesControllers.getMessageByUser)


//POST
router.post("/mensajes", mensajesControllers.createMessage)


//DELETE
router.delete("/mensajes/:messageId", mensajesControllers.deleteMessage)

module.exports = router;