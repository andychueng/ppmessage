angular.module("this_app")
    .controller("AppCtrl", function($window, $scope, $rootScope, $location, $state, $timeout, $mdToast, yvAjax) {

        $scope.thisYear = (new Date()).getUTCFullYear();
        
        $scope.ppmessage = function() {
            window.open("https://ppmessage.com");
        };
        
        $scope.toast_string = function(str) {
            $timeout( function() {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent(_str)
                        .position("top right")
                        .hideDelay(3000)
                );
            });
        };
        
    }); // end app ctrl
