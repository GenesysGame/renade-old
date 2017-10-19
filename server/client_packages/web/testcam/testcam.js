// Rize RP. GGame Studio. 15.10.2017
// Test camera tool client package

let interpolatecam = null;

function lerp(vector1, vector2, deltaTime) {
    return new mp.Vector3(
        vector1.x + (vector2.x - vector1.x) * deltaTime,
        vector1.y + (vector2.y - vector1.y) * deltaTime,
        vector1.z + (vector2.z - vector1.z) * deltaTime
    );

}

function init() {

    mp.events.add({
        'render': () => {
            if (interpolatecam) {
                interpolatecam.currentPosition = lerp(interpolatecam.positions[0], interpolatecam.positions[1], interpolatecam.progress);
                interpolatecam.progress = interpolatecam.progress + interpolatecam.speed / 1000;
                interpolatecam.cam.setCoord(interpolatecam.currentPosition.x, interpolatecam.currentPosition.y, interpolatecam.currentPosition.z);
                if (interpolatecam.progress >= 1) {
                    interpolatecam = null;
                }
            }
        }
    });
}

function interpolateCam(cam, positions, speed) {

    return interpolatecam = {
        cam,
        positions,
        speed,
        progress: 0,
        currentPosition: null
    };
}

exports.interpolateCam = interpolateCam;
exports.init = init;

// Для примера задам координаты предмета
var printx = -9;
var printy = -10;
var printz = 5;

function abs(e) {
    if(e < 0){
        return -e;
    } else{
        return e;
    }
}

// Функцию стащил с сайта какого-то
function conver_rtg(e){
    return 180/Math.PI*e;
}

// Создаем доп. функции, т.к. дальше нам важно будет положительно значение или нет, а для формулы нужно положительное только.
var y = abs(printy);
var x = abs(printx);

// Находим 3 сторону треугольника, опять же взял с сайта чужого
var side_3 = Math.sqrt(x * x + y * y - 2 * x * y * Math.cos(1.5707963267948966));

// Находим сам угол, и с того же сайта.
var anglex = conver_rtg(Math.acos((y * y + side_3 * side_3 - x * x) / (2 * y * side_3))).toFixed(2);

// Проверяем в какой четверти находился объект и не лежит ли он на 1 из осей.
if(printx > 0 && printy > 0){
    var result = -anglex;
} else if(printx > 0 && printy < 0){
    var result = anglex-180;
} else if(printx < 0 && printy < 0){
    var result = 180-anglex;
} else if(printx == 0 && printy > 0){
    var result = 0;
} else if(printx == 0 && printy < 0){
    var result = 180;
} else if(printx < 0 && printy == 0){
    var result = 90;
} else if(printx > 0 && printy == 0){
    var result = -90;
} else{
    var result = anglex;
}