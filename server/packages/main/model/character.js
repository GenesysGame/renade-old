// Character data model

class Character {

    constructor(json) {
        this.firstname = json.firstname;
        this.lastname = json.lastname;
        this.male = json.male;
    }

}
module.exports = Character;
