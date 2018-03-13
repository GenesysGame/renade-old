// API: Account controller - create account, fetch account

module.exports = {
    create: create,
    fetchById: fetchById,
    fetch: fetch
};

const pass = require('../../helpers/password');
const db = require('../../db');

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
    
    db.AccountModel.findAccount(username, (count, err) => {
        if (err) {
            callback(null, err);
            return;
        }
        if (count == 0) {
            const passHash = pass.hash(password);
            db.AccountModel.createAccount(username, passHash, email, (account, err) => {
                if (account) {
                    let token = pass.encryptAccount(account);
                    callback(db.AccountModel.model(account, token), null);
                } else {
                    callback(null, err);
                }
            });
        } else {
            db.AccountModel.getAccount({ username: username }, (account, err) => {
                if (err) {
                    callback(null, err);
                } else if (pass.validate(account.password, password)) {
                    let token = pass.encryptAccount(account);
                    callback(db.AccountModel.model(account, token), null);
                } else {
                    callback(null, "Account " + account.username + " is already exist");
                }
            });
        }
    })

}

// Get account model for current account
// Add parameter (targetId) in future to fetch other user's account
function fetchById(accountId, callback) {
    if (!accountId) {
        callback(null, 'Unauthorized');
        return;
    }
    db.AccountModel.getAccount({ id: accountId }, (account, err) => {
        callback(db.AccountModel.model(account), err);
    });
}

function fetch(username, password, callback) {
    if (!username || username.length <= 0 || !password || password.length <= 0) {
        callback(null, "Username and password cannot be empty");
        return;
    }
    db.AccountModel.getAccount({ username: username }, (account, err) => {
        if (err) {
            callback(null, err);
            return;
        }
        if (pass.validate(account.password, password)) {
            let token = pass.encryptAccount(account);
            callback(db.AccountModel.model(account, token), null);
        } else {
            callback(null, "Invalid username or password");
        }
    });
}
