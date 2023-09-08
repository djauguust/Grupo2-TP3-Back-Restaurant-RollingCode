const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurantController");
const usuariosController = require("../controllers/usuarioController");

//GET
router.get("/restaurant/",usuariosController.validateToken, restaurantController.getRestaurant);

//PUT
router.put("/restaurant/",usuariosController.validateToken, restaurantController.updateRestaurant);

//POST
router.post("/restaurant/fecha/",usuariosController.validateToken, restaurantController.addFechaNoDisp);

//DELETE
router.delete("/restaurant/fecha/:fecha",usuariosController.validateToken, restaurantController.deleteFechaNoDisp);

module.exports = router;
