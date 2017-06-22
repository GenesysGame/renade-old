var mysql = require('mysql');
var md5 = require('md5');

var mysql_connection = mysql.createConnection({
    host: '188.120.235.38',
    port: '3307',
    user: 'rage',
    password: 'ggame-rage',
    database: 'lw'
});

var vehs = mp.joaat(["kuruma2", "oracle2", "maverick", "infernus"]);

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomSalt() {
    var alphabet = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    var endString =
        alphabet[getRandomInt(0, 41)] + alphabet[getRandomInt(0, 41)] +
        alphabet[getRandomInt(0, 41)] + alphabet[getRandomInt(0, 41)] +
        alphabet[getRandomInt(0, 41)] + alphabet[getRandomInt(0, 41)] +
        alphabet[getRandomInt(0, 41)] + alphabet[getRandomInt(0, 41)];

    return endString;
}

module.exports =
{
    commands: {
        "reg": (player, args) => {
            mysql_connection.query('SELECT * FROM  `user` WHERE username = \'' + args[0] + '\'', 0, function (error, result) {
                if (JSON.stringify(result) == '[]') {
                    var salt = getRandomSalt();
                    mysql_connection.query('INSERT INTO `user`(`id`, `username`, `password`, `salt`, `email`) VALUES (NULL,\'' + args[0] + '\' ,\'' + md5(md5(args[1]) + salt) + '\', \'' + salt + '\', \'email\')', 0, function (error, result) {
                        console.log('User ' + args[0] + ' was created!');
                        player.outputChatBox('User ' + args[0] + ' was created!');
                    });
                }
                else {
                    console.log('User already exist!');
                    player.outputChatBox('User already exist!');
                    console.log('');
                }
            });
        },

        "login": (player, args) => {
            mysql_connection.query('SELECT * FROM  `user` WHERE username = \'' + args[0] + '\'', 0, function (error, result) {
                var strResult = JSON.stringify(result);

                if (strResult == '[]') {
                    player.outputChatBox('Incorrect login or password!');
                    return 0;
                }

                var strResultMdf = strResult.replace('[', '');
                var strResultMdfSecond = strResultMdf.replace(']', '');

                var serializedObject = JSON.parse(strResultMdfSecond);

                var userId = serializedObject.id;
                var userLogin = serializedObject.username;
                var userPass = serializedObject.password;
                var userSalt = serializedObject.salt;

                var genPass = md5(md5(args[1]) + userSalt);

                if (genPass == userPass) {
                    player.outputChatBox('Hello, ' + args[0] + '!');
                    console.log('ID: ' + userId);
                    console.log('Login: ' + userLogin);
                    console.log('Status: OK');
                    console.log('');
                }
                else {
                    player.outputChatBox('Incorrect login or password!');
                    console.log('ID: ' + userId);
                    console.log('Login: ' + userLogin);
                    console.log('Status: Fail');
                    console.log('');
                }

                return 0;
            })
        },
    }

};