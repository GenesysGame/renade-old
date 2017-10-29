// Renade RP. GGame Studio. 23.10.2017
// Mods view controller for Gun tool

let list = $('.list');

Object.keys(components).forEach(function (name, i) {
    var option = $('<option></option>');
    option.val(components[name]);
    option.text(name);
    list.append(option);
});

function add() {
    let optionSelected = $("option:selected", list);
    mp.trigger('guntool:mods:addPressed', parseInt(optionSelected.val()));
}