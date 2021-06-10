package com.tl.khadmin.enums;

public enum VirtualaccountStatusEnum implements BaseEnum {

	// 状态：（0：未开通；1：启用；2.冻结；3.待注销）

	未开通(0,"未开通"),
	启用(1,"启用"),
	冻结(2,"冻结"),
	待注销(3,"待注销");

	private final int code;
	private final String desc;

	VirtualaccountStatusEnum(int code, String desc) {
	        this.code = code;
	        this.desc = desc;
		}

	public static VirtualaccountStatusEnum codeOf(int code) {
        for (VirtualaccountStatusEnum e : VirtualaccountStatusEnum.values()) {
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
