package com.tl.khadmin.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.bean.Staffrole;
import com.tl.khadmin.bean.Staffroleoperation;
import com.tl.khadmin.bean.Vipoperation;
import com.tl.khadmin.bean.Viprole;
import com.tl.khadmin.bean.Viproleoperation;
import com.tl.khadmin.mapper.StaffoperationMapper;
import com.tl.khadmin.mapper.StaffroleMapper;
import com.tl.khadmin.mapper.StaffroleoperationMapper;
import com.tl.khadmin.mapper.VipoperationMapper;
import com.tl.khadmin.mapper.ViproleMapper;
import com.tl.khadmin.mapper.ViproleoperationMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.PrivilegeIService;
import com.tl.khadmin.util.CommonUtil;
import com.tl.khadmin.util.Constant;
 
@Service
public class PrivilegeServiceImpl implements PrivilegeIService{

	@Resource
	private ViproleMapper viproleMapper;
	@Resource
	private VipoperationMapper vipoperationMapper;
	@Resource
	private ViproleoperationMapper viproleoperationMapper;
	
	@Resource
	private StaffroleMapper staffroleMapper;
	@Resource
	private StaffoperationMapper staffoperationMapper;
	@Resource
	private StaffroleoperationMapper staffroleoperationMapper;
	
	
	@Override
	public String gwadd(Viproleoperation bean) {
		if(bean==null)
			return CommonUtil.result(0);
		Integer result = viproleoperationMapper.insert(bean);
		return CommonUtil.returnMapResultByRows(result, "添加权限操作成功!", "添加权限操作失败!");
	}
	@Override
	public String gwdelete(Integer id) {
		if(id==null)
			return CommonUtil.result(0);
		Integer result = viproleoperationMapper.deleteByPrimaryKey(id);
		return CommonUtil.result(result);
	}
	@Override
	public Page<Vipoperation> gwvipoperation(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Vipoperation> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		params.put("parentid", -1);
		params.put("type", Constant.OPT_TEAM);
		List<Vipoperation> menulist = vipoperationMapper.getVipoperationlist(params);
		Map<String, Object> optpar = new HashMap<>();
		optpar.put("rolevalue", params.get("rolevalue"));
		//该角色已设置 的权限列表
		List<Vipoperation> choosedOptList = vipoperationMapper.getChoosedOptList(optpar);
		//已经设置权限的操作id字符串
		String choosedStr = ",";
		for(Vipoperation opt:choosedOptList){
			choosedStr += opt.getId() + "," ;
		}
		for(Vipoperation bean : menulist){
			params.put("parentid", bean.getId());
			params.put("type", Constant.OPT_MODULE);
			List<Vipoperation> subMenuList = vipoperationMapper.getVipoperationlist(params);
			bean.setChoosedStr(choosedStr);
			bean.setSubMenuList(subMenuList);
			for(Vipoperation bean01:subMenuList){
				params.put("parentid", bean01.getId());
				params.put("type", Constant.OPT_OPERATION);
				List<Vipoperation> subOperationList = vipoperationMapper.getVipoperationlist(params);
				bean01.setSubOperationList(subOperationList);
				bean01.setChoosedStr(choosedStr);
				for(Vipoperation bean02:subOperationList){
					bean02.setChoosedStr(choosedStr);
				}
			}
		}
		page.setResult(menulist);
		
		return page;
	}
	@Override
	public Page<Viprole> gwviprole(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Viprole> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		List<Viprole> list = viproleMapper.viprolelist(params);
		page.setResult(list);
		return page;
	}
	@Override
	public Page<Viproleoperation> gwviproleoperation(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Viproleoperation> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		List<Viproleoperation> list = viproleoperationMapper.getViproleoperationlist(params);
		page.setResult(list);
		return page;
	}
	@Override
	public Vipoperation getgwOperationById(Integer id) {
		if(id==null)
			return null;
		Map<String,Object> params = new HashMap<>();
		params.put("id", id);
		params.put("type", Constant.OPT_OPERATION);
		return vipoperationMapper.getVipoperationlist(params).get(0);
	}
	@Override
	public String gwupdate(Viproleoperation bean) {
		return CommonUtil.result(viproleoperationMapper.updateByPrimaryKey(bean));
	}
	@Override
	public Integer gwdeleteByrolevalue(Integer rolevalue) {
		return viproleoperationMapper.gwdeleteByrolevalue(rolevalue);
	}
	
	@Override
	public String htaddrole(Staffrole bean) {
		Integer result = staffroleMapper.insert(bean);
		return CommonUtil.returnMapResultByRows(result, "添加后台员工角色成功!", "添加后台员工角色失败!");
	}
	@Override
	public String htadd(Staffroleoperation bean) {
		Integer result = staffroleoperationMapper.insert(bean);
		return CommonUtil.returnMapResultByRows(result, "添加权限操作成功!", "添加权限操作失败!");
	}
	@Override
	public String htbatchAdd(List<Staffroleoperation> addRoleOptlist) {
		Integer result = staffroleoperationMapper.batchAdd(addRoleOptlist);
		if(result == addRoleOptlist.size()){
			result = 1;
		}else{
			result = 0;
			TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();//事物回滚
		}
		return CommonUtil.returnMapResultByRows(result, "添加权限操作成功!", "添加权限操作失败!");
	}
	@Override
	public String htdelete(Integer id) {
		if (id==null) {
			CommonUtil.result(0);
		}
		//TODO 
		return "";
	}
	
	@Override
	public Page<Staffoperation> htstaffoperation(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Staffoperation> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		params.put("parentid", -1);
		params.put("type", Constant.OPT_TEAM);
		List<Staffoperation> menulist = staffoperationMapper.getStaffoperationlist(params);
		Map<String, Object> optpar = new HashMap<>();
		optpar.put("rolevalue", params.get("rolevalue"));
		//该角色已设置 的权限列表
		List<Staffoperation> choosedOptList = staffoperationMapper.getChoosedOptList(optpar);
		//已经设置权限的操作id字符串
		String choosedStr = ",";
		for(Staffoperation opt:choosedOptList){
			choosedStr += opt.getId() + "," ;
		}
		for(Staffoperation bean : menulist){//一级目录
			params.put("parentid", bean.getId());
			params.put("type", Constant.OPT_MODULE);
			List<Staffoperation> subMenuList = staffoperationMapper.getStaffoperationlist(params);
			
			for(Staffoperation bean01:subMenuList){//二级页面
				params.put("parentid", bean01.getId());
				params.put("type", Constant.OPT_OPERATION);
				List<Staffoperation> subOperationList = staffoperationMapper.getStaffoperationlist(params);//三级操作
				
				Iterator<Staffoperation> it = subOperationList.iterator();
				while(it.hasNext()){
					Staffoperation s3 = it.next();
				    if(s3.getValue() == 2){//当默认不拦截时在权限控制中不显示权限操作（1：拦截，2：不拦截）
				        it.remove();
				    }
				}
				if(subOperationList.size() > 0){
					bean01.setSubOperationList(subOperationList);
					bean01.setChoosedStr(choosedStr);
					for(Staffoperation bean02:subOperationList){
						bean02.setChoosedStr(choosedStr);
					}
				}else{
					//如果页面下操作为空不显示该页面
					System.out.println("如果页面下操作为空不显示该页面");
				}
			}
			
			Iterator<Staffoperation> two = subMenuList.iterator();
			while(two.hasNext()){
				Staffoperation s2 = two.next();
			    if(s2.getSubOperationList() == null){
			    	two.remove();
			    }
			}
			
			if(subMenuList.size() > 0){
				bean.setChoosedStr(choosedStr);
				bean.setSubMenuList(subMenuList);
			}else{
				//如果一级目录下页面为空不显示该一级目录
				System.out.println("如果一级目录下页面为空不显示该一级目录");
			}
		}
		
		Iterator<Staffoperation> one = menulist.iterator();
		while(one.hasNext()){
			Staffoperation s1 = one.next();
		    if(s1.getSubMenuList() == null){
		    	one.remove();
		    }
		}
		page.setResult(menulist);
		
		return page;
	}
	
	@Override
	public Page<Staffrole> htstaffrole(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Staffrole> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		List<Staffrole> list = staffroleMapper.staffrolelist(params) ;
		page.setResult(list);
		return page;
	}
	@Override
	public Page<Staffroleoperation> htstaffroleoperation(Integer pageNum,Integer pageSize,Map<String, Object> params) {
		Page<Staffroleoperation> page = new Page<>(pageNum,pageSize);
		params.put("page", page);
		List<Staffroleoperation> list = staffroleoperationMapper.getStaffroleoperationlist(params) ;
		page.setResult(list);
		return page;
	}
	@Override
	public Staffoperation gethtOperationById(Integer id) {
		if(id==null)
			return null;
		Map<String,Object> params = new HashMap<>();
		params.put("id", id);
		params.put("type", Constant.OPT_OPERATION);
		return staffoperationMapper.getStaffoperationlist(params).get(0);
	}
	@Override
	public String htupdate(Staffroleoperation bean) {
		return CommonUtil.result(staffroleoperationMapper.updateByPrimaryKey(bean));
	}
	@Override
	public Integer htdeleteByrolevalue(Integer rolevalue) {
		return staffroleoperationMapper.htdeleteByrolevalue(rolevalue);
	}
	@Override
	public String gwaddviprole(Viprole viprole) {
		Integer result = viproleMapper.insert(viprole);
		return CommonUtil.returnMapResultByRows(result, "添加官网员工角色成功!", "添加官网员工角色失败!");
	}
}