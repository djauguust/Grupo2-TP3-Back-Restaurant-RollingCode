const express = require("express")
const router = express.Router()

const mensajesControllers = require("../controllers/mensajeController")

//POST
router.post("/mensjes", mensajesControllers.createMessage)

//GET
router.get("/mensjes", mensajesControllers.getMessage)
router.get("/mensjes/:userId", mensajesControllers.getMessageByUser)

//DELETE
router.delete("/mensjes/:userId/:messageId", mensajesControllers.deleteMessage)

module.exports = router