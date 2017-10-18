function start(){
    mp.trigger('camtool:cordsselected', $('#startx').val(), $('#starty').val(), $('#startz').val(), $('#endx').val(), $('#endy').val(), $('#endz').val());
}