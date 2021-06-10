package com.tl.khadmin.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.tl.khadmin.bean.Staffoperation;
import com.tl.khadmin.bean.Staffrole;
import com.tl.khadmin.bean.Staffroleoperation;
import com.tl.khadmin.bean.Vipoperation;
import com.tl.khadmin.bean.Viprole;
import com.tl.khadmin.bean.Viproleoperation;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.PrivilegeIService;
import com.tl.khadmin.util.CommonUtil;

/**
 * 权限管理
 * <p>Title: PrivilegeController</p>
 * <p>Description: </p>
 * <p>Company: </p> 
 * @author yp
 * @date 2017年3月11日 上午9:51:07
 */
@RequestMapping(value = "/privilege")
@Controller
public class PrivilegeController {
	
	@Autowired
	private PrivilegeIService privilegeService;
	
	
	/////////////官网相关///////////////////
	
	@RequestMapping(value = "/gwsetpage")
	public ModelAndView gwsetpage(){
		ModelAndView mv = new ModelAndView("/template/gwqxjssz");
		return mv;
	}
	
	/**
	 * 官网用户角色列表
	 * @param session
	 * @param pageNum
	 * @param pageSize
	 * @param name
	 * @param value
	 * @return
	 */
	@RequestMapping(value ="/gwviprole")
	@ResponseBody
	public Map<String, Page<Viprole>> gwviprole(HttpSession session,Integer pageNum,Integer pageSize,String name,Integer value){
		Map<String, Object> params = new HashMap<String,Object>();
		
		params.put("name", name);
		params.put("value", value);
		
		return CommonUtil.returnResultCodeJson("result", privilegeService.gwviprole(pageNum, pageSize, params));
	}
	
	/**
	 * 添加官网用户角色
	 * @param session
	 * @param staffrole
	 * @param br
	 * @return
	 */
	@RequestMapping(value = "/addgwRole")
	@ResponseBody
	public String addgwRole(HttpSession session,@Valid Viprole viprole,BindingResult br){
		return privilegeService.gwaddviprole(viprole);
	}
	
	/**
	 * 官网权限操作列表
	 * @param session
	 * @param pageNum
	 * @param pageSize
	 * @param name
	 * @param value
	 * @param parentid
	 * @param type
	 * @param ispage
	 * @param uri
	 * @param description
	 * @return
	 */
	@RequestMapping(value = "/gwvipoperation")
	@ResponseBody
	public Map<String, Page<Vipoperation>> getgwvipoperation(HttpSession session,Integer pageNum,Integer pageSize,String rolevalue,String name,
			Integer value,Integer parentid,Integer type,Integer ispage,String uri,String description){
		Map<String, Object> params = new HashMap<String,Object>();

		params.put("name", name);
		params.put("value", value);
		params.put("parentid", parentid);
		params.put("type", type);
		params.put("ispage", ispage);
		params.put("uri", uri);
		params.put("description", description);
		params.put("rolevalue", rolevalue);
		
		return CommonUtil.returnResultCodeJson("result", privilegeService.gwvipoperation(pageNum,pageSize,params));
	}
	
	/**
	 * 添加权限设置数据
	 * @param session
	 * @param values
	 * @return
	 */
	@RequestMapping(value = "/savegwoperationset")
	@ResponseBody
	public String savegwoperationset(HttpSession session,String values,String rolevalue){
		if(values==null||rolevalue==null){
			return CommonUtil.returnMapResultToJson("fail","权限设置保存失败!");
		}
		privilegeService.gwdeleteByrolevalue(Integer.valueOf(rolevalue));
		String[] opts = values.split(",");
		//待添加的角色权限设置
		List<Viproleoperation> addRoleOptlist = new ArrayList<>();
		//权限列表
		List<Vipoperation> operationlist = new ArrayList<>();
		
		for(String opt:opts){
			if(opt!=null && !opt.equals("")){
				Vipoperation operation = privilegeService.getgwOperationById(Integer.valueOf(opt));
				operationlist.add(operation);
			}
		}
		Integer parentid = 0;
		for(int i=0;i<operationlist.size();i++){
			if(operationlist.get(i).getParentid().compareTo(parentid)==0){
				continue;
			}
			parentid = operationlist.get(i).getParentid();
			
			Viproleoperation roleoperation = new Viproleoperation();
			Integer optvalue = operationlist.get(i).getValue();
			int j=0;
			for(j=i+1;j<operationlist.size();j++){
				if(operationlist.get(j).getParentid().compareTo(parentid)==0){
					optvalue += operationlist.get(j).getValue();
					//operationlist.remove(j);
				}
			}
			
			roleoperation.setModuleid(parentid);
			roleoperation.setOptvalue(optvalue);
			roleoperation.setRolevalue(Integer.valueOf(rolevalue));
			roleoperation.setLastupdatetime(new Date());
			addRoleOptlist.add(roleoperation);
		}
		
		String ret = "";
		for(Viproleoperation bean:addRoleOptlist){
			Map<String, Object> params = new HashMap<>();
			params.put("rolevalue", bean.getRolevalue());
			params.put("moduleid", bean.getModuleid());
			Page<Viproleoperation> page = privilegeService.gwviproleoperation(1, 200, params);
			
			if(page.getResult()!=null && page.getResult().size()==1){
				Viproleoperation update = page.getResult().get(0); 
				update.setOptvalue(bean.getOptvalue());
				update.setLastupdatetime(new Date());
				privilegeService.gwupdate(update);
				
			}else{
				ret = privilegeService.gwadd(bean);
			}
			
		}
		return ret;
	}
		
		
		
	
	////////////后台相关///////////////////
	/**
	 * 后台用户角色列表
	 * @param session
	 * @param pageNum
	 * @param pageSize
	 * @param name
	 * @param value
	 * @return
	 */
	@RequestMapping(value ="/htstaffrole")
	@ResponseBody
	public Map<String, Page<Staffrole>> htstaffrole(HttpSession session,Integer pageNum,Integer pageSize,String name,
			Integer value){
		Map<String, Object> params = new HashMap<String,Object>();
		
		params.put("name", name);
		params.put("value", value);
		
		return CommonUtil.returnResultCodeJson("result", privilegeService.htstaffrole(pageNum, pageSize, params));
	}
	
	/**
	 * 添加后台用户角色
	 * @param session
	 * @param staffrole
	 * @param br
	 * @return
	 */
	@RequestMapping(value = "/addhtRole")
	@ResponseBody
	public String addhtRole(HttpSession session,@Valid Staffrole staffrole,BindingResult br){
		return privilegeService.htaddrole(staffrole);
	}
	
	/**
	 * 后台权限操作列表
	 * @param session
	 * @param pageNum
	 * @param pageSize
	 * @param name
	 * @param value
	 * @param parentid
	 * @param type`
	 * @param ispage
	 * @param uri
	 * @param description
	 * @return
	 */
	@RequestMapping(value = "/htstaffoperation")
	@ResponseBody
	public Map<String, Page<Staffoperation>> gethtstaffoperation(HttpSession session,Integer pageNum,Integer pageSize,String rolevalue,String name,
			Integer value,Integer parentid,Integer type,Integer ispage,String uri,String description){
		Map<String, Object> params = new HashMap<String,Object>();
		
		params.put("name", name);
		params.put("value", value);
		params.put("parentid", parentid);
		params.put("type", type);
		params.put("ispage", ispage);
		params.put("uri", uri);
		params.put("description", description);
		params.put("rolevalue", rolevalue);
		
		return CommonUtil.returnResultCodeJson("result", privilegeService.htstaffoperation(pageNum,pageSize,params));
	}
	
	/**
	 * 添加权限设置数据
	 * @param session
	 * @param values
	 * @return
	 */
	@RequestMapping(value = "/savehtoperationset")
	@ResponseBody
	public String savehtoperationset(HttpSession session,String values,String rolevalue){
		if(values==null||rolevalue==null){
			return CommonUtil.returnMapResultToJson("fail","权限设置保存失败!");
		}
		privilegeService.htdeleteByrolevalue(Integer.valueOf(rolevalue));
		String[] opts = values.split(",");
		//待添加的角色权限设置
		List<Staffroleoperation> addRoleOptlist = new ArrayList<>();
		//权限列表
		List<Staffoperation> operationlist = new ArrayList<>();
		
		for(String opt:opts){
			if(opt!=null && !opt.equals("")){
				Staffoperation operation = privilegeService.gethtOperationById(Integer.valueOf(opt));
				operationlist.add(operation);
			}
		}
		/*Integer parentid = 0;
		for(int i=0;i<operationlist.size();i++){
			if(operationlist.get(i).getParentid().compareTo(parentid)==0){
				continue;
			}
			parentid = operationlist.get(i).getParentid();
			
			Staffroleoperation roleoperation = new Staffroleoperation();
			Integer optvalue = operationlist.get(i).getValue();
			int j=0;
			for(j=i+1;j<operationlist.size();j++){
				if(operationlist.get(j).getParentid().compareTo(parentid)==0){
					optvalue += operationlist.get(j).getValue();
					//operationlist.remove(j);
				}
			}
			
			roleoperation.setModuleid(parentid);
			roleoperation.setOptvalue(optvalue);
			roleoperation.setRolevalue(Integer.valueOf(rolevalue));
			roleoperation.setLastupdatetime(new Date());
			addRoleOptlist.add(roleoperation);
		}*/
		
		for(int i=0;i<operationlist.size();i++){
			Staffroleoperation roleoperation = new Staffroleoperation();
			
			roleoperation.setModuleid(operationlist.get(i).getId());
			roleoperation.setOptvalue(operationlist.get(i).getParentid());
			roleoperation.setRolevalue(Integer.valueOf(rolevalue));
			roleoperation.setLastupdatetime(new Date());
			addRoleOptlist.add(roleoperation);
		}
		
		String ret = "";
		/*for(Staffroleoperation bean:addRoleOptlist){
			Map<String, Object> params = new HashMap<>();
			params.put("rolevalue", bean.getRolevalue());
			params.put("moduleid", bean.getModuleid());
			Page<Staffroleoperation> page = privilegeService.htstaffroleoperation(1, 200, params);
			
			if(page.getResult()!=null && page.getResult().size()==1){
				Staffroleoperation update = page.getResult().get(0); 
				update.setOptvalue(bean.getOptvalue());
				update.setLastupdatetime(new Date());
				privilegeService.htupdate(update);
				
			}else{
				ret = privilegeService.htadd(bean);
			}
		}*/
		if(addRoleOptlist != null && addRoleOptlist.size() > 0){
			ret = privilegeService.htbatchAdd(addRoleOptlist);
		}
		return ret;
	}
	
}