package com.tl.khadmin.service.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.tl.khadmin.bean.News;
import com.tl.khadmin.mapper.NewsMapper;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.NewsIService;
import com.tl.khadmin.util.CommonUtil;

@Service
public class NewsServiceImpl implements NewsIService{

	@Resource
	private NewsMapper newsMapper;
	
	@Override
	public Page<News> showNewsByPage(int pageNum, int pageSize, Map<String, Object> params) {

		Page<News> page=new Page<News>(pageNum, pageSize);
        params.put("page", page);   
        List<News> list= newsMapper.showNewsByPage(params);  
		page.setResult(list);
		return page;
	}

	@Override
	public int saveNews(News news) {
		
		int result = newsMapper.insert(news);
		return result;
	}

	@Override
	public String updateNews(News news) {
		
		int result = newsMapper.updateNews(news);
		if(result==1){
			return "修改成功";
		}else{
			return "修改失败";
		}
		
	}

	@Override
	public News queryById(Integer id) {
		
		return newsMapper.selectById(id);
	}

	@Override
	public String deleteById(Integer id) {
		if(id==null)
			return CommonUtil.result(0);
		int result = newsMapper.deleteNewsById(id);
		return CommonUtil.returnMapResultByRows(result, "删除成功","删除失败，请重试");
	}
	
	@Override
	public String deleteByIds(String _ids) {
		if(_ids==null)
			return CommonUtil.result(0);

		String[] ids = _ids.substring(0,_ids.length()-1).split(",");
		int result = newsMapper.deleteNewsByids(ids);
		if(result==ids.length){
			result=1;
		}
		return CommonUtil.returnMapResultByRows(result, "删除成功","删除失败，请重试");
	}
	
/*	@Override
	public String deleteByIds(String ids) {
		if(ids==null)
			return CommonUtil.result(0);
		
		String[] arr = ids.substring(0,ids.length()-1).split(":");
		int result = 0;
		for(int i = 0;i<arr.length;i++){
			result = newsMapper.deleteNewsById(Integer.valueOf(arr[i]));
		}
		
		return CommonUtil.returnMapResultByRows(result, "删除成功","删除失败，请重试");
	}*/
}
