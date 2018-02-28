// Data model: Account

const db = require('../../db');

const Account = db.sequelize.define('account', {
    username: { type: db.Sequelize.STRING(32), unique: true, allowNull: false },
    password: { type: db.Sequelize.STRING, allowNull: false },
    email: { type: db.Sequelize.STRING, allowNull: false }
});

Account.findAccount = function (username, callback) {
    Account.count({
        where: { username: username }
    }).then(count => {
        callback(count, null);
    }).catch(err => {
        callback(0, err);
    });
}

Account.getAccount = function (username, callback) {
    Account.findOne({
        where: { username: username }
    }).then(account => {
        callback(account, null);
    }).catch(err => {
        callback(null, err);
    })
}

Account.createAccount = function (username, passHash, email, callback) {
    Account.create({
        username: username,
        password: passHash,
        email: email
    }).then(value => {
        Account.getAccount(username, callback);
    }).catch(err => {
        callback(null, err);
    });
}

module.exports = Account;
