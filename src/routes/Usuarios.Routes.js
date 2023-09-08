const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuarioController");

//POST
router.post("/usuarios/", usuariosController.register);
router.post("/login/", usuariosController.login);

//GET
router.get("/usuarios/",usuariosController.validateToken, usuariosController.getAllUsers);
router.get("/usuarios/:id",usuariosController.validateToken, usuariosController.getUserById);

//PUT
router.put("/usuarios/:id",usuariosController.validateToken, usuariosController.updateUser);
router.put("/contrasenia/:id",usuariosController.validateToken, usuariosController.updatePassword);

//DELETE
router.delete("/usuarios/:id",usuariosController.validateToken, usuariosController.deleteUser);

module.exports = router;
