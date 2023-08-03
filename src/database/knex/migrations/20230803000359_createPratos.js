exports.up = knex => knex.schema.createTable("pratos", table =>{
    table.increments("id");
    table.text("avatar");
    table.text("name");
    table.text("category");
    table.text("description");
    table.float("preco");
    /*table.tipo("coluna").references("id_table_pai").inTable("table");*/
});


exports.down = knex => knex.schema.dropTable("pratos");
