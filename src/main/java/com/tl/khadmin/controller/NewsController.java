package com.tl.khadmin.controller;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tl.khadmin.bean.News;
import com.tl.khadmin.bean.Staff;
import com.tl.khadmin.page.Page;
import com.tl.khadmin.service.NewsIService;
import com.tl.khadmin.util.CommonUtil;
import com.tl.khadmin.util.Constant;

@Controller
@RequestMapping(value = "/news")
public class NewsController {
	
	
	private static Logger log=Logger.getLogger(NewsController.class);
	@Resource
	private NewsIService newsService;

	@RequestMapping(value = "/shownewsbypage")
	public @ResponseBody Map<String, Page<News>> showNewsByPage(HttpSession session, int pageNum, int pageSize,
			String title,String creatorname,Integer type,String startTime, String endTime) {
		
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("startTime", startTime);
		params.put("endTime", endTime);
		
		params.put("title", title);
		params.put("creatorname", creatorname);
		params.put("type", type);
		
		return CommonUtil.returnResultCodeJson("result", newsService.showNewsByPage(pageNum, pageSize, params));
	}
	
	@RequestMapping(value = "/addnews")
	@ResponseBody
	public void addNews(HttpSession session,HttpServletRequest request,HttpServletResponse response,
			@Valid News news,BindingResult br) {
		
		Staff staff = (Staff) session.getAttribute(Constant.USER);
		log.info("addNews staff："+staff.getId()+"，"+staff.getNickname());
		String root = session.getServletContext().getRealPath("/news/titleImg");
        DiskFileItemFactory factory = new DiskFileItemFactory();    
        ServletFileUpload upload = new ServletFileUpload(factory);  
        try {  
            List items = upload.parseRequest(request);  
            Iterator it = items.iterator();  
            News newstemp = new News();
            while (it.hasNext()) {  
                FileItem item = (FileItem) it.next();  
                if (item.isFormField()) { // 如果是表单域  
                    if (item.getFieldName().equals("title")) {  
                        String title = item.getString("UTF-8");  
                        newstemp.setTitle(title);
                    }  
                    if (item.getFieldName().equals("summary")) {  
                        String summary = item.getString("UTF-8");  
                        newstemp.setSummary(summary);
                    }
                    if (item.getFieldName().equals("type")) {  
                        String type = item.getString("UTF-8");  
                        newstemp.setType(Integer.parseInt(type));
                    }  
                    if (item.getFieldName().equals("state")) {  
                        String state = item.getString("UTF-8");  
                        newstemp.setState(Integer.parseInt(state));  
                    }  
                    if (item.getFieldName().equals("source")) {  
                        String source = item.getString("UTF-8");  
                        newstemp.setSource(source);
                    }  
                    if (item.getFieldName().equals("content")) {  
                        String content = item.getString("UTF-8");  
                        newstemp.setContent(content);
                    }  
                } else { // 如果是文件  
                    if (item.getName() != null && !item.getName().equals("")) {  
                    	File file = new File(root);
                    	if(!file.exists()) {
                    		file.mkdirs();          
                    	}
 
                        file = new File(root,item.getName());  
                        newstemp.setTitleimg("/news/titleImg/"+item.getName());  
                        item.write(file);  
                    }  
                }  
            }  
            newstemp.setCreatetime(new Timestamp(System.currentTimeMillis()));
            newstemp.setCreatorid(staff.getId());
            newstemp.setCreatorname(staff.getNickname());
    		int result = newsService.saveNews(newstemp);
    		log.info("saveNews result rows：" + result);
    		if(result == 1) {
    			response.setContentType("text/html; charset=UTF-8"); //转码
        	    PrintWriter out = response.getWriter();
        	    out.flush();
        	    out.println("<script>");
        	    out.println("alert('添加成功');");
        	    out.println("history.back();");
        	    out.println("</script>");
    		} else {
    			log.info("saveNews result：" + "添加失败");
    			response.setContentType("text/html; charset=UTF-8"); //转码
        	    PrintWriter out = response.getWriter();
        	    out.flush();
        	    out.println("<script>");
        	    out.println("alert('添加失败');");
        	    out.println("history.back();");
        	    out.println("</script>");
    		}
        } catch (Exception e) {  
        	log.info("saveNews result exception：" + e.toString());
        	e.printStackTrace();  
        	response.setContentType("text/html; charset=UTF-8"); //转码
     	    PrintWriter out;
			try {
				response.setContentType("text/html; charset=UTF-8"); //转码
        	    out = response.getWriter();
        	    out.flush();
        	    out.println("<script>");
        	    out.println("alert('添加失败');");
        	    out.println("history.back();");
        	    out.println("</script>");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
        }
	}
	
	@RequestMapping(value = "/querybyid")
	@ResponseBody
	public News queryById(HttpSession session,Integer id) {
		
		return newsService.queryById(id);
	}
	
	@RequestMapping(value = "/updateNews")
	@ResponseBody
	public void updateNews(HttpSession session,HttpServletRequest request,HttpServletResponse response,@Valid News news,BindingResult br) { 
		
		Staff staff = (Staff) session.getAttribute(Constant.USER);
		
		String root = session.getServletContext().getRealPath("/news/titleImg");
        DiskFileItemFactory factory = new DiskFileItemFactory();    
        ServletFileUpload upload = new ServletFileUpload(factory);  
        try {  
            List items = upload.parseRequest(request);  
            Iterator it = items.iterator();  
            News lastNews = new News();
            while (it.hasNext()) {  
                FileItem item = (FileItem) it.next();  
                if (item.isFormField()) { // 如果是表单域  
                	if (item.getFieldName().equals("id")) {  
                        String id = item.getString("UTF-8");  
                        lastNews.setId(Integer.parseInt(id));
                    } 
                    if (item.getFieldName().equals("title")) {  
                        String title = item.getString("UTF-8");  
                        lastNews.setTitle(title);
                    }
                    if (item.getFieldName().equals("summary")) {  
                        String summary = item.getString("UTF-8");  
                        lastNews.setSummary(summary);
                    }
                    if (item.getFieldName().equals("type")) {  
                        String type = item.getString("UTF-8");  
                        lastNews.setType(Integer.parseInt(type));
                    }  
                    if (item.getFieldName().equals("state")) {  
                        String state = item.getString("UTF-8");  
                        lastNews.setState(Integer.parseInt(state));  
                    }  
                    if (item.getFieldName().equals("source")) {  
                        String source = item.getString("UTF-8");  
                        lastNews.setSource(source);
                    }  
                    if (item.getFieldName().equals("content")) {  
                        String content = item.getString("UTF-8");  
                        lastNews.setContent(content);
                    }  
                } else { // 如果是文件  
                    if (item.getName() != null && !item.getName().equals("")) {  
                    	File file = new File(root);
                    	if(!file.exists()) {
                    		file.mkdirs();          
                    	}
                        file = new File(root,item.getName());  
                        lastNews.setTitleimg("/news/titleImg/"+item.getName());
                        item.write(file);  
                    }  
                }  
            }  
            News newstemp = newsService.queryById(lastNews.getId());
            newstemp.setTitle(lastNews.getTitle());
            newstemp.setSummary(lastNews.getSummary());
            newstemp.setType(lastNews.getType());
            newstemp.setState(lastNews.getState());
            newstemp.setSource(lastNews.getSource());
            newstemp.setContent(lastNews.getContent());
            if(lastNews.getTitleimg() != null){
            	newstemp.setTitleimg(lastNews.getTitleimg());
            }
            
            newstemp.setUpdateid(staff.getLoginname());
            newstemp.setUpdatename(staff.getNickname());
            newstemp.setUpdatetime(new Timestamp(System.currentTimeMillis()));
    		String result = newsService.updateNews(newstemp);
    		if(result.equals("修改成功")) {
    			response.setContentType("text/html; charset=UTF-8"); //转码
        	    PrintWriter out = response.getWriter();
        	    out.flush();
        	    out.println("<script>");
        	    out.println("alert('修改成功');");
        	    out.println("history.back();");
        	    out.println("</script>");
    		} else {
    			response.setContentType("text/html; charset=UTF-8"); //转码
        	    PrintWriter out = response.getWriter();
        	    out.flush();
        	    out.println("<script>");
        	    out.println("alert('修改失败');");
        	    out.println("history.back();");
        	    out.println("</script>");
    		}
        } catch (Exception e) {  
        	e.printStackTrace();  
        	response.setContentType("text/html; charset=UTF-8"); //转码
     	    PrintWriter out;
			try {
				response.setContentType("text/html; charset=UTF-8"); //转码
        	    out = response.getWriter();
        	    out.flush();
        	    out.println("<script>");
        	    out.println("alert('修改失败');");
        	    out.println("history.back();");
        	    out.println("</script>");
			} catch (IOException e1) {
				e1.printStackTrace();
			}
        }
        
	}
	
	@RequestMapping(value = "/deletebyid")
	@ResponseBody
	public String deleteById(Integer id) {
		
		return newsService.deleteById(id);
	}
	
	@RequestMapping(value = "/deletebyids")
	@ResponseBody
	public String deleteByIds(String ids) {
		
		return newsService.deleteByIds(ids);
	}
}
