const {Router} = require("express");

const usersRoutes = require("./users.routes.js");
const dishesRoutes = require("./dishes.routes.js");
const ingredientsRoutes = require("./ingredients.routes.js");
const sessionsRoutes = require("./sessions.routes.js");

const routes = Router();

routes.use("/users", usersRoutes);
routes.use("/sessions", sessionsRoutes);
routes.use("/dishes", dishesRoutes);
routes.use("/ingredients", ingredientsRoutes);

module.exports = routes;