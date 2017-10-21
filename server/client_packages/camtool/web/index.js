// Renade RP. GGame Studio. 20.10.2017
// Camera tool client package

function start() {
    let elem = $(event.target).parent().parent();

    let startElem = elem.find('#start');
    let start = {
        x: parseFloat(startElem.find('#x').val() || 0),
        y: parseFloat(startElem.find('#y').val() || 0),
        z: parseFloat(startElem.find('#z').val() || 0)
    }

    let endElem = elem.find('#end');
    let end = {
        x: parseFloat(endElem.find('#x').val() || 0),
        y: parseFloat(endElem.find('#y').val() || 0),
        z: parseFloat(endElem.find('#z').val() || 0)
    }

    let targetElem = elem.find('#rotation');
    let rotation = {
        x: parseFloat(targetElem.find('#x').val() || 0),
        y: parseFloat(targetElem.find('#y').val() || 0),
        z: parseFloat(targetElem.find('#z').val() || 0)
    }

    let duration = parseFloat(elem.find('#duration').val() || 5);

    mp.trigger('camtool:startLinearCamera',
        start.x, start.y, start.z,
        end.x, end.y, end.z,
        rotation.x, rotation.y, rotation.z,
        duration
    );
}

function pick() {
    let parent = $(event.target).parent();
    mp.trigger('camtool:pickCoords', parent.attr('id'));
}

function pickRotation() {
    let parent = $(event.target).parent();
    mp.trigger('camtool:pickRotation', parent.attr('id'));
}

function pickCallback(id, x, y, z) {
    let elem = $('#' + id);
    elem.find('#x').val(x);
    elem.find('#y').val(y);
    elem.find('#z').val(z);
}