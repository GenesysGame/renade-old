// Data model: Character

const db = require('../../db');

const Account = db.AccountModel.Account;

const maxCharactersCount = 1;

const Character = db.sequelize.define('character', {
    name: { type: db.Sequelize.STRING, allowNull: false },
    surname: { type: db.Sequelize.STRING, allowNull: false },
    sex: { type: db.Sequelize.BOOLEAN, allowNull: false, defaultValue: true } // true - male, false - female
})

Account.hasMany(Character, {foreignKey: 'accountId'});
Character.belongsTo(Account, {foreignKey: 'accountId'});

module.exports.Character = Character;

module.exports.createCharacter = function (model, callback) {
    let accountId = model.accountId;
    if (!accountId) { callback(null, 'Unauthorized'); return; }
    db.AccountModel.getAccount({ id: accountId }, (account, err) => {
        if (err) { callback(null, 'Unauthorized'); return; }
        let charactersCount = account.characters.length;
        if (maxCharactersCount <= charactersCount) {
            callback(null, "Limit of characters exceeded");
            return;
        }
        Character.create({
            accountId: accountId,
            name: model.name,
            surname: model.surname
        }).then(value => {
            callback(value, null);
        }).catch(err => {
            callback(null, err);
        });
    });
}

module.exports.model = function (character) {
    if (!character) { return null; }
    return {
        id: character.id,
        name: character.name,
        surname: character.surname
    };
}
