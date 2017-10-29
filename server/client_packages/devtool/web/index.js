// Renade RP. GGame Studio. 28.10.2017
// Dev tool view controller

function run() {
    let input = $('#input');

    let code = input.val();
    mp.trigger('devtool:run', code);
}

function output(result) {
    let output = $('#output');
    output.val(result);
}