package com.tl.khadmin.enums;

public enum StaffRoleEnum implements BaseEnum {

	// 0：超级管理员；1.管理员；2：财务，3：营销，4：客服

	超级管理员(0,"超级管理员"),
	管理员(1,"普通会员"),
	财务(2,"财务"),
	营销(3,"营销"),
	客服(4,"客服");

	private final int code;
	private final String desc;

	StaffRoleEnum(int code, String desc) {
	        this.code = code;
	        this.desc = desc;
		}

	public static StaffRoleEnum codeOf(int code) {
        for (StaffRoleEnum e : StaffRoleEnum.values()) {
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
