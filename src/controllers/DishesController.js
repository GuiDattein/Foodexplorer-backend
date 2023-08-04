const knex = require("../database/knex");

class DishesController{
    async create(request, response){
        const {name, description, category, preco, ingredients} = request.body;
        const {user_id} = request.params;

        const [dishe_id] = await knex("Dishes").insert({
            name,
            description,
            category,
            preco,
            user_id
        });

        const ingredientsInsert = ingredients.map(name => {
            return {
                dishe_id,
                name,
                user_id
            }
        });

        await knex("ingredients").insert(ingredientsInsert);

        response.json();
    }
}

module.exports = DishesController;