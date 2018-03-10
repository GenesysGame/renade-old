// Account data model

const API = require('../api');
const Character = require('./character');

class Account {

    constructor(json) {
        this.id = json.id;
        this.username = json.username;
        this.email = json.email;
        this.xToken = json["X-Token"];

        this.characters = json.characters.map((charJson) => {
            return new Character(charJson);
        });
    }

    static login(data, callback) {
        API.post('account', data, (json, error) => {
            let account = json != null ? new Account(json) : null;
            callback(account, error);
        });
    }

}
module.exports = Account;

mp.events.add('account:login', (player, username, password) => {
    let data = {
        username: username,
        password: password,
        email: "ggame.studio@yandex.ru"
    };
    Account.login(data, (account, error) => {
        if (error != null) {
            console.log('Error: ' + error);
        } else {
            console.log('Success: ' + account.username);
        }
    });
});