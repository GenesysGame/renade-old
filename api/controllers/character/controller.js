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
    if (!body.firstname || body.firstname.length <= 0) {
        callback(null, "Firstname cannot be empty");
        return;
    }
    if (!body.lastname || body.lastname.length <= 0) {
        callback(null, "Lastname cannot be empty");
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
