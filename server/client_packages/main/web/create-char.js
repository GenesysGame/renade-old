// JS scripts for create char window

let firstnameInput = document.getElementById('firstname'),
    lastnameInput = document.getElementById('lastname'),
    genderRadios = document.getElementsByName('gender'),
    motherInput = document.getElementById('motherBlend'),
    fatherInput = document.getElementById('fatherBlend'),
    shapeInput = document.getElementById('shapeBlend'),
    skinInput = document.getElementById('skinBlend');

function changeValue() {
    let firstname = firstnameInput.value;
    let lastname = lastnameInput.value;
    let gender = Array.prototype.slice.call(genderRadios)
                .filter(radio => radio.checked)[0].value;
    let mother = motherInput.value;
    let father = fatherInput.value;
    let shape = shapeInput.value;
    let skin = skinInput.value;

    console.log(firstname + ' ' + lastname + ': gender ' + gender + '. Mother: ' 
    + mother + ', father: ' + father + '. Shape: ' + shape + ', skin: ' + skin);
}