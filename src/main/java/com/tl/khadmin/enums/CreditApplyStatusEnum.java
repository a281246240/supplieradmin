package com.tl.khadmin.enums;

public enum CreditApplyStatusEnum implements BaseEnum{ 
	
	//状态（1等待审批/2审批不通过/3审批已通过）
	无(0,"无"),
	等待审批(1,"等待审批"),
	审批不通过(2,"审批不通过"),
	审批已通过(3,"审批已通过");
	
	private final int code;
	private final String desc;

	CreditApplyStatusEnum(int code, String desc) {
        this.code = code;
        this.desc = desc;
	}
	
	public static CreditApplyStatusEnum codeOf(int code) {
        for (CreditApplyStatusEnum e : CreditApplyStatusEnum.values()) {
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
