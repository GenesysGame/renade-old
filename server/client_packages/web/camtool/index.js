// Renade RP. GGame Studio. 20.10.2017
// Camera tool client package

function start() {
	var startx = parseFloat($('#startx').val());
	var starty = parseFloat($('#starty').val());
	var startz = parseFloat($('#startz').val());
	var endx = parseFloat($('#endx').val());
	var endy = parseFloat($('#endy').val());
	var endz = parseFloat($('#endz').val());
    mp.trigger('camtool:startLinearCamera', startx, starty, startz, endx, endy, endz);
}