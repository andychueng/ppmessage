Service.$app = (function() {

    var appInfo = {};
    
    return {

        setAppName: function(name) {
            appInfo.app_name = name;
        },
        
        setAppWelcome: function(welcome) {
            appInfo.app_welcome_message = welcome;
        },
        
        set: function(info) {
            appInfo = $.extend({}, appInfo, info);
        },

        app: function() {
            return appInfo;
        }, 

        appName: function() {
            return appInfo.app_name; 
        },

        appId: function() {
            return appInfo.app_uuid || appInfo.uuid;
        }
    }
    
})();
