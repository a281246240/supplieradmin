package com.tl.khadmin.bean;

import java.util.List;


public class Staffoperation {
    private Integer id;

    private String name;

    private Integer value;

    private Integer parentid;

    private Integer type;

    private Integer ispage;

    private String uri;

    private String parameter;
    
    private String classname;
    
    private String description;
    
    //子菜单列表
    private List<Staffoperation> subMenuList;
    //子菜单操作列表
    private List<Staffoperation> subOperationList;
    //已设置的权限列表
    private List<Staffoperation> choosedOptList;
    
    private String choosedStr;
    
    /**
     * 默认拦截
     */
    public static final Integer intercept_one=1;
    /**
     * 默认不拦截
     */
    public static final Integer intercept_two=2;
    
    public String getChoosedStr() {
		return choosedStr;
	}

	public void setChoosedStr(String choosedStr) {
		this.choosedStr = choosedStr;
	}

	public List<Staffoperation> getChoosedOptList() {
		return choosedOptList;
	}

	public void setChoosedOptList(List<Staffoperation> choosedOptList) {
		this.choosedOptList = choosedOptList;
	}

	public String getClassname() {
		return classname;
	}

	public void setClassname(String classname) {
		this.classname = classname;
	}

	public List<Staffoperation> getSubOperationList() {
		return subOperationList;
	}

	public void setSubOperationList(List<Staffoperation> subOperationList) {
		this.subOperationList = subOperationList;
	}

    
    public List<Staffoperation> getSubMenuList() {
		return subMenuList;
	}

	public void setSubMenuList(List<Staffoperation> subMenuList) {
		this.subMenuList = subMenuList;
	}

	public String getParameter() {
		return parameter;
	}

	public void setParameter(String parameter) {
		this.parameter = parameter;
	}

	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getIspage() {
        return ispage;
    }

    public void setIspage(Integer ispage) {
        this.ispage = ispage;
    }

    public String getUri() {
        return uri;
    }

    public void setUri(String uri) {
        this.uri = uri == null ? null : uri.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
}