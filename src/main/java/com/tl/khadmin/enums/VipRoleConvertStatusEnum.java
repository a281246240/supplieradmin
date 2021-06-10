package com.tl.khadmin.enums;

public enum VipRoleConvertStatusEnum implements BaseEnum {
	
	//1.待审核2.审核通过3.审核不通过
	待审核(1,"待审核"),
	审核通过(2,"审核通过"),
	审核不通过(3,"审核不通过");

	private final int code;
	private final String desc;

	VipRoleConvertStatusEnum(int code, String desc) {
		this.code = code;
		this.desc = desc;
	}

	public static VipRoleConvertStatusEnum codeOf(int code) {
        for (VipRoleConvertStatusEnum e : VipRoleConvertStatusEnum.values()) {
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
