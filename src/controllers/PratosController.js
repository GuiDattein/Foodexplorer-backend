const knex = require("../database/knex");

class PratosController{
    async create(request, response){
        const { name, description, category, preco, ingredients} = request.body;

        const [prato_id] = await knex("pratos").insert({
            name, 
            description,
            category,
            preco
        });

        const ingredientsIsert = ingredients.map(name => {
            return {
                prato_id,
                name
            }
        });

        await knex("ingredients").insert(ingredientsIsert);

        response.json();
    }
}

module.exports = PratosController;