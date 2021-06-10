/* */
define(
		[ 'jquery' ],
		function($) {

			var Address = function(options) {
				this.initproid = options.initproid;
				this.initcid = options.initcid;
				this.initdid = options.initdid;
				this.wrapper = options.wrapper;
				this.province = options.provinceWrapper;
				this.city = options.cityWrapper;
				this.district = options.districtWrapper;
				this.town = options.townWrapper;
				this.groupItems = this.wrapper.find('[role=group]');
				this.isShowAllBtn = options.isShowAllBtnWrapper; 
				this.init();
			};

			Address.prototype.init = function() {
				var _pid, 
				_cid, 
				_did, 
				_tid, 
				$province = this.province, 
				$city = this.city, 
				$district = this.district, 
				$town = this.town,
				$isShowAllBtn = this.isShowAllBtn,
				allDataOption = "<li><a data-type='all' href=javascript:;>全部</a></li>",
				_this = this;
				$
						.getJSON(
								ctx + "/common/province",
								function(data) {
									var jsonObj = data.province;
									for (var i = 0; i < jsonObj.length; i++) {
										var $option = $('<li><a href="javascript:;"></a></li>');
										var row = jsonObj[i];
										$option.find('a').data("proid", row.id)
												.attr('data-proid', row.id);
										$option.find('a').text(row.name);
										$province.append($option);
									}
								});
				if (this.initcid != null && this.initcid != '') {
					$
							.getJSON(
									ctx + "/common/city",
									{
										pid : this.initproid
									},
									function(data) {
										var jsonObj = data.city;
										for (var i = 0; i < jsonObj.length; i++) {
											var $option = $('<li><a href="javascript:;"></a></li>');
											var row = jsonObj[i];
											$option.find('a').data("cid",
													row.id).attr('data-cid',
													row.id);
											$option.find('a').text(row.name);
											$city.append($option);
										}
									});
				}
				if (this.initdid != null && this.initdid != '') {
					$
							.getJSON(
									ctx + "/common/district",
									{
										cid : this.initcid
									},
									function(data) {
										var jsonObj = data.district;
										for (var i = 0; i < jsonObj.length; i++) {
											var $option = $('<li><a href="javascript:;"></a></li>');
											var row = jsonObj[i];
											$option.find('a').data("did",
													row.id).attr('data-did',
													row.id);
											$option.find('a').text(row.name);
											$district.append($option);
										}
									});
				}
				/* 根据省份获取城市 */
				$province.on('click', 'a', function() {
					var _txt = $(this).text();
					_pid = $(this).data('proid');
					
					$province.siblings('.input-hidden').val(_pid);//input赋值
					$province.siblings('.input-hidden').data('name',_txt)
					
					$city == null ? "" : $city.html("");
					$city.prev().attr('disabled', false).children(
							'.option-name').text("选择城市");
					$district == null ? "" : $district.html("");
					$district.prev().attr('disabled', false).children(
							'.option-name').text("选择区域");
					if ($town != null) {
						$town.html("");
						$town.prev().attr('disabled', false).children(
								'.option-name').text("选择街道、乡镇");
					}
					_this.addAdvice({
						nextId : $city,
						currentText : _txt,
						paraObj : {
							pid : _pid
						},
						replaceText : '选择城市',
						url : ctx + "/common/city",
						currentDataId : 'proid',
						nextDataId : 'cityid',
						dataId : _pid
					});
				});
				/* 根据城市获取区、县 */
				$city.on('click', 'a', function() {
					var _txt = $(this).text();
					_cid = $(this).data('cityid');
					$city.siblings('.input-hidden').val(_cid);//input赋值
					$city.siblings('.input-hidden').data('name',_txt)
					
					$district == null ? "" : $district.html("");
					$district.prev().attr('disabled', false).children(
							'.option-name').text("选择区域");
					if ($town != null) {
						$town.html("");
						$town.prev().attr('disabled', false).children(
								'.option-name').text("选择街道、乡镇");
					}
					
					_this.addAdvice({
						nextId : $district,
						currentText : _txt,
						paraObj : {
							cid : _cid
						},
						replaceText : '选择区域',
						url : ctx + "/common/district",
						currentDataId : 'cityid',
						nextDataId : 'did',
						dataId : _cid
					});
				});

				/* 根据城市获取乡镇 */
				$district.on('click', 'a', function() {
					var _txt = $(this).text();
					_did = $(this).data('did');
					$district.siblings('.input-hidden').val(_did);//input赋值
					$district.siblings('.input-hidden').data('name',_txt);
					
					if ($town != null) {
						$town.html("");
						$town.prev().attr('disabled', false).children(
								'.option-name').text("选择街道、乡镇");
					}
					
					if($(this).data('type')=='all') {
						$('.dropdown-menu').css('display','none');
						$district.siblings('.input-hidden').data('name','');
						$town.siblings('.input-hidden').data('name','');
						/** 设定pcdt input的显示值 **/
						var showpcdt_inputname = $district.siblings('.input-hidden').data("showpcdt");
						var pcdt_inputclass = $district.siblings('.input-hidden').data("pcdtclass");
						var senderdistrict = '';
						$("."+pcdt_inputclass).each(function(a,b){
					        var name = $(b).data("name");
					        if(name!=null && name!="") {
					        	senderdistrict += name+"-";
					        }
					    });
						$("input[name="+showpcdt_inputname+"]").val(senderdistrict.substring(0,senderdistrict.length-1));
						/** 设定pcdt input的显示值 **/
					} else {
						_this.addAdvice({
							nextId : $town,
							currentText : _txt,
							paraObj : {
								did : _did
							},
							replaceText : '选择街道、乡镇',
							url : ctx + "/common/town",
							currentDataId : 'did',
							nextDataId : 'tid',
							dataId : _did
						});
					}
				});
				
				/* 根据城市获取乡镇 */
				$town.on('click', 'a', function() {
					var _txt = $(this).text();
					_tid = $(this).data('tid');
					$town.siblings('.input-hidden').val(_tid);//input赋值
					$town.siblings('.input-hidden').data('name',_txt);
					
						var showpcdt_inputname = $town.siblings('.input-hidden').data("showpcdt");
						var pcdt_inputclass = $town.siblings('.input-hidden').data("pcdtclass");
						var senderdistrict = '';
						$("."+pcdt_inputclass).each(function(a,b){
					        var name = $(b).data("name");
							senderdistrict += name+"-";
					    });
					if($(this).data('type')=='all') {
						$town.siblings('.input-hidden').data('name','')
						$("input[name="+showpcdt_inputname+"]").val(senderdistrict.substring(0,senderdistrict.length-4));
						$('.dropdown-menu').css('display','none');
					}else{
						$("input[name="+showpcdt_inputname+"]").val(senderdistrict.substring(0,senderdistrict.length-1));
					}
				});

				Address.prototype.addAdvice = function(option) {
					$.getJSON(option.url,
								option.paraObj,
								function(data) {
									console.log(data);
									if (data == '')
										return;
									var jsonObj = null;
									if (option.nextDataId == 'cityid') {
										jsonObj = data.city;
									}else if (option.nextDataId == 'did'){
										if($isShowAllBtn==1) {
											option.nextId.append(allDataOption);
											$("input[name='townid']").val('')
										}
										jsonObj = data.district;
									}else if (option.nextDataId == 'tid'){
										if($isShowAllBtn==1) {
											option.nextId.append(allDataOption);
											
										}
										jsonObj = data.town;
									}	
									for (var i = 0; i < jsonObj.length; i++) {
										var $option = $("<li><a href=javascript:;></a></li>");
										var row = jsonObj[i];
										if (option.nextDataId == 'cityid')
											$option.find('a').data("cid",
													row.id).attr(
													'data-cid', row.id);
										else if (option.nextDataId == 'did')
											$option.find('a').data("did",
													row.id).attr(
													'data-did', row.id);
										else if (option.nextDataId == 'tid')
											$option.find('a').data("tid",
													row.id).attr(
													'data-tid', row.id);
										$option.find('a').data(
												option.nextDataId, row.id);
										$option.find('a').text(row.name);
										option.nextId.append($option);
									}
								});
				};
			}
			return {
				Address : Address
			}
		});