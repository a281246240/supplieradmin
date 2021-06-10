/**
 * 
 */
define(['jquery', 'bootstrap'], function ($) {
	
	//当前时间插件
    Date.prototype.Format = function(fmt)   
    {
      var o = {   
        "M+" : this.getMonth()+1,                 //月份   
        "d+" : this.getDate(),                    //日   
        "h+" : this.getHours(),                   //小时   
        "m+" : this.getMinutes(),                 //分   
        "s+" : this.getSeconds(),                 //秒   
        "q+" : Math.floor((this.getMonth()+3)/3), //季度   
        "S"  : this.getMilliseconds()             //毫秒   
      };   
      if(/(y+)/.test(fmt))   
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
      for(var k in o)   
        if(new RegExp("("+ k +")").test(fmt))   
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
      return fmt;   
    }  
    
    
    function commonConfirmGoods(title,callback) {
    	$(".modal-title").text(title);
        $('.commonConfirmGoods').off('click', 'button');
        $('.commonConfirmGoods').on('click', 'button', function (e) {
            var _id = $(e.currentTarget).attr('id');
            console.log(_id);
            switch (_id) {
                case 'cancle':
                    break;
                case 'yes':
                    callback();
                    break;
            }
        }); 
    }
    
	
	function commonConfirm(title, body, item, callback) {
        $(".modal-title").text(title);
        $(".modal-body-text").text(body);
        $(".item-name").text(item); 
        $('.commonConfirm').off('click', 'button');
        $('.commonConfirm').on('click', 'button', function (e) {
            var _id = $(e.currentTarget).attr('id');
            console.log(_id);
            switch (_id) {
                case 'cancle':
                    break;
                case 'yes':
                    callback();
                    break;
            }
        }); 
    }
	
	function commonConfirm1(title, body, item, callback) {
	    $(".modal-title").text(title);
	    $(".modal-body-text").text(body);
	    $(".item-name1").text(item); 
	    $('.commonConfirm1').off('click', 'button');
	    $('.commonConfirm1').on('click', 'button', function (e) {
	        var _id = $(e.currentTarget).attr('id');
	        console.log(_id);
	        switch (_id) {
	            case 'cancle':
	                break;
	            case 'yes':
	                callback();
	                break;
	        }
	    });
	} 
	function mySuccessModal(callback, callback2) { 
	    $('.mySuccessModal').off('click', 'button');
	    $('.mySuccessModal').on('click', 'button', function (e) {
	        var _id = $(e.currentTarget).attr('id');
	        console.log(_id);
	        switch (_id) {
	            case 'cancle': 
	            	callback();
	                break;
	            case 'yes':
	                callback2();
	                break;
	        }
	    });
	} 
	function mySuccessModal1(title, body, no, yes, callback, callback2) {
	    $(".prompt-title").text(title);
	    $(".prompt").text(body);
	    $(".mySuccessModal1 .back").html(no);
	    $(".mySuccessModal1 .go").html(yes);
	    $('.mySuccessModal1').off('click', 'button');
	    $('.mySuccessModal1').on('click', 'button', function (e) {
	        var _id = $(e.currentTarget).attr('id');
	        console.log(_id);
	        switch (_id) {
		        case 'yes':
	                callback();
	                break; 
	            case 'cancle':
	            	callback2();
	            	break; 
	        }
	    });
	} 
	function mySuccessModal2(title) { 
		$('.mySuccessModal2').modal('show');
	    $(".prompt-title").text(title);	  
	    setTimeout(function(){
	    	$('.mySuccessModal2').modal('hide');
        },1000);
	} 
	function alert(msg, btn, callback){ 
		$('.alert').modal('show');
		$('.alert .prompt').text(msg);
		$('.alert .sure').text(btn); 
		 //当前时间
		setTimeout(function(){
        	$('.alert').modal('hide');
        },3000);
	}
	
	function alert1(title) { 
		$('.alert1').modal('show');
	    $(".prompt-title").text(title);	  
	    setTimeout(function(){
	    	$('.alert1').modal('hide');
        },2000);
	} 
	
	function scanForm(form,fn){ 
		var _callback = fn; 
        var _table = $('.scan-table'),
            _trs = '',
            _inputs = form.find('input[data-name]');
        	_trs += '<tr>';
        $.each(_inputs, function (i, val) {
        	  var ele = $(val),
        	  isHidden = ele.attr('type') == 'hidden' || ele.hasClass('input-hidden'),
              btn = ele.siblings('button'),
              btnLen = btn.length,
              tdText = ele.val();
        	 
        	  if(ele.data('name')=='orderid'){
        		  _trs += '<td class="scan_id">' + tdText ;
        	  } else if(ele.data('name')=='receiverproid'){
        		  if(tdText>0){
        			  tdText = btn.children('.option-name').text(); 
        			  $("#receiverpcdt").val(tdText);
        			  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';  
        			  return ;
        		  } 
        	  } else if(ele.data('name')=='receivercityid'){
        		  if(tdText>0){
        			  tdText = btn.children('.option-name').text(); 
        			  $("#receiverpcdt").val($("#receiverpcdt").val()+tdText);
        			  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';  
        			  return ;
        		  }
        		  
        	  } else if(ele.data('name')=='receiverdistrictid'){
        		  if(tdText>0){
        			  tdText = btn.children('.option-name').text(); 
        			  $("#receiverpcdt").val($("#receiverpcdt").val()+tdText);
        			  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';  
        			  return ;
        		  } 
        	  } else if(ele.data('name')=='receiverpcdt'){
        		  _trs += '<td>' + tdText ;
        		  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';   
        		  return;
        	  } else if(ele.data('name')=='sendfee'){
        		  _trs += '<td class="sendfee">' + tdText + '</td>'; 
        		  return ;
        	  } else if(ele.data('name')=='weight'){
        		  _trs += '<td>' + tdText ;
        		  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';   
        		  $("#weight").val('');
        		  return;
        	  } else if(ele.data('name')=='volume'){
        		  _trs += '<td>' + tdText ;
        		  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';
        		  $("#volume").val('');
        		  return;
        	  } else if(isHidden) { 
        		  if(btnLen > 0) {
  	                  tdText = btn.children('.option-name').text(); 
  	                  _trs += '<td>' + tdText ;
        		  }else{
        			  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>';  
        			  return ;
        		  } 
        	  } else{
        		  _trs += '<td>' + tdText ;
        	  } 
        	  
        	  _trs += '<input type="hidden" name="' + ele.data('name') + '" value="' + ele.val() + '"/>' +
           	 	'</td>';  
        	 
        });
		
        _trs+='<td><button type="button" class="btn btn-danger btn-xs delete-scan">删除</button></td></tr>';
  	  	_table.append(_trs);  
  	  	
  	  	$('#scan-preview-body').on('click', '.delete-scan', function (e) {
  	  		$(this).parents('tr').remove();
  	  	}); 
  	  	
  	  	
  	  	
	} 
	 
	function ShowList(url, $input, $drop, paramObj, dataId, dataName) {
        this.url = url;
        this.inputName = $input;
        this.wrapper = $drop;
        this.paramObj = paramObj;
        this.dataId = dataId;
        this.dataName = dataName;
        this.init();
    }
	
	function ShowList2(url, $input, $drop, paramObj, dataId, dataName) {
        this.url = url;
        this.inputName = $input;
        this.wrapper = $drop;
        this.paramObj = paramObj;
        this.dataId = dataId;
        this.dataName = dataName;
        this.init();
    }
	
	ShowList.prototype.init = function () {
        var _itemArray = [],
            _wrapper = this.wrapper,
            _input = this.inputName,
            _dataId = this.dataId,
            _dataName = this.dataName,
            _self = this;

        _input.on('focus', function (e) {
            var _this = $(this),
                liHtml = '';
            _this.parent().addClass('open');
            if (_itemArray.length !== 0) return;
            $.get(_self.url, _self.paramObj).done(function (data) {
                var list = data.list; 
                $.each(list, function (i, val) {
                    liHtml += '<li><a data-id="' + list[i][_dataId] + '" href="javascript:;">' +  list[i][_dataName] + '</a></li>';
                    _itemArray.push('<li><a data-id="' + list[i][_dataId] + '" href="javascript:;">' + list[i][_dataName] + '</a></li>');
                });
                liHtml === '' ? liHtml = '<li class="text-center text-info">没有找到结果</li>' : liHtml;
                _wrapper.html(liHtml); 
            });
        }).on('keyup', function (e) {
            var keyword,
                len = _itemArray.length,
                str = '',
                html = '';
            // 拆分关键字 start 
            var keyValue = $(this).val().split(/\s+/),
                newKey = [];
            $.each(keyValue, function (i, val) {
                newKey.push(val.replace(/\S+/, '($&)\\S*'));
            });
            keyword = new RegExp(newKey.join('')); 
            // 拆分关键字 end
            for (var i = 0; i < len; i += 1) {
                str = _itemArray[i];
                if (keyword.test(str)) {
                    html += _itemArray[i]; 
                }
            }
            html === '' ? html = '<li class="text-center text-info">没有找到结果</li>' : html;
            _wrapper.html(html);
            if($(this).val().length<1){
            	var $this = $(this),
                  _inputHidden = _wrapper.siblings('[type="hidden"]');
            	  _input.val("");
                  _inputHidden.val("");
            }
        }).on('click', function (e) {
            e.stopPropagation();
        });
        _wrapper.on('click', 'a', function (e) {
            var $this = $(this),
                _inputHidden = _wrapper.siblings('[type="hidden"]'),
                _id = $this.data('id'),
                _text = $this.text();
            _input.val(_text); 
            _inputHidden.val(_id); 
            if(typeof callback === 'function')
            	callback($(_inputHidden).data('name'),_id,_text);
        }); 
    }; 
    
    ShowList2.prototype.init = function () {
        var _itemArray = [],
            _wrapper = this.wrapper,
            _input = this.inputName,
            _dataId = this.dataId,
            _dataName = this.dataName,
            _self = this;

        _input.on('keyup', function (e) {
        	if(_input.val()==null||_input.val()=='')
        		return;
        	var _this = $(this),
            liHtml = '';
	        _this.parent().addClass('open');
//	        if (_itemArray.length !== 0) return;
	        $.get(_self.url, {carno:_input.val()}).done(function (data) {
	            var list = data.list; 
	            $.each(list, function (i, val) {
	                liHtml += '<li><a data-id="' + list[i][_dataId] + '" href="javascript:;">' +  list[i][_dataName] + '</a></li>';
	                _itemArray.push('<li><a data-id="' + list[i][_dataId] + '" href="javascript:;">' + list[i][_dataName] + '</a></li>');
	            });
	            liHtml === '' ? liHtml = '<li class="text-center text-info">没有找到结果</li>' : liHtml;
	            _wrapper.html(liHtml); 
	        });
        }).on('click', function (e) {
            e.stopPropagation();
        });
        _wrapper.on('click', 'a', function (e) {
            var $this = $(this),
                _inputHidden = _wrapper.siblings('[type="hidden"]'),
                _id = $this.data('id'),
                _text = $this.text();
            _input.val(_text); 
            _inputHidden.val(_id); 
            if(typeof callback === 'function')
            	callback($(_inputHidden).data('name'),_id,_text);
        }); 
    }; 
    
    function setdropdown(ul,a,value){ 
    	$("#"+ul).find("li").each(function(){
    		if(value==$(this).find("a").data(a))
    			$("#"+ul).siblings('button').find('.option-name').text($(this).find("a").text()); 
    	 });
    }
	
    function setTabBotton(){
    	var contentWidth=0;
    	var navWidth=document.body.offsetWidth;
    	$('.navtab ul li').each(function(){
    		contentWidth+=$(this).width();
    	});
    	contentWidth+=158;
    	if(contentWidth>navWidth){
    		$('.l-tab-links-left,.l-tab-links-right').css('display','block');
    	}else{
    		$('.l-tab-links-left,.l-tab-links-right').css('display','none');
    		$('.navtab ul').css('left',0);
    	}	   
    }
    function moveToTabItem(item){
    	var temp=0,contentWidth=0;
    	var oParent=parseInt($('.navtab ul').css('left'));
    	$('.navtab ul li').each(function(){
    		temp=contentWidth;
    		contentWidth+=$(this).width();
    		if($(this).find('a').text()==item){
    			return false;
    		}
    	});
    	if(contentWidth>=document.body.offsetWidth-158-oParent){
			var offset=(document.body.offsetWidth-158-contentWidth)-16;	    		
			$('.navtab ul').css('left',offset+"px");
		}else if(contentWidth-76<=-1*oParent){
			$('.navtab ul').css('left',-1*(temp-16)+"px");
		} 
    }
    
    /** 转换时间start **/
    function getFormatDate(time, format){
    	if(time==null || time=="") {
    		return "--";
    	}
    	var t = new Date(time);
    	var tf = function(i){
    		return (i < 10 ? '0' : '') + i
    	};
    	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
    		switch(a){
    			case 'yyyy':
    				return tf(t.getFullYear());
    				break;
    			case 'MM':
    				return tf(t.getMonth() + 1);
    				break;
    			case 'mm':
    				return tf(t.getMinutes());
    				break;
    			case 'dd':
    				return tf(t.getDate());
    				break;
    			case 'HH':
    				return tf(t.getHours());
    				break;
    			case 'ss':
    				return tf(t.getSeconds());
    				break;
    		};
    	});
    };

    function getSmpFormatDate(date) {  
        var pattern = "";  
        pattern = "yyyy-MM-dd HH:mm:ss";  
        return getFormatDate(date, pattern);  
    }  

    function getFormatDateByLong(l, pattern) {  
        return getFormatDate(new Date(l), pattern);  
    } 
    /** 转换时间end **/
    
    
	return {
		 commonConfirm: commonConfirm,
		 commonConfirm1: commonConfirm1,
		 mySuccessModal:mySuccessModal,
		 mySuccessModal1:mySuccessModal1,
		 mySuccessModal2:mySuccessModal2,
		 alert:alert,
		 alert1:alert1,
		 scanForm:scanForm,
		 ShowList: ShowList,
		 ShowList2: ShowList2,
		 setdropdown: setdropdown,
		 setTabBotton:setTabBotton,
		 moveToTabItem:moveToTabItem,
		 getFormatDateByLong:getFormatDateByLong,
		 getSmpFormatDate:getSmpFormatDate,
		 commonConfirmGoods:commonConfirmGoods
	};
	
});