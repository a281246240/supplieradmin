package com.tl.khadmin.enums;

public enum InvoiceErrorEnum implements BaseEnum {
	//发票申请过程中，返回的各种错误编码信息
	成功(000000,"成功"),
	用户AS密码错误(10001,"用户AS密码错误"),
	pkey错误(10002,"pkey错误"),
	操作超时(10003,"操作超时"),
	生成发票文件失败(10004,"生成发票文件失败"),
	未查询到发票(10005,"未查询到发票"),
	发票已红冲作废_勿重复操作(10006,"发票已红冲作废，勿重复操作"),
	未在_中税_登记注册(10007,"未在【中税】登记注册"),
	该企业发票已经开完(10008,"该企业发票已经开完"),
	此张发票还未开出(10009,"此张发票还未开出"),
	开票异常重开此发票(10010,"开票异常重开此发票"),
	该企业不具备开票资格(10011,"该企业不具备开票资格"),
	错误的appSecret(10012,"错误的appSecret"),
	验证码pkey错误(10013,"验证码pkey错误"),
	未找到pdf文件(10014,"未找到pdf文件"),
	邮箱发送失败(10015,"邮箱发送失败"),
	未找到此商品编码(10016,"未找到此商品编码"),
	企业信息异常(10017,"企业信息异常"),
	添加订单失败(10018,"添加订单失败"),
	不存在该开票记录(10019,"不存在该开票记录"),
	新增商品编码失败_企业编码名称不能重复(10029,"新增商品编码失败,企业编码名称不能重复"),
	新增商品编码失败_商品编码已存在(10030,"新增商品编码失败,商品编码已存在"),
	新增商品编码失败_商品编码名称不能重复(10031,"新增商品编码失败,商品编码名称不能重复"),
	修改商品编码失败(10032,"修改商品编码失败"),
	没找到该抬头信息(10033,"没找到该抬头信息"),
	没有找到可用的票卷儿信息_请核对录入系统(10034,"没有找到可用的票卷儿信息，请核对录入系统！"),
	缺少nsrsbh参数(12000,"缺少nsrsbh参数"),
	缺少appid参数(12001,"缺少appid参数"),
	缺少appSecret参数(12002,"缺少appSecret参数"),
	缺少pkey参数(12003,"缺少pkey参数"),
	缺少ztime参数(12004,"缺少ztime参数"),
	缺少xfnsrsbh参数(12005,"缺少xfnsrsbh参数"),
	缺少xfmc参数(12006,"缺少xfmc参数"),
	缺少gfnsrsbh参数(12007,"缺少gfnsrsbh参数"),
	缺少gfmc参数(12008,"缺少gfmc参数"),
	缺少gfyhzh参数(12009,"缺少gfyhzh参数"),
	缺少gfdzdh参数(12010,"缺少gfdzdh参数"),
	缺少jehj参数(12011,"缺少jehj参数"),
	缺少spsl参数(12012,"缺少spsl参数"),
	缺少spobj参数(12013,"缺少spobj参数"),
	缺少phone参数(12014,"缺少phone参数"),
	缺少stime参数(12016,"缺少stime参数"),
	缺少etime参数(12017,"缺少etime参数"),
	缺少fpdm参数(12018,"缺少fpdm参数"),
	缺少fphm参数(12019,"缺少fphm参数"),
	缺少orderid(12020,"缺少orderid"),
	缺少nsrmc参数(12024,"缺少nsrmc参数"),
	缺少pageNumber参数(12032,"缺少pageNumber参数"),
	缺少pageSize参数(12033,"缺少pageSize参数"),
	缺少id参数(12034,"缺少id参数"),
	缺少emailAccount参数(12035,"缺少emailAccount参数"),
	缺少参数spId(12036,"缺少参数spId"),
	不合法的spobj参数(20001,"不合法的spobj参数"),
	不合法的applyId参数(20002,"不合法的applyId参数"),
	不合法的prikey参数(20003,"不合法的prikey参数"),
	不合法的t参数(20004,"不合法的t参数"),
	不合法的pkey参数(20005,"不合法的pkey参数"),
	不合法的ztime参数(20006,"不合法的ztime参数"),
	不合法的xfnsrsbh参数(20007,"不合法的xfnsrsbh参数"),
	不合法的xfmc参数(20008,"不合法的xfmc参数"),
	不合法的gfnsrsbh参数(20009,"不合法的gfnsrsbh参数"),
	不合法的gfmc参数(20010,"不合法的gfmc参数"),
	不合法的gfyhzh参数(20011,"不合法的gfyhzh参数"),
	不合法的gfdzdh参数(20012,"不合法的gfdzdh参数"),
	不合法的jehj参数(20013,"不合法的jehj参数"),
	不合法的spsl参数(20014,"不合法的spsl参数"),
	不合法的nsrsbh参数(20015,"不合法的nsrsbh参数"),
	不合法的applyid参数(20016,"不合法的applyId参数"),
	不合法的phone参数(20017,"不合法的phone参数"),
	不合法的stime参数(20018,"不合法的stime参数"),
	不合法的etime参数(20019,"不合法的etime参数"),
	不合法的fpdm参数(20020,"不合法的fpdm参数"),
	不合法的fphm参数(20021,"不合法的fphm参数"),
	不合法的orderid(20022,"不合法的orderid"),
	不合法的nsrmc参数(20023,"不合法的nsrmc参数"),
	不合法的nsr_yhmc参数(20024,"不合法的nsr_yhmc参数"),
	不合法的nsr_yhzh参数(20025,"不合法的nsr_yhzh参数"),
	不合法的lxdh参数(20026,"不合法的lxdh参数"),
	不合法的lxdh_参数(20027,"不合法的lxdh_参数"),
	不合法的lxdz参数(20028,"不合法的lxdz参数"),
	不合法的net_code参数(20029,"不合法的net_code参数");
	
	private final int code;
	private final String desc;
	
	InvoiceErrorEnum(int code, String desc){
		this.code = code;
		this.desc = desc;
	}
	
	public int code() {
		return code;
	}
	
	public static InvoiceErrorEnum codeOf(int code) {
        for (InvoiceErrorEnum e : InvoiceErrorEnum.values()) {
            if (e.code == code) {
                return e;
            }
        }
		return null; 
	} 

	public int getCode() {
		return code;
	}

	public String getDesc() {
		return desc;
	}
	

}
