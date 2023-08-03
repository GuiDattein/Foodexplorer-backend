const {Router} = require("express");

const PratosController = require("../controllers/PratosController");

const pratosRoutes = Router();

const pratosController = new PratosController();

pratosRoutes.post("/", pratosController.create);

module.exports = pratosRoutes;