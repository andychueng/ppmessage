ppmessageModule.directive("yvAddServiceUserModal", [
    "$rootScope",
    "$ionicModal",
    "yvLog",
    "yvAPI",
    "yvLink",
    "yvBase",
    "yvAlert",
function ($rootScope, $ionicModal, yvLog, yvAPI, yvLink, yvBase, yvAlert) {

    function _link($scope, $element, $attrs) {
        var thisModal = null;

        $scope.user = {
            user_email: null,
            user_password: null,
            user_password_repeat: null,
            user_fullname: null
        };

        $ionicModal.fromTemplateUrl("add-service-user-modal.html", {
            scope: $scope,
            animation: "slide-in-up"
        }).then(function (modal) {
            thisModal = modal;
        });

        $scope.$on("event:add-service-user-modal", function() {
            $scope.showModal();
        });

        $scope.$on("$destroy", function () {
            thisModal && thisModal.remove();
        });

        // tell chat-tool to pause keyboard listener
        $scope.$on("modal.shown", function () {
            $rootScope.$broadcast("event:pause-listen-keyboard");
        });
        
        $scope.$on("modal.hidden", function () {
            $rootScope.$broadcast("event:resume-listen-keyboard");
        });
        
        $scope.showModal = function () {
            thisModal && thisModal.show();
        };

        $scope.closeModal = function () {
            thisModal && thisModal.hide();
        };

        
        $scope.disableCreate = function () {
        };
    
        var _create = function() {
            var _d = yvAPI.request("/PP_CREATE_USER", {
                is_service_user: true,
                user_fullname: $scope.user.user_fullname,
                user_email: $scope.user.user_email,
                user_password: hex_sha1($scope.user.user_password)
            }, function(response) {
                yvAlert.success();
                $scope.closeModal();
                $rootScope.$broadcast("event:add-service-user");
            }, function() {
                yvAlert.fail();
            }, function() {
                yvAlert.fail();
            });
        };

        $scope.save = function() {
            if (!$scope.user.user_fullname  ||
                !$scope.user.user_email     ||
                !$scope.user.user_password  ||
                !$scope.user.user_password_repeat) {
                yvAlert.tip("app.GLOBAL.REQUIRED_NOT_PROVIDED");
                return;
            }

            if ($scope.user.user_password != $scope.user.user_password_repeat) {
                yvAlert.tip("app.GLOBAL.PASSWORD_REPEAT_NOT_MATCH");
                return;
            }

            if ($scope.user.user_password.lenght > 32) {
                yvAlert.tip("app.GLOBAL.PASSWORD_TOO_LONG");
                return;
            }

            _create();
        };

    }
    
    return {
        restrict: "E",
        replace: true,
        scope: true,
        link: _link,
        templateUrl: "templates/directives/add-service-user-modal.html"
    };
}]);
