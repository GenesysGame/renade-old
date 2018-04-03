var list = $('.list');
$('#createpop').hide();
$('#confirm').hide();

function update(){
	$.get( "http://127.0.0.1:8001/admin/clothes/get", function( data ) {
		list.empty();
	    data.forEach(function (v, i) {
	        var option = $('<option></option>');
	        if(i == 0){
	        	option.attr('selected', 'selected');
	        }
	        option.text(v.name);
	        option.attr('data-torso', v.torso);
	        option.attr('data-legs', v.legs);
	        option.attr('data-foot', v.foot);
	        option.attr('data-torso_acc', v.torso_acc);
	        option.attr('data-hands', v.hands);
	        option.attr('data-helmet', v.helmet);
	        option.attr('data-mask', v.mask);
	        list.append(option);
	    });
	} , "json" );
}

update();

$('#delete').click(function(){
	$('#confirm').show();
});

$('#create').click(function(){
	$('#createpop').show();
});

$('#load').click(function(){
	let preset = {
		torso: $('.list option:selected').attr('data-torso').split(','),
		torso_acc: $('.list option:selected').attr('data-torso_acc').split(','),
		legs: $('.list option:selected').attr('data-legs').split(','),
		foot: $('.list option:selected').attr('data-foot').split(','),
		hands: $('.list option:selected').attr('data-hands').split(','),
		helmet: $('.list option:selected').attr('data-helmet').split(','),
		mask: $('.list option:selected').attr('data-mask').split(',')
	};
	mp.trigger('clothes:clothesSelected', preset.torso[0], preset.torso[1], preset.torso_acc[0], preset.torso_acc[1], preset.legs[0], preset.legs[1], preset.foot[0], preset.foot[1], preset.hands[0], preset.hands[1], preset.helmet[0], preset.helmet[1], preset.mask[0], preset.mask[1]);
});

function create(preset){
	$.ajax({
	    url: 'http://127.0.0.1:8001/admin/clothes/put',
	    data: {name: $('#name').val(), preset: preset},
	    method: "PUT",
	    async: false,
	    error: function(jqXHR, textStatus, errorThrown){
	    	console.log('Error on creating preset: '+textStatus);
	    }
	});
	update();
	$('#createpop').hide();
	$('#name').val('');
};

$('#save').click(function(){
	if($('#name').val() != ''){
		mp.trigger('clothes:clothesCreated');
	}
});

$('#yes').click(function(){
	$.ajax({
	    url: 'http://127.0.0.1:8001/admin/clothes/delete/'+$('.list option:selected').text(),
	    method: "DELETE",
	    async: false,
	    error: function(jqXHR, textStatus, errorThrown){
	    	console.log('Error on deleting preset: '+textStatus);
	    }
	});
	$('#confirm').hide();
	update();
});

$('#no').click(function(){
	$('#confirm').hide();
});