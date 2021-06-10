package com.tl.khadmin.enums; 

public enum OrderStateEnum implements BaseEnum{ 
	
	//客户订单状态：分为：1、已下单；2、已取消；3、已接单；4、已拒收；5、提货中；
	//6、已收货；7、已变更；8；已同意；9、待付款；10、已付款；11、已转单；
	无(0,"无"),
	已下单(1,"已下单"),
	已取消(2,"已取消"),
	已接单(3,"已接单"),
	已拒收(4,"已拒收"),
	提货中(5,"提货中"),
	已收货(6,"已收货"),
	已变更(7,"已变更"),
	已同意(8,"已同意"),
	待付款(9,"待付款"),
	已付款(10,"已付款"),
	已转单(11,"已转单");
	
	private final int code;
	private final String desc;

	OrderStateEnum(int code, String desc) {
	        this.code = code;
	        this.desc = desc;
	}
	
	public static OrderStateEnum codeOf(int code) {
        for (OrderStateEnum e : OrderStateEnum.values()) {
            if (e.code == code) {
                return e;
            }
        }
		return null; 
	}

	public int code() {
		// TODO Auto-generated method stub
		return code;
	}
	
	public String getDesc() {
        return desc;
    }

}
