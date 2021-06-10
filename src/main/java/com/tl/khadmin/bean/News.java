package com.tl.khadmin.bean;

import java.sql.Timestamp;
import java.util.Date;

import org.codehaus.jackson.map.annotate.JsonSerialize;
import org.springframework.format.annotation.DateTimeFormat;

import com.tl.khadmin.util.CustomDateSerializer;

public class News {
    private Integer id;

    private String title;
    
    private String summary;

    private Integer creatorid;

	private String creatorname;

    private Integer state;

    private String source;

    private Timestamp createtime;

    private String updateid;
    
    private String titleimg;

	private String updatename;

    private Timestamp updatetime;

    private String content;
    
    private Integer type;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }
    
    public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

    public Integer getCreatorid() {
        return creatorid;
    }

    public void setCreatorid(Integer creatorid) {
        this.creatorid = creatorid;
    }

    public String getCreatorname() {
        return creatorname;
    }

    public void setCreatorname(String creatorname) {
        this.creatorname = creatorname == null ? null : creatorname.trim();
    }

    public Integer getState() {
        return state;
    }

    public void setState(Integer state) {
        this.state = state;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source == null ? null : source.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public String getUpdateid() {
        return updateid;
    }

    public void setUpdateid(String updateid) {
        this.updateid = updateid == null ? null : updateid.trim();
    }

    public String getUpdatename() {
        return updatename;
    }

    public void setUpdatename(String updatename) {
        this.updatename = updatename == null ? null : updatename.trim();
    }

    @JsonSerialize(using = CustomDateSerializer.class)
    public Timestamp getUpdatetime() {
        return updatetime;
    }

    public String getContent() {
        return content;
    }

    public String getTitleimg() {
		return titleimg;
	}

	public void setTitleimg(String titleimg) {
		this.titleimg = titleimg;
	}
	
	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}

	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	public void setUpdatetime(Timestamp updatetime) {
		this.updatetime = updatetime;
	}

	public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }
}