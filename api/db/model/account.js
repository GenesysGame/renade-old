// Data model: Account

const db = require('../../db');

const Account = db.sequelize.define('account', {
    username: { type: db.Sequelize.STRING(32), unique: true, allowNull: false },
    password: { type: db.Sequelize.STRING, allowNull: false },
    email: { type: db.Sequelize.STRING, allowNull: false }
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

// get account by username
module.exports.getAccount = function (model, callback) {
    Account.findOne({
        where: model
    }).then(account => {
        callback(account, null);
    }).catch(err => {
        callback(null, err);
    })
}

// get account for X-Token header
module.exports.fetch = function (id, password, callback) {
    Account.findOne({
        attributes: ['id'],
        where: {
            id: id,
            password: password
        }
    }).then(account => {
        callback(account.id, null);
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
        Account.getAccount({ username: username}, callback);
    }).catch(err => {
        callback(null, err);
    });
}
