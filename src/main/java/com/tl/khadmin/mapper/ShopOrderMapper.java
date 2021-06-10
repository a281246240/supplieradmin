package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.ShopOrder;

public interface ShopOrderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ShopOrder record);

    int insertSelective(ShopOrder record);

    ShopOrder selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ShopOrder record);

    int updateByPrimaryKey(ShopOrder record);
    
    List<ShopOrder> selectOrderByPage(Map<String,Object> params);
    
    List<ShopOrder> selectById(Integer id);
}