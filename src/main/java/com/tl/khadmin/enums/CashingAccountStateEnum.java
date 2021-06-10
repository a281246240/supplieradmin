package com.tl.khadmin.enums;

public enum CashingAccountStateEnum implements BaseEnum {

	待审核(1,"待审核"),
	审核不通过(2,"审核不通过"),
	审核通过(3,"审核通过"),
	资料待完善(4,"资料待完善");

	private final int code;
	private final String desc;

	CashingAccountStateEnum(int code, String desc) {
	        this.code = code;
	        this.desc = desc;
		}

	public static CashingAccountStateEnum codeOf(int code) {
        for (CashingAccountStateEnum e : CashingAccountStateEnum.values()) {
            if (e.code == code) {
                return e;
            }
        }
		return null; 
	} 

	public int code() {
		return code;
	}

	public String getDesc() {
		return desc;
	}

}
