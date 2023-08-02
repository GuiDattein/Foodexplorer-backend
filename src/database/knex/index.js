const config = require("../../../knexfile");
const knex = require("knex");

const connection = kenex(config.development);

module.exports = connection();