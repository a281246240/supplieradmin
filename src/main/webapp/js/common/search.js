/**
 * 
 */
define(['jquery'], function ($) {
	
    var searchBtn = $('#searchBtn'),
        param,
        callback,
        searchUrl;

    searchBtn.on('click', function () { 
        callback();
    });

    return {
        setParam: function (obj) {
            param = obj;
        },
        setCallback: function (fn) {
            callback = fn;
        },
        setUrl: function (url) {
            searchUrl = url;
        }
    }
});