package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.ShopProduct;

public interface ShopProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ShopProduct record);

    int insertSelective(ShopProduct record);

    ShopProduct selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ShopProduct record);

    int updateByPrimaryKey(ShopProduct record);
    
    List<ShopProduct> showProductByPage(Map<String ,Object> params);
    
    int deleteProductByids(@Param("ids") String[] ids);
}