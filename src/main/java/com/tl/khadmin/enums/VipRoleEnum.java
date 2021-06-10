package com.tl.khadmin.enums;

public enum VipRoleEnum implements BaseEnum {

	// 会员角色（1：普通会员、2：创业导师会员、3：B2B会员、4：特运会员）
	//会员角色（1：创业导师、2：B2B会员、4：营销人员、8 :普通会员、16：财务、32：员工）
	无(0,"无"),
	创业导师会员(1,"创业导师会员"),
	B2B会员(2,"B2B会员"),
	营销会员(4,"营销会员"),
	普通会员(8,"普通会员"),
	财务(16,"财务"),
	员工(32,"员工");

	private final int code;
	private final String desc;

	VipRoleEnum(int code, String desc) {
	        this.code = code;
	        this.desc = desc;
		}

	public static VipRoleEnum codeOf(int code) {
        for (VipRoleEnum e : VipRoleEnum.values()) {
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
