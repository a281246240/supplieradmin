package com.tl.khadmin.page;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Properties;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;
import org.apache.ibatis.reflection.factory.ObjectFactory;
import org.apache.ibatis.reflection.wrapper.DefaultObjectWrapperFactory;
import org.apache.ibatis.reflection.wrapper.ObjectWrapperFactory; 
import org.slf4j.Logger;
import org.slf4j.LoggerFactory; 

@Intercepts({ @Signature(type = StatementHandler.class, method = "prepare", args = { Connection.class }) })
public class PaginationStatementHandlerInterceptor implements Interceptor {

    private final static Logger logger = LoggerFactory.getLogger(PaginationStatementHandlerInterceptor.class);

    private static final ObjectFactory DEFAULT_OBJECT_FACTORY = new DefaultObjectFactory();
    private static final ObjectWrapperFactory DEFAULT_OBJECT_WRAPPER_FACTORY = new DefaultObjectWrapperFactory();

    
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
//        ParameterHandler parameterHandler = statementHandler.getParameterHandler();
//        BoundSql boundSql = statementHandler.getBoundSql();

        MetaObject metaStatementHandler = MetaObject.forObject(statementHandler, DEFAULT_OBJECT_FACTORY, DEFAULT_OBJECT_WRAPPER_FACTORY);
        MappedStatement mappedStatement = (MappedStatement) metaStatementHandler.getValue("delegate.mappedStatement");  
        String id = mappedStatement.getId();  
        if(id.matches(".+ByPage$")){  
              
            BoundSql boundSql = statementHandler.getBoundSql();  
            Map<String,Object> params = (Map<String,Object>)boundSql.getParameterObject();  
            Page<?> page = (Page<?>)params.get("page");  
            String sql = boundSql.getSql();  
            String countSql = "select count(0) from ("+sql+")t";  
            Connection connection = (Connection) invocation.getArgs()[0];  
            PreparedStatement countStatement = connection.prepareStatement(countSql);  
            ParameterHandler parameterHandler = (ParameterHandler) metaStatementHandler.getValue("delegate.parameterHandler");  
            parameterHandler.setParameters(countStatement);  
            ResultSet rs = countStatement.executeQuery();  
            if(rs.next()){  
                page.setTotalCount(rs.getInt(1));  
            }  
            String pageSql = sql+" limit "+(page.getPageNo()-1)*page.getPageSize()+","+page.getPageSize();  
            metaStatementHandler.setValue("delegate.boundSql.sql", pageSql);  
        }   
        return invocation.proceed();
    }

    
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    
    public void setProperties(Properties properties) {
    }

     
}
