ppmessageModule.controller("WidgetLinkCtrl", [
    "$scope",
    "yvUtil",
    "yvUser",
function ($scope, yvUtil, yvUser) {

        
    $scope.data = {
        widget_link: _generate_enterprise_link()
    };

    
    $scope.lookNow = function() {
        window.open($scope.data.widget_link, "_blank");
    };
    
    function _generate_enterprise_link() {
        // `base64_encode` only accept `255 ascii` characters, so we need `escape` here
        var _appObj = {
            uuid: yvUser.get("app").uuid,
            app_name: encodeURI(yvUser.get("app").app_name || '')
        }; 
        var _param = yvUtil.base64_encode(JSON.stringify(_appObj));

        var _link_template = "{{server_url}}/ppcom/enterprise/{{app_signature}}";
        return _link_template
            .replace("{{server_url}}", window.ppmessage.server_url)
            .replace("{{app_signature}}", _param);
    }

}]);
