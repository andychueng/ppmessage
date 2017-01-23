ppmessageModule.controller("DeveloperKeysCtrl", [
    "$scope",
    "$ionicHistory",
    "yvAPI",
    "yvUser",
    "yvMain",
function ($scope, $ionicHistory, yvAPI, yvUser, yvMain) {

    $scope.keys = {
        app_uuid: yvUser.get("app").uuid,
        ppcom: {
            api_key: null,
            api_secret: null
        }        
    };

    yvAPI.request("/PP_GET_API_INFO", {user_uuid: yvUser.get("uuid")}, function(response) {
        $scope.keys.ppcom.api_key = response.ppcom.api_key;
        $scope.keys.ppcom.api_secret = response.ppcom.api_secret;
        $scope.$digest();
    });
        
}]);
