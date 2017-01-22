ppmessageModule.controller("ConversationListCtrl", [
    "$scope",
    "$timeout",
    "$rootScope",
    "$stateParams",
    "yvLog",
    "yvSys",
    "yvAPI",
    "yvBase",
    "yvMain",
    "yvAlert",
    "yvLogin",
    "yvDelegate",
    "yvConstants",
function ($scope, $timeout, $rootScope, $stateParams, yvLog, yvSys, yvAPI, yvBase, yvMain, yvAlert, yvLogin, yvDelegate, yvConstants) {

    var content_delegate = yvDelegate.get_scroll_delegate("conversation-list-scroll");

    $scope.eableInfiniteScroll = true;
    $scope.canShowNoConversation = true;

    $scope.conversations = yvBase.get_scope("conversation");
    
    $scope.$on("$ionicView.beforeEnter", function (event, currentView) {
        yvLogin.check_session();
        if (yvSys.in_pc() && $stateParams.conv_uuid) {
            $timeout(function () {
                $rootScope.$broadcast("event:open-conversation", $stateParams);
            });
        }
    });
    
    $scope.showConversation = function (conversation) {
        if (!conversation.show) return false;
        return true;
    };

    $scope.loadMoreConversation = function () {
        var page = $scope.conversations.page + 1;
        var args = { "page_offset": page, "page_size": yvSys.page_size() };

        yvAPI.get_conversation_page(args, function (res) {
            if (res.list.length < yvSys.page_size()) {
                $scope.eableInfiniteScroll = false;
            }
            yvMain.add_conversation_from_api_reserve(res.list);
            $scope.$broadcast("scroll.infiniteScrollComplete");
            $scope.conversations.page = page;
        }, _load_error, _load_error);

        function _load_error() {
            $scope.eableInfiniteScroll = false;
            $scope.$broadcast("scroll.infiniteScrollComplete");
            yvAlert.tip("app.GLOBAL.CANT_GET_MORE_CONVERSATIONS");
            $timeout(function () {
                $scope.eableInfiniteScroll = true;
            }, 5000);
        }
    };
    
    $scope.refreshConversations = function () {
        $scope.canShowNoConversation = false;
        var promise = yvMain.update_conversations_from_server();

        promise.then(function () {
            yvDelegate.scroll_resize("conversation-list-scroll");
            if (yvSys.in_pc()) {
                $rootScope.$broadcast("event:open-conversation", null);
            }
        }, function () {
            yvAlert.tip("app.GLOBAL.CANT_REFRESH_CONVERSATIONS");
        });
        
        promise.finally(function () {
            $scope.eableInfiniteScroll = true;
            $scope.canShowNoConversation = true;
            $scope.$broadcast("scroll.refreshComplete");
        });
    };

    $scope.onScroll = function () {
    };
        
}]);
