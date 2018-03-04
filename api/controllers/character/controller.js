// API: Character controller - create character

module.exports = {
    create: create
};

const db = require('../../db');

function create(body, callback) {
    console.log(body);
    if (!body.accountId) {
        callback(null, 'Unauthorized');
        return;
    }
    if (!body.name || body.name.length <= 0) {
        callback(null, "Name cannot be empty");
        return;
    }
    if (!body.surname || body.surname.length <= 0) {
        callback(null, "Surname cannot be empty");
        return;
    }

    db.CharacterModel.createCharacter(body, (character, err) => {
        if (err) {
            callback(null, err);
            return;
        }
        callback(db.CharacterModel.model(character), null);
    });
}
