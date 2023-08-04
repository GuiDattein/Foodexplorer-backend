exports.up = knex => knex.schema.createTable("Dishes", table =>{
    table.increments("id");
    table.text("avatar");
    table.text("name");
    table.text("category");
    table.text("description");
    table.float("preco");
    table.integer("user_id").references("id").inTable("users");
});


exports.down = knex => knex.schema.dropTable("Dishes");
