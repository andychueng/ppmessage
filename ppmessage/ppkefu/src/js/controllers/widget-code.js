ppmessageModule.controller("WidgetCodeCtrl", [
    "$scope",
    "yvUser",
function ($scope, yvUser) {

    $scope.data = {
        widget_code : _generate_enterprise_code()
    };
    
    function _generate_enterprise_code() {
        var _code = "<script> window.ppSettings = {app_uuid:'{{app_uuid}}'};" +
            "(function(){" +
            "var w=window,d=document;" +
            "function l(){" +
            "var a=d.createElement('script');" +
            "a.type='text/javascript';" +
            "a.async=!0;" +
            "a.src='{{server_url}}/ppcom/assets/pp-library.min.js';" +
            "var b=d.getElementsByTagName('script')[0];" +
            "b.parentNode.insertBefore(a,b)" +
            "}" +
            "l();" +
            "})();" +
            "</script>";
        
        return _code.replace("{{app_uuid}}", yvUser.get("app").uuid)
            .replace("{{server_url}}", window.ppmessage.server_url);
    }
    
}]);
