ppmessageModule.directive("yvAddServiceUserModal", [
    "$rootScope",
    "$ionicModal",
    "yvLog",
    "yvAPI",
    "yvLink",
    "yvBase",
function ($rootScope, $ionicModal, yvLog, yvAPI, yvLink, yvBase) {

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
        
    }
    
    return {
        restrict: "E",
        replace: true,
        scope: true,
        link: _link,
        templateUrl: "templates/directives/add-service-user-modal.html"
    };
}]);
