package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import com.tl.khadmin.bean.ShopOrderProduct;

public interface ShopOrderProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ShopOrderProduct record);

    int insertSelective(ShopOrderProduct record);

    ShopOrderProduct selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ShopOrderProduct record);

    int updateByPrimaryKey(ShopOrderProduct record);
    
    List<ShopOrderProduct> selectOrderProductByPage(Map<String,Object> params);

    List<ShopOrderProduct> selectOrderProductByOrderId(Integer orderid);
}