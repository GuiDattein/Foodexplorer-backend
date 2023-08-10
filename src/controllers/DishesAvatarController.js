const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class DishesAvatarController{
    async update(request, response){
        const dishe_id = request.params.id;
        const avatarFilename = request.file.filename;

        const diskStorage = new DiskStorage();

        const dishe = await knex("Dishes")
        .where({id: dishe_id}).first();

        if(!dishe){
            throw new AppError("Não encontrado");
        }

        if(dishe.avatar){
            await diskStorage.deleteFile(dishe.avatar);
        }

        const filename = await diskStorage.saveFile(avatarFilename);
        dishe.avatar = filename;

        await knex("Dishes").update(dishe).where({id: dishe_id});

        return response.json(dishe);
    }
}

module.exports = DishesAvatarController;