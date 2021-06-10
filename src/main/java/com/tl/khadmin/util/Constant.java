
package com.tl.khadmin.util;

/**
 * 存放一些全局静态常量
 * @author bin
 *
 */
public class Constant {
	
	/**
	 * 登录用户在SESSION里的储存KEY
	 */
	public static final String USER = "_adminuser";
	/**
	 * 登录用户在SESSION里的储存语言版本
	 */
	public static final String LANGUAGE = "_language"; 
	/**
	 * 返回结果code值：成功
	 */
	public static final Integer MESSAGE_SUCCESS=0;
	
	/**
	 * 返回结果code值：失败
	 */
	public static final Integer MESSAGE_FAILED=10001;
	
	///操作类型
	/**
	 * 分组
	 */
	public static final Integer OPT_TEAM = 1;
	/**
	 * 模块
	 */
	public static final Integer OPT_MODULE = 2;
	/**
	 * 操作
	 */
	public static final Integer OPT_OPERATION = 4;
	
	//后台用户角色
	/**
	 * 超级管理员
	 */
	public static final Integer ROLE_SUPER_ADMIN = 0;
	/**
	 * 管理员
	 */
	public static final Integer ROLE_ADMIN = 1;
	/**
	 * 财务
	 */
	public static final Integer ROLE_FINANCE = 2;
	/**
	 * 营销
	 */
	public static final Integer ROLE_MARKETIN = 3;
	/**
	 * 客服
	 */
	public static final Integer ROLE_SERVICE = 4;
	
	
}
