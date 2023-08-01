const sqliteConnection = require('../../sqlite');
const createUsers = require('./createUsers');

async function migrationsRun(){
    const schemas = [
        createUsers
    ].join('');

    sqliteConnection()
    .then(db => db.exec(schema))
    .catch(error => console.error(error));
}

module.exports = migrationsRun;