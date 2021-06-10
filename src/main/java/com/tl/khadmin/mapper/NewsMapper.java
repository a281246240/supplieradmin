package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.News;

public interface NewsMapper {
    int insert(News record);

    int insertSelective(News record);
    
    List<News> showNewsByPage(Map<String, Object> params);
    
    News selectById(Integer id);
    
    int updateNews(News news);
    
    int deleteNewsById(Integer id);
    
    int deleteNewsByids(@Param("ids") String[] ids);
}