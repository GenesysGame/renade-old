// Data model: Account

const db = require('../../db');

const Account = db.sequelize.define('account', {
    username: { type: db.Sequelize.STRING(32), unique: true, allowNull: false },
    password: { type: db.Sequelize.STRING, allowNull: false },
    email: { type: db.Sequelize.STRING, allowNull: false },
    lastIp: { type: db.Sequelize.STRING, allowNull: true }
});

module.exports.Account = Account;

module.exports.findAccount = function (username, callback) {
    Account.count({
        where: { username: username }
    }).then(count => {
        callback(count, null);
    }).catch(err => {
        callback(0, err);
    });
}

// get account by username (internal)
function getAccount(model, callback) {
    Account.findOne({
        where: model,
        include: [db.CharacterModel.Character]
    }).then(account => {
        callback(account, null);
    }).catch(err => {
        callback(null, err);
    });
}
module.exports.getAccount = getAccount;

// get account for X-Token header
module.exports.fetch = function (id, password, callback) {
    Account.findOne({
        attributes: ['id'],
        where: {
            id: id,
            password: password
        }
    }).then(account => {
        let id = account != null ? account.id : null;
        callback(id, null);
    }).catch(err => {
        callback(null, err);
    })
}

module.exports.createAccount = function (username, passHash, email, callback) {
    Account.create({
        username: username,
        password: passHash,
        email: email
    }).then(value => {
        getAccount({ username: username}, callback);
    }).catch(err => {
        callback(null, err);
    });
}

// update last Ip for account
module.exports.updateLastIp = function (id, ip, callback) {
    Account.update({
        lastIp: ip
    }, { where: { id: id }}).then(res => {
        callback();
    }).catch(err => {
        callback(err);
    });
}

module.exports.model = function (account, token) {
    if (!account) { return null; }

    var model = {
        id: account.id,
        username: account.username,
        email: account.email,
        characters: account.characters.map(charModel => {
            return db.CharacterModel.model(charModel);
        })
    };
    if (token) {
        model['X-Token'] = token;
    }
    return model;
}
