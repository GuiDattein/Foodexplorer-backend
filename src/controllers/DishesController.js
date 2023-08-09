const knex = require("../database/knex");

class DishesController{
    async create(request, response){
        const {name, description, category, preco, ingredients} = request.body;
        const user_id = request.user.id;

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

        return response.json();
    }

    async show(request, response){
        const { id } = request.params;

        const dishe = await knex("dishes").where({ id }).first();
        const ingredient = await knex("ingredients").where({dishe_id: id}).orderBy("name");
        

        return response.json({
            ...dishe,
            ingredient
        });
    }

    async delete(request, response){
        const {id} = request.params;

        await knex("dishes").where({id}).delete();

        return response.json();
    }

    async index(request, response){
        const {name, ingredients} = request.query;

        const user_id = request.user.id;

        let dishe;

        if(ingredients){
            const filterIngreds = ingredients.split(',').map(ingred => ingred.trim());
            
            dishe = await knex("ingredients")
            .select([
                "dishes.id",
                "dishes.name",
                "ingredients.user_id",
            ])
            .where("dishes.user_id", user_id)
            .whereLike("dishes.name", `%${name}%`)
            .whereIn("ingredients.name", filterIngreds)
            .innerJoin("dishes", "dishes.id", "ingredients.dishe_id")
            .orderBy("dishes.name")

        }else{       
            dishe = await knex("dishes")
            .where({user_id})
            .whereLike("name", `%${name}%`)
            .orderBy("name");
        }

        const userIngredients = await knex("ingredients").where({user_id});
        const dishesWithIngredients= dishe.map(dishe => {
            const disheIngredients = userIngredients.filter(ingredient => ingredient.dishe_id === dishe.id);

            return{
                ...dishe,
                ingredients: disheIngredients
            }
        })

        return response.json({dishesWithIngredients});
    }
}

module.exports = DishesController;