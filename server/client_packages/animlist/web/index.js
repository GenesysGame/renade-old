// Renade RP. GGame Studio. 1.10.2017
// Animations list view controller

let list = $('.list');
var totalPages = 0;

function load(){
    $('#total').text('LOADING...');
    isLoading = true;
    list.empty();
    $.get( "http://212.109.194.252:8001/admin/animations/get", { page: page}, function( data ) {
        page = data.page;
        totalPages = data.total;
        data = data.data
        data.forEach(function (v, i) {
            var group = $('<optgroup></optgroup>');
            group.attr('label', v['name']);
            group.attr('class', page);
            $.each(v['props'], function (s, p) {
                var option = $('<option></option>');
                option.val([v['name'], p]);
                option.text(p);
                group.append(option);
            });
            list.append(group);
        });
        $('#total').text('/'+totalPages);
        $('#page').attr('max', totalPages);;
        $('#page').val(page);
        isLoading = false;
    } , "json" );
}

var page = 0;
var isLoading = false;

load();

$('#page').keydown(function(e) {
    if(e.keyCode === 13 && !isLoading){
        if($(this).val() > totalPages){
            $(this).val(totalPages);
        } else if($(this).val() < 0){
            $(this).val(0);
        }
        page = $(this).val();
        load();
    }
});

$('#next').click(function(){
    if(page != totalPages && !isLoading){
        page += 1;
        load();
    }
});

$('#prev').click(function(){
    if(page > 0 && !isLoading){
        page -= 1;
        load('back');
    }
});

$('#stop').click(function(){
    mp.trigger('animlist:animationSelected', '', '');
});


list.on('change', function (e) {
    let optionSelected = $("option:selected", this);
    let anim = optionSelected.val().split(',');
    mp.trigger('animlist:animationSelected', anim[0], anim[1]);
});