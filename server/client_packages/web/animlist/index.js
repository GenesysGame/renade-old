// Rize RP. GGame Studio. 1.10.2017
// Animations list view controller

let list = $('.list');
var total = 0;

function load(e){
    $('.total').text('LOADING...');
    if(e == 'forward'){
        $.get( "http://127.0.0.1/admin/animations/get?min="+(last+1)+'&max='+(last+500), function( data ) {
            list.append(data);
            $('.total').text('');
        });
        for (var i = last - 501; i >= last-1000; i--) {
            $('#'+i).remove();
        }
        last += 500;
    } else{
        if(last > 1000){
            $.get( "http://127.0.0.1/admin/animations/get?min="+(last-1500)+'&max='+(last-1001), function( data ) {
                list.prepend(data);
                $('.total').text('');
            });
            for (var i = last; i > last-500; i--) {
                $('#'+i).remove();
            }
            last -= 500;
        }
    }
}

animations.forEach(function (v, i) {
    if (i >= 1001 || i <= 0) { return; }
    var group = $('<optgroup></optgroup>');
    group.attr('label', v[0]);
    group.attr('id', i);
    $.each(v, function (si) {
        if (si > 0) {
            var option = $('<option></option>');
            option.val([v[0], v[si]]);
            option.text(v[si]);
            group.append(option);
        }
    });
    list.append(group);
});

var last = 1000;

$('.list').scroll(function(){
    if($('#'+last).offset().top < 300){
        load('forward');
    } else{
        if(last > 1000 && $('#'+(last-999)).offset().top > -300){
            load('back');
        }
    }
});

list.on('change', function (e) {
    let optionSelected = $("option:selected", this);
    let anim = optionSelected.val().split(',');
    mp.trigger('animlist:animationSelected', anim[0], anim[1]);
});