// Helper for password hash/salt

const crypto = require('crypto');
const db = require('../db');

module.exports = {
    hash: createHash,
    validate: validateHash,
    validateEmail: validateEmail,
    encryptAccount: encryptAccount,
    decryptToken: decryptToken
};

const SaltLength = 10;

function createHash(password) {
    var salt = generateSalt(SaltLength);
    var hash = md5(password + salt);
    return salt + hash;
}

function validateHash(hash, password) {
    var salt = hash.substr(0, SaltLength);
    var validHash = salt + md5(password + salt);
    return hash === validHash;
}

function generateSalt(len) {
    var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ',
        setLen = set.length,
        salt = '';
    for (var i = 0; i < len; i++) {
        var p = Math.floor(Math.random() * setLen);
        salt += set[p];
    }
    return salt;
}
  
function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// MARK: - X-Token

const separator = '@@@';

function encryptAccount(account) {
    let cipher = crypto.createCipher(db.config.algorithm, db.config.password);
    let salt = generateSalt(10);
    let string = salt + separator + account.password + separator + account.id + separator + Date.now();
    var crypted = cipher.update(string, 'utf8', 'hex');
    crypted += cipher.final('hex');
    console.log("X-Token: " + crypted);
    return crypted;
}

function decryptToken(token, callback) {
    if (!token) { callback(null); return; }
    let decipher = crypto.createDecipher(db.config.algorithm, db.config.password);
    var dec = decipher.update(token, 'hex', 'utf8');
    dec += decipher.final('utf8');
    let arr = dec.split(separator);
    db.AccountModel.fetch(arr[2], arr[1], (id, err) => {
        if (err) throw err;
        callback(id);
    });
}
