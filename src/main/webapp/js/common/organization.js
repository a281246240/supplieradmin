/**
 * 
 */
define(['jquery'], function ($) { 
	
	 var Address = function (options) {
	        this.wrapper = options.wrapper;
	        this.province = options.provinceWrapper;
	        this.city = options.cityWrapper;
	        this.district = options.districtWrapper;
	        this.organization = options.organizationWrapper;
	        this.town = options.townWrapper; 
	        this.input_id = options.input_idWrapper; 
	        this.isOnlySubOrg = options.isOnlySubOrgWrapper; 
	        this.groupItems = this.wrapper.find('[role=group]'); 
	        this.init();
	    };
	    
	    Address.prototype.init = function () {
	    	 var
	    	 _pid,
	         _cid,
	         _did,
	         _tid,
	         allDataOption = "<li><a data-type='allOrg' href=javascript:;>全部</a></li>",
	    	 $province = this.province,
	         $city = this.city,
	         $district = this.district,
	         $town = this.town, 
	         $input_id = this.input_id, 
	         $isOnlySubOrg = this.isOnlySubOrg, 
	         $organization = this.organization,
	         _this = this; 
	    	 $.getJSON(ctx+"/common/province", function (data) {
			      var jsonObj = data.province; 
			      for (var i = 0; i < jsonObj.length; i++) {
			          var $option = $('<li><a href="javascript:;"></a></li>');
			          var row = jsonObj[i];
			          $option.find('a').data("proid", row.id).attr('data-proid', row.id);
			          $option.find('a').text(row.name);
			          $province.append($option);
			      }
	    	 });
	    	 /* 根据省份获取城市 */
	    	 $province.on('click', 'a', function () { 
	             var _txt = $(this).text(); 
	             _pid = $(this).data('proid'); 
	             _this.addAdvice({ 
	                 nextId: $city, 
	                 currentText: _txt,
	                 paraObj: {
	                     pid: _pid
	                 },
	                 replaceText: '选择城市',
	                 url: ctx+"/common/city",
	                 currentDataId: 'proid',
	                 nextDataId: 'cityid',
	                 dataId: _pid
	             });
	    	 });
	    	 /* 根据城市获取乡镇 */
	    	 $city.on('click', 'a', function () {
	             var _txt = $(this).text(); 
	             _cid = $(this).data('cityid'); 
	             if($(this).data('type')=='allOrg') {
	            	 _this.addAdvice({ 
		                 nextId: $organization,
		                 currentText: _txt,
		                 paraObj: {
		                     did: '',  
		                     proid: _pid, 
		                     cid: '',
		                     isOnlySubOrg: $isOnlySubOrg
		                 },
		                 replaceText: '选择机构',
		                 url: ctx+"/organization/showorganizationlist",
		                 currentDataId: 'did',
		                 nextDataId: 'organizationid',
		                 dataId: _did
		             });
	            	 var _txt = $(this).text(); 
		             _did = $(this).data('organizationid');
	             }else{
		             _this.addAdvice({ 
		                 nextId: $district,
		                 currentText: _txt,
		                 paraObj: {
		                     cid: _cid
		                 },
		                 replaceText: '选择区域',
		                 url: ctx+"/common/district",
		                 currentDataId: 'cityid',
		                 nextDataId: 'did',
		                 dataId: _cid
		             });
	             }
	    	 });
	    	 
	    	 $district.on('click', 'a', function () {
	             var _txt = $(this).text(); 
	             _did = $(this).data('did'); 
	             
	             if($(this).data('type')=='allOrg') {
	            	 _this.addAdvice({ 
		                 nextId: $organization,
		                 currentText: _txt,
		                 paraObj: {
		                     did: '',  
		                     proid: _pid, 
		                     cid: _cid,
		                     isOnlySubOrg: $isOnlySubOrg
		                 },
		                 replaceText: '选择机构',
		                 url: ctx+"/organization/showorganizationlist",
		                 currentDataId: 'did',
		                 nextDataId: 'organizationid',
		                 dataId: _did
		             });
	            	 var _txt = $(this).text(); 
		             _did = $(this).data('organizationid');
	             }else{
		             _this.addAdvice({ 
		                 nextId: $organization,
		                 currentText: _txt,
		                 paraObj: {
		                     did: _did,  
		                     proid: _pid, 
		                     cid: _cid,
		                     isOnlySubOrg: $isOnlySubOrg
		                 },
		                 replaceText: '选择机构',
		                 url: ctx+"/organization/showorganizationlist",
		                 currentDataId: 'did',
		                 nextDataId: 'organizationid',
		                 dataId: _did
		             });
	             }
	             
	    	 });
	    	 
	    	 $organization.on('click', 'a', function () {
	             var _txt = $(this).text(); 
	             _did = $(this).data('organizationid');
	             if($input_id=='parent_org_update') {
	            	 $('#parent_org_update').val(_txt);
	            	 $('#parent_org_update_idvalue').val(_did);
	             }else if($input_id=='parent_org') {
	            	 $('#parent_org').val(_txt);
	            	 $('#parent_org_idvalue').val(_did);
	             } else if($input_id=='org-value') {
	            	 $('#org-value').val(_txt);
	            	 $('#org-id').val(_did);
	             }
	    	 });
	    	 
	    	 Address.prototype.addAdvice = function (option) { 
	    	        $.getJSON(option.url, option.paraObj, function (data) {
	    	            option.nextId.html('')
	    	                .prev().attr('disabled', false)
	    	                .children('.option-name')
	    	                .text(option.replaceText); 
	    	            console.log(data); 
	    	            if (data == '') 
	    	            	return; 
	    	            var jsonObj=null; 
	    	            if(option.nextDataId=='cityid') {
	    	            	option.nextId.append(allDataOption);
	    	            	jsonObj = data.city; 
	    	            } else if(option.nextDataId=='did') {
	    	            	option.nextId.append(allDataOption);
	    	            	jsonObj = data.district;  
	    	            } else if(option.nextDataId=='organizationid') {
	    	            	jsonObj = data.list;  
	    	            }
	    	            if(jsonObj!=null) { 
		    	            for (var i = 0; i < jsonObj.length; i++) {
		    	                var $option = $("<li><a href=javascript:;></a></li>");
		    	                var row = jsonObj[i];
		    	                $option.find('a').data(option.nextDataId, row.id);
		    	                if(option.nextDataId=='organizationid') {
		  	    	                $option.find('a').text(row.orgname);
			    	            } else {
		    	                	$option.find('a').text(row.name);
			    	            }
		    	                option.nextId.append($option);
		    	            }
		    	            if(option.nextDataId=='organizationid' && jsonObj.length==0) {
		    	            	option.nextId.append('暂无机构！');
	    	                }
	    	            }
	    	        });
	    	 };
	    	 
	    }
     return {
        Address: Address 
     }
});