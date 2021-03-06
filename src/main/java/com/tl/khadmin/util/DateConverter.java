package com.tl.khadmin.util;
 
import java.sql.Timestamp;
import java.text.SimpleDateFormat; 

import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.context.request.WebRequest;

public class DateConverter implements WebBindingInitializer {  
  
    public void initBinder(WebDataBinder binder, WebRequest request) {  
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");   
        binder.registerCustomEditor(Timestamp.class, new CustomDateEditor(df,false));  
    }  
    
}
