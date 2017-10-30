// Renade RP. GGame Studio. 20.10.2017
// Camera tool client package

// MARK: - Tabs on camera tool window

$('.tabs').children().each((i, elem) => {
    $(elem).click((e) => {
        changeSelectedTab(e);
    });
});

function changeSelectedTab(event) {
    let id = $(event.target).attr('id');
    $('.window').children('div').each((i, elem) => {
        if ($(elem).attr('class') == 'tabs') {
            $(elem).children().each((i, tab) => {
                if ($(tab).attr('id') == id) {
                    $(tab).addClass('selected_tab');
                } else {
                    $(tab).removeClass('selected_tab');
                }
            });
            return;
        }
        $(elem).attr('class', $(elem).attr('id') == id ? 'selected_tab_content' : 'tab_content');
    });
}

// MARK: - Setting

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

    let targetElem = elem.find('#target');
    let target = {
        x: parseFloat(targetElem.find('#x').val() || 0),
        y: parseFloat(targetElem.find('#y').val() || 0),
        z: parseFloat(targetElem.find('#z').val() || 0)
    }

    let startRot = elem.find('#startRotation');
    let startRotation = {
        x: parseFloat(startRot.find('#x').val() || 0),
        y: parseFloat(startRot.find('#y').val() || 0),
        z: parseFloat(startRot.find('#z').val() || 0)
    }
    let endRot = elem.find('#endRotation');
    let endRotation = {
        x: parseFloat(endRot.find('#x').val() || startRotation.x),
        y: parseFloat(endRot.find('#y').val() || startRotation.y),
        z: parseFloat(endRot.find('#z').val() || startRotation.z)
    }

    let duration = parseFloat(elem.find('#duration').val() || 5);

    let id = elem.attr('id');
    switch (id) {
        case 'linear':
            mp.trigger('camtool:startLinearCamera',
                id,
                start.x, start.y, start.z,
                end.x, end.y, end.z,
                startRotation.x, startRotation.y, startRotation.z,
                endRotation.x, endRotation.y, endRotation.z,
                duration
            );
            break;
        case 'linear_target':
            mp.trigger('camtool:startLinearTargetCamera',
                id,
                start.x, start.y, start.z,
                end.x, end.y, end.z,
                target.x, target.y, target.z,
                duration
            );
        default: break;
    }
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
    let tab = $('.selected_tab_content');
    let elem = tab.find('#' + id);
    elem.find('#x').val(x);
    elem.find('#y').val(y);
    elem.find('#z').val(z);
}