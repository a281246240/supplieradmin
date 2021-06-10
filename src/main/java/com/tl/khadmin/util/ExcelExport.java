package com.tl.khadmin.util;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;

import net.sf.jxls.exception.ParsePropertyException;
import net.sf.jxls.transformer.XLSTransformer;



public class ExcelExport {
	
	
	/***
	 * 根据指定模板导出excel数据表
	 * 
	 * @param templateFilePath 指定excel模板目录 例: "D://省外落地价格.xls"
	 * @param destFilePath 指定导出excel存放目录 例: "E://省外落地价格.xls"
	 * @param dataList 存放数据的list集合
	 * @return
	 * @throws ParsePropertyException
	 * @throws IOException
	 */
	public final static boolean exprotExcel(String templateFilePath,String destFilePath,List<?> dataList) throws InvalidFormatException,ParsePropertyException, IOException{
		//System.out.println(HSSFWorkbook.class.getProtectionDomain().getCodeSource().getLocation());
		
		Map<String, List<?>> beanParams = new HashMap<String, List<?>>();
		beanParams.put("dataList", dataList);
		XLSTransformer former = new XLSTransformer();
		former.transformXLS(templateFilePath, beanParams, destFilePath);
		
		System.out.println("the end !!!");
		return true;
	}

}
