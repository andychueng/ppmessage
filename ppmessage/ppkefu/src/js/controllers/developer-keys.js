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
            uuid: null,
            api_key: null,
            api_secret: null
        }
    };
    
}]);
