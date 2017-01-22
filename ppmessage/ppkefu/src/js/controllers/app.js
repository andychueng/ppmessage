ppmessageModule.controller("AppCtrl", [
    "$scope",
    "yvDB",
    "yvLog",
    "yvSys",
    "yvNav",
    "yvBase",
    "yvLogin",
function ($scope, yvDB, yvLog, yvSys, yvNav, yvBase, yvLogin) {

    yvNav.clear();

    $scope.$on("event:reload", function (e, m) {
        yvNav.clear();
    });


    $scope.$on("$ionicView.unloaded", function () {
        console.log("appctrl onloaded....");
    });

    
    $scope.isInMobile = function () {
        if (yvSys.in_mobile()) {
            return true;
        }
        return false;
    };


    $scope.showNavButton = function () {
        if (window.innerWidth >= 768) {
            return false;
        }
        return true;
    };


    $scope.getUnread = function () {
        var sum = 0;
        var list = yvBase.get_list("conversation");
        angular.forEach(list, function (conversation) {
            sum += conversation.unread;
        });
        return sum > 99 ? "99+" : sum;
    };


    $scope.openSearchModal = function () {
        $scope.$broadcast("event:show-search-modal");
    };

}]);
