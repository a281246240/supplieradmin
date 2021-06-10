package com.tl.khadmin.service;

import java.util.Map;

import com.tl.khadmin.bean.News;
import com.tl.khadmin.page.Page;


public interface NewsIService {

	Page<News> showNewsByPage(int pageNum, int pageSize, Map<String, Object> params);
	
	int saveNews(News news);
	
	String updateNews(News news);
	
	News queryById(Integer id);
	
	String deleteById(Integer id);

	String deleteByIds(String ids);
}
