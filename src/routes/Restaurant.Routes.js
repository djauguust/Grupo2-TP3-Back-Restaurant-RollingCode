const express = require("express");
const router = express.Router();

const restaurantController = require("../controllers/restaurantController");

//GET
router.get("/restaurant/", restaurantController.getRestaurant);

//PUT
router.put("/restaurant/", restaurantController.updateRestaurant);

//POST
router.post("/restaurant/fecha/", restaurantController.addFechaNoDisp);

//DELETE
router.delete("/restaurant/fecha/:fecha", restaurantController.deleteFechaNoDisp);

module.exports = router;
