require.config({
	baseUrl:"./js",
	paths:{
		"jquery": "libs/jquery-1.12.4",		
		"angular":"libs/angular",
		"angular-route":"libs/angular-route",
		"angular-sanitize":"libs/angular-sanitize", 
		
		"jquery-ui":"libs/jquery-ui",
		"validate":"libs/jquery.validate",
		"messages":"libs/messages_zh",
		"pagination":"libs/jquery.pagination",
		"bootstrap":"libs/bootstrap",
		
		"DD_belatedPNG":"libs/DD_belatedPNG_0.0.8a",
		"html5shiv":"libs/html5shiv",
		
		"appRoute":"routes/appRoute",
		"app":"controllers/app", 
		
		"msgCtrl":"controllers/msgCtrl",   
		
		"common": "common/common",
		"scanorder": "common/scanorder",
		"province": "common/province",
		"search": "common/search",
		"organization": "common/organization",		
		"timepicker": "libs/bootstrap-datetimepicker",
		"dateZh": "libs/bootstrap-datetimepicker.zh-CN",
		"plupload": 'upload/plupload.full.min',
        "pluploadQueue": 'upload/jquery.plupload.queue',
        "puploadZh": 'upload/zh_CN',
        "T_upload": "common/T_upload",
	},
	shim:{
		"angular": {
            exports: "angular"
        },
        "angular-route":{
        	deps:['angular'],
        	exports:"angular-route"
        },
        "angular-sanitize":{
        	deps:['angular'],
        	exports:"angular-sanitize"
        },  
        "pagination":{
        	deps:["jquery"],
        	exports: "pagination"
        },      
        "jquery-ui":{
        	deps:["jquery"],
        	exports: "jquery-ui"
        },      
        "validate":{
        	deps:["jquery","bootstrap"],
        	exports:"validate"
        },
        "messages":{
        	deps:["jquery","validate"],
        	exports:"messages"
        },
        "bootstrap":{
        	deps:["jquery","jquery-ui"],
        	exports: "bootstrap"
        },
        "timepicker": {
        	deps: ['jquery']
        },
        "dateZh": {
        	deps: ["jquery", "timepicker"]
        },
        "plupload": {deps: ['jquery']},
        "pluploadQueue": {deps: ['plupload']},
        "puploadZh": {deps: ['plupload']}
	}
});



var commonConfirmHtml='<div class="modal fade commonConfirm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
						'<div class="modal-dialog">'+
						'<div class="modal-content">'+
						'<div class="modal-header">'+
						'<h2 class="text-center"><i></i><span class=" modal-title">删除</span></h2>'+
						'</div>'+
						'<div class="modal-body">'+						
						'<p class="text-center "><span class="modal-body-text">确定删除</span><span class="item-name"></span></p>'+
						'</div>'+
						'<div class="text-center btn-gro">'+
						'<button type="button" id="cancle" class="btn btn-default back" data-dismiss="modal">取消</button>'+
						'<button type="button" id="yes" class="btn btn-default go ">确定</button>'+
						' </div> '+
						' </div> '+
						' </div> '+
						'</div>'; 
var commonConfirmHtml1='<div class="modal fade commonConfirm1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
						'<div class="modal-dialog">'+
						'<div class="modal-content">'+
						'<div class="modal-header">'+
						'<h2 class="text-center modal-title"><i></i>成功!</h2>'+
						'</div>'+
						'<div class="modal-body">'+						
						'<p class="text-center "><span class="modal-body-text">已成功提交</span><span class="item-name"></span></p>'+
						'</div>'+
						'<div class="text-center btn-gro">'+
						'<button type="button" id="cancle" class="btn btn-default back" data-dismiss="modal">取消</button>'+
						'<button type="button" id="yes" class="btn btn-default go ">确定</button>'+
						' </div> '+
						' </div> '+
						' </div> '+
						'</div>'; 
					
			
var mySuccessModal='<div class="modal fade mySuccessModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
					'<div class="modal-dialog">'+
					'<div class="modal-content">'+	
					'<div class="modal-header">'+ 
					'<h2 class="text-center">录入成功!</h2>'+
					'</div>'+
					'<div class="modal-body">'+							
					'<p class="text-center">如需继续录入，请点击返回继续录入</p>'+
					'</div>'+
					'<div class="text-center btn-gro">'+
					'<button type="button" id="cancle" class="btn btn-default back" data-dismiss="modal">返回继续录入</button>'+
					'<button type="button" id="yes" class="btn btn-default go ">前往订单列表</button>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>';
var mySuccessModal1='<div class="modal fade mySuccessModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
					'<div class="modal-dialog">'+
					'<div class="modal-content">'+	
					'<div class="modal-header">'+ 
					'<h2 class="text-center"><i></i><span class=" prompt-title">录入成功!</span></h2>'+
					'</div>'+
					'<div class="modal-body">'+							
					'<p class="text-center prompt">如需继续录入，请点击返回继续录入</p>'+
					'</div>'+
					'<div class="text-center btn-gro">'+
					'<button type="button" id="cancle" class="btn btn-default back" data-dismiss="modal">返回继续录入</button>'+
					'<button type="button" id="yes" class="btn btn-default go ">前往订单列表</button>'+
					'</div>'+
					'</div>'+
					'</div>'+
					'</div>';
var mySuccessModal2='<div class="modal fade mySuccessModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
					'<div class="modal-dialog">'+
					'<div class="modal-content">'+	
					'<div class="modal-header">'+
					'<h2 class="text-center"><i></i><span class=" prompt-title">录入成功!</span></h2>'+
					'</div>'+							
					'</div>'+
					'</div>'+
					'</div>';
var alertHtml='<div class="modal fade bs-example-modal-sm alert" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
				'<div class="modal-dialog">'+
				'<div class="modal-content">'+
				'<div class="modal-header">'+
				'<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+
				'<p class="text-center"><i></i><span class="prompt"></span></p>'+
				'</div>'+
				'<div class="modal-body text-center">'+
				'<button type="button" id="yes" class="btn btn-default sure" data-dismiss="modal"></button>'+
				'</div>'+					
				'</div>'+
				'</div>'+
				'</div>';
var alert1Html='<div class="modal fade alert1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
				'<div class="modal-dialog">'+
				'<div class="modal-content">'+	
				'<div class="modal-header">'+
				'<h2 class="text-center"><i></i><span class=" prompt-title">录入成功!</span></h2>'+
				'</div>'+							
				'</div>'+
				'</div>'+
				'</div>';
var loadingHtml='<div class="loading">'+
					'<div class="loading-center">'+
						'<div class="loading-center-absolute">'+
							'<div class="object object_one"></div>'+
							'<div class="object object_two"></div>'+
							'<div class="object object_three"></div>'+
							'<div class="object object_four"></div>'+
						'</div>'+
					'</div>'+
				'</div>';