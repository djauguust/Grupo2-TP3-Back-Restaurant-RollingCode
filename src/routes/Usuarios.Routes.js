const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarioController");

//POST
router.post("/usuarios", usuariosController.register);
router.post("/login", usuariosController.login);

//GET
router.get("/usuarios", usuariosController.getAllUsers);
router.get("/usuarios/:id", usuariosController.getUserById);

//PUT
router.put("/usuarios/:id", usuariosController.updateUser);
router.put("/contrasenia/:id", usuariosController.updatePassword);

//DELETE
router.delete("/usuarios/:id", usuariosController.deleteUser);

module.exports = router;
