/**
 * 
 */
define(['jquery', 'bootstrap'], function ($) { 
	
	function scan(form,fn){ 
		var _callback = fn; 
        var _table = $('.scan-table'),
            _trs = '',
            _inputname='',
            _inputs = form.find('input[data-name]'); 
        $.each(_inputs, function (i, val) {
      	  	var ele = $(val),
      	  	isHidden = ele.attr('type') == 'hidden' || ele.hasClass('input-hidden'),
      	  	tdText = ele.val(); 
	      	if(ele.data('name')=='orderid'){
	      		_trs = ('<td class="scan_id">' + tdText + '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>' + '</td>') +_trs;   
	      	}else if(ele.attr('type') == 'radio'){ 
	      		if(_inputname!=ele.data('name'))
	      			_trs += ('<td class="red">' + $("."+ele.data('name')+$("input[name='"+ele.data('name')+"']:checked").val()).text() + '<input type="hidden" name="' + ele.data('name') + '" value="' + $("input[name='"+ele.data('name')+"']:checked").val() + '"/>' + '</td>');  
	      	}else if(isHidden){
	      		_trs += ('<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>');  
	      	}else{
	      		_trs += ('<td>' + tdText + '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>' + '</td>');  
	      	} 
	      	_inputname=ele.data('name'); 
        });
    	_trs ='<tr>'+_trs+'<td><button type="button" class="btn btn-danger btn-xs delete-scan">刪除</button></td></tr>';
    	_table.append(_trs);  
  	  	
  	  	$('#scan-preview-body').on('click', '.delete-scan', function (e) {
  	  		$(this).parents('tr').remove();
  	  	}); 
	}
	
	return {
		scan: scan 
	};
	
});