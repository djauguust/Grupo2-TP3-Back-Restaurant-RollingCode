const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurantController");
const tokenController = require("../controllers/tokenController")

//GET
router.get("/restaurant/",tokenController.validateToken, restaurantController.getRestaurant);

//PUT
router.put("/restaurant/",tokenController.validateToken, restaurantController.updateRestaurant);

//POST
router.post("/restaurant/fecha/",tokenController.validateToken, restaurantController.addFechaNoDisp);

//DELETE
router.delete("/restaurant/fecha/:fecha",tokenController.validateToken, restaurantController.deleteFechaNoDisp);

module.exports = router;
