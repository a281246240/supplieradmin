package com.tl.khadmin.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.Sysparam;
import com.tl.khadmin.mapper.SysparamMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.SysparamService;
import com.tl.khadmin.util.CommonUtil;

@Service
public class SysparamServiceImpl implements SysparamService{

	@Resource
	private SysparamMapper sysparamMapper;

	@Override
	public Page<Sysparam> getList(int pageNo, int pageSize, Map<String, Object> params) {
		Page<Sysparam> page = new Page<Sysparam>(pageNo,pageSize);
		params.put("page", page);
		List<Sysparam> list = sysparamMapper.getListByPage(params);
		page.setResult(list);
		return page;
	}
	
	@Override
	public Sysparam querybyid(Integer id) {
		if (null==id) {
			return null;
		}
		return sysparamMapper.selectByPrimaryKey(id);
	}
	
	@Override
	public String add(Sysparam sysparam) {
		Integer ret = sysparamMapper.insert(sysparam);
		return CommonUtil.returnMapResultByRows(ret, "系统参数添加成功!", "系统参数添加失败!");
	}
	
	@Override
	public String update(Sysparam sysparam) {
		Integer ret = sysparamMapper.updateByPrimaryKey(sysparam);
		return CommonUtil.returnMapResultByRows(ret, "系统参数更新成功!", "系统参数更新失败!");
	}
	
	@Override
	public String delete(String[] del_ids) {
		Integer ret = sysparamMapper.delete_more(del_ids);
		Integer result = del_ids.length==ret?1:0;
		return CommonUtil.returnMapResultByRows(result, "删除系统参数成功!", "删除系统参数失败!");
	}
}