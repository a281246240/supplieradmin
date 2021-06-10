define(['app'], function(app){
  
   return app.config(['$routeProvider','$httpProvider',function($routeProvider) {
	   		
            $routeProvider
            .when('/home', {
                templateUrl: './template/home.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/hygl', {
                templateUrl: './template/hygl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/htyhgl', {
                templateUrl: './template/htyhgl.jsp'+'?datestamp='+(new Date()).getTime()
            })
             .when('/hyjfhz', {
                templateUrl: './template/hyjfhz.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/hyjfls', {
                templateUrl: './template/hyjfls.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/zxzfjl', {
                templateUrl: './template/zxzfjl.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/xnzhlb', {
                templateUrl: './template/xnzhlb.jsp'+'?datestamp='+(new Date()).getTime() 
        		})
            .when('/xnzhjyjl', {
                templateUrl: './template/xnzhjyjl.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/btedsp', {
                templateUrl: './template/btedsp.jsp'+'?datestamp='+(new Date()).getTime() 
            }) 
             .when('/ddgl', {
                templateUrl: './template/ddgl.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/txzhsh', {
                templateUrl: './template/txzhsh.jsp' +'?datestamp='+(new Date()).getTime()
            })
            .when('/jftxsh', {
                templateUrl: './template/jftxsh.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/gwqxjssz', {
                templateUrl: './template/gwqxjssz.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/gwqxsz', {
                templateUrl: './template/gwqxsz.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/htqxjsgl', {
                templateUrl: './template/htqxjsgl.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/htqxgl', {
                templateUrl: './template/htqxgl.jsp'+'?datestamp='+(new Date()).getTime() 
            })
            .when('/help', {
            	templateUrl: './template/help.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/xwgl', {
            	templateUrl: './template/xwgl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/dxfsjl', {
            	templateUrl: './template/dxfsjl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/htmkgl', {
            	templateUrl: './template/htmkgl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/sysparam', {
            	templateUrl: './template/sysparam.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/zhjszhsp',{
            	templateUrl: './template/zhjszhsp.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/message', {
                templateUrl: './template/message.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/spgl', {
                templateUrl: './template/spgl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/yxjszh', {
                templateUrl: './template/yxjszh.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/scdd', {
                templateUrl: './template/scdd.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/siteinfo', {
                templateUrl: './template/siteinfo.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/ddkpsh', {
                templateUrl: './template/ddkpsh.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/fpgl', {
                templateUrl: './template/fpgl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .when('/fpspxxgl', {
                templateUrl: './template/fpspxxgl.jsp'+'?datestamp='+(new Date()).getTime()
            })
            .otherwise({ redirectTo: '/home' });
   }]);
});