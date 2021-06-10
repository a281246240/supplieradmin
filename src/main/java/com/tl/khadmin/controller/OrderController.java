package com.tl.khadmin.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.Order;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.OrderIService;
import com.tl.khadmin.util.CommonUtil;


@RequestMapping(value = "/adminorder")
@Controller
public class OrderController {
	
	@Resource
	private OrderIService orderService;
	
	@RequestMapping(value = "/showorderbypage")
	@ResponseBody
	public Map<String, Page<Order>> showOrderByPage(HttpSession session, int pageNum, int pageSize, String startTime,
			String endTime, String orderid, String sender, String receiver,String username,Integer state) {
		
		Map<String, Object> params = new HashMap<String, Object>(); 
		params.put("startTime", startTime);
		params.put("endTime", endTime);
		params.put("orderid", orderid);
		params.put("sender", sender);
		params.put("receiver", receiver);
		params.put("username", username);
		params.put("state", state);
		return CommonUtil.returnResultCodeJson("result", orderService.showOrderByPage(pageNum, pageSize, params));
	} 
	
	@RequestMapping(value = "/showorderinfo")
	@ResponseBody
	public Order showOrderInfo(HttpSession session, Integer id) {
		if(id == null){
			return null;
		}
		return orderService.showOrderInfo(id);
	} 
	
}
