// API: Account controller - create account

module.exports = {
    create: create
};

const pass = require('./password');
const db = require('../db');

function create(body, callback) {
    const username = body.username;
    const password = body.password;
    const email = body.email;

    if (username.length < 4 || username.length > 32) { 
        callback(null, "Username should have 4..32 symbols");
        return;
    }
    if (password.length < 4) {
        callback(null, "Password should have 4 or more symbols");
        return;
    }
    if (!pass.validateEmail(email)) {
        callback(null, "E-mail isn't correct");
        return;
    }
    
    db.Account.findAccount(username, (count, err) => {
        if (err) {
            callback(null, err);
            return;
        }
        if (count == 0) {
            const passHash = pass.hash(password);
            db.Account.createAccount(username, passHash, email, (account, err) => {
                if (account) {
                    callback(model(account), null);
                } else {
                    callback(null, err);
                }
            });
        } else {
            db.Account.getAccount(username, (account, err) => {
                if (err) {
                    callback(null, err);
                } else if (pass.validate(account.password, password)) {
                    callback(model(account), null);
                } else {
                    callback(null, "Invalid username or password");
                }
            });
        }
    })

}

function model(account) {
    return {
        id: account.id,
        username: account.username,
        email: account.email
    }
}