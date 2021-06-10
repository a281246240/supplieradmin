package com.tl.khadmin.mapper;

import org.apache.ibatis.annotations.Param;

import com.tl.khadmin.bean.Khinvoicegoods;

public interface KhinvoicegoodsMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Khinvoicegoods record);

    int insertSelective(Khinvoicegoods record);

    Khinvoicegoods selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Khinvoicegoods record);

    int updateByPrimaryKey(Khinvoicegoods record);

	Integer selectCount();

	Khinvoicegoods selectBygoodsName(@Param("spmc") String spmc);
}