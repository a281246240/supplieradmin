package com.tl.khadmin.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.ShopProductImg;

public interface ShopProductImgMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ShopProductImg record);

    int insertSelective(ShopProductImg record);

    ShopProductImg selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ShopProductImg record);

    int updateByPrimaryKey(ShopProductImg record);
    
    List<ShopProductImg> selectByproductId(@Param("id") Integer id);
    
    int deleteImgByProductId(Integer productid);
    
    int deleteImgByProductIds(@Param("ids") String[] ids);
    
    int deleteImgByIds(@Param("ids") String[] ids);
    
    int selectCountByproductId(Integer productid);
    
    List<ShopProductImg> selectByProductIds(@Param("ids") String[] ids);
    
    int updateImgByProductId(ShopProductImg record);
    
    ShopProductImg selectByKey(Map<String,Object> map);
    
    List<ShopProductImg> selectByIds(@Param("ids") String[] ids);
}