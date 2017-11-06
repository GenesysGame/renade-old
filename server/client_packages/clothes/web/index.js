var list = $('.list');
$('#createpop').hide();

function update(){
	$.get( "http://127.0.0.1:8001/admin/clothes/get", function( data ) {
		list.empty();
	    data.forEach(function (v, i) {
	        var option = $('<option></option>');
	        if(i == 0){
	        	option.attr('selected', 'selected');
	        }
	        option.text(v.name);
	        list.append(option);
	    });
	} , "json" );
}

update();

$('#delete').click(function(){
	$.ajax({
	    url: 'http://127.0.0.1:8001/admin/clothes/delete',
	    method: "DELETE",
	    success: function(data) {
	        console.log(data);
	    }
	});
	update();
});

$('#create').click(function(){
	$('#createpop').show();
});

$('#save').click(function(){
	if($('#name').val() != ''){
		$.ajax({
		    url: 'http://127.0.0.1:8001/admin/clothes/put',
		    data: $('#name').val(),
		    method: "PUT"
		}).done(function(data){
			console.log(data);
		});
		$('#name').val('');
		update();
	}
	$('#createpop').hide();
});