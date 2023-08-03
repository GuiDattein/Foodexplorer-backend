const {Router} = require("express");

const usersRoutes = require("./users.routes.js");
const pratosRoutes = require("./pratos.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/pratos", pratosRoutes);

module.exports = routes;