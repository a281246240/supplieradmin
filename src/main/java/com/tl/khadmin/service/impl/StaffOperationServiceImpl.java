package com.tl.khadmin.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.mapper.StaffoperationMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.StaffOperationIService;
import com.tl.khadmin.util.CommonUtil;

@Service
public class StaffOperationServiceImpl implements StaffOperationIService{

	@Resource
	private StaffoperationMapper staffoperationMapper;

	@Override
	public Page<Staffoperation> showStaffOperationByPage(int pageNum, int pageSize, Map<String, Object> params) {

		Page<Staffoperation> page=new Page<Staffoperation>(pageNum, pageSize);
        params.put("page", page);   
        List<Staffoperation> list= staffoperationMapper.selectStaffoperationByPage(params);  
		page.setResult(list);
		return page;

	}

	@Override
	public String saveStaffoperation(Staffoperation staffoperation) {

		int result = staffoperationMapper.insertSelective(staffoperation);
		return CommonUtil.returnMapResultByRows(result, "添加成功", "添加失败，请重试");
	}

	@Override
	public String queryStaffopernationByName(String name) {
		
		int res= staffoperationMapper.selectStaffoperationByName(name);
		if(res>0){
			return "yes";
		}else{
			return "no";
		}
	}

	@Override
	public Staffoperation queryStaffopernationById(Integer id) {

		return staffoperationMapper.selectByPrimaryKey(id);
	}

	@Override
	public String updateStaffopernation(Staffoperation staffopernation) {
		
		int result = staffoperationMapper.updateByPrimaryKeySelective(staffopernation);
		return CommonUtil.returnMapResultByRows(result, "修改成功","修改失败，请重试");
	}

	@Override
	public String deleteStaffopernationById(Integer id) {
		if(id==null)
			return CommonUtil.result(0);
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("parentid", id);
			List<Staffoperation> staffop1 = staffoperationMapper.getStaffoperationlist(params);
			if(staffop1.size()>0){
				int[] parentids1 = new int[staffop1.size()];
				int i=0;
				Map<String, Object> params1 = null;
				for(Staffoperation staffoperation1:staffop1){
					parentids1[i++] = staffoperation1.getId();
					
					params1 = new HashMap<String, Object>();
					params1.put("parentid", staffoperation1.getId());
					List<Staffoperation> staffop2 = staffoperationMapper.getStaffoperationlist(params1);
					
					if(staffop2.size()>0){
						int[] parentids2 = new int[staffop2.size()];
						int j=0;
						Map<String, Object> params2 = null;
						for(Staffoperation staffoperation2:staffop2){
							parentids2[j++] = staffoperation2.getId();
							params2 = new HashMap<String, Object>();
							params2.put("parentid", staffoperation2.getId());
						}
						staffoperationMapper.deleteByIds(parentids2);
					}
				}
				staffoperationMapper.deleteByIds(parentids1);
			}
			
			int result = staffoperationMapper.deleteByPrimaryKey(id);
			return CommonUtil.returnMapResultByRows(result, "删除成功","删除失败，请重试");
	}

/*	@Override
	public String deleteStaffopernationByIds(String _ids) {
		if(_ids==null)
			return CommonUtil.result(0);
		
		String[] ids = _ids.substring(0,_ids.length()-1).split(",");
		int[] arr = new int[ids.length];
		for(int i=0;i<arr.length;i++){
			arr[i] = Integer.valueOf(ids[i]);
		}
		
		int result = staffoperationMapper.deleteByIds(arr);
		if(result==ids.length){
			result=1;
		}
		return CommonUtil.returnMapResultByRows(result, "删除成功","删除失败，请重试");
	}*/

}
