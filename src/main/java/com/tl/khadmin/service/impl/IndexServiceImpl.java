package com.tl.khadmin.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.mapper.StaffoperationMapper;
import com.tl.khadmin.mapper.StaffroleoperationMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.IndexService;
import com.tl.khadmin.util.Constant;

@Service
public class IndexServiceImpl implements IndexService{

	@Autowired
	private StaffoperationMapper staffoperationMapper;
	@Autowired
	private StaffroleoperationMapper staffroleoperationMapper;
	
	/**
	 * 加载侧边栏菜单
	 */
	@Override
	public Page<Staffoperation> getMenuByRolevalue(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Staffoperation> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		List<Staffoperation> menulist = staffoperationMapper.getTwoMenuByRolevalue(params);
		List<Staffoperation> parentmenulist = new ArrayList<>();
		for(Staffoperation subopt:menulist){
			if(subopt.getIspage() == 0){//0不显示，1显示
				continue;
			}
			Map<String, Object> parentparams = new HashMap<>();
			parentparams.put("id", subopt.getParentid());
			parentparams.put("type", Constant.OPT_TEAM);
			List<Staffoperation> parent= staffoperationMapper.getOneMenuByRolevalue(parentparams);
			if(parent!=null && parent.size()==1 && !parentmenulist.contains(parent.get(0)) && parent.get(0).getIspage() != 0){
				parentmenulist.add(parent.get(0));
			}
		}
		for(Staffoperation oneparent:parentmenulist){
			List<Staffoperation> subMenuList = new ArrayList<>();
			for(Staffoperation subopt:menulist){
				if(subopt.getParentid().compareTo(oneparent.getId())==0){
					subMenuList.add(subopt);
				}
			}
			oneparent.setSubMenuList(subMenuList);
		}

		page.setResult(parentmenulist);
		return page;
	}
	
	/**
	 * 检查权限
	 */
	@Override
	public Boolean checkRolePrivilege(Map<String, Object> params) {
		List<Integer> list = staffroleoperationMapper.checkRolePrivilege(params);
		if (list != null && list.get(0) > 0) {//第一条数据结果是该路径是否默认拦截，若默认不拦截放行
			return true;
		}else{
			if(list != null && list.get(1) == 1){//第二条数据结果是该角色是否有该操作权限，若有则放行
				return true;
			}else{
				return false;
			}
		}
	}

	@Override
	public Boolean checkuriPrivilege(Map<String, Object> params) {
		Integer result = staffoperationMapper.checkuriPrivilege(params);
		if(result==1){//查询仅为一条数据且默认不拦截
			return true;
		}else{
			return false;
		}
	}
	
}