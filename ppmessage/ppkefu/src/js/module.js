var ppmessageModule = angular.module("ppmessage", [
    "ionic",
    "base64",
    "blockUI",
    "ngCookies",
    "ngSanitize",
    "angularFileUpload",
    "pascalprecht.translate",
]);

ppmessageModule.config([
    "$sceProvider",
    "blockUIConfig",
    "$ionicConfigProvider",
function ($sceProvider, blockUIConfig, $ionicConfigProvider) {
    $sceProvider.enabled(false);

    blockUIConfig.autoBlock = false;
    blockUIConfig.autoInjectBodyBlock = true;

    $ionicConfigProvider.views.maxCache(10);
    $ionicConfigProvider.views.swipeBackEnabled(false);

    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.tabs.style("standard");

    $ionicConfigProvider.backButton.text("");
    
}]).run([
    "$state",
    "$timeout",
    "$rootScope",
    "$ionicPlatform",
    "yvSys",
    "yvMenu",
    "yvLocal",
    "yvMonitor",
function ($state, $timeout, $rootScope, $ionicPlatform, yvSys, yvMenu, yvLocal, yvMonitor) {

    yvLocal.localize();
    yvMenu.init();
    
    if (ppmessage.developer_mode) {
        ppmessage.monitor = yvMonitor;
    }

    $rootScope.getAppBodyStyle = function () {
        return yvSys.get_app_body_style();
    };

    $rootScope.getDeviceClass = function () {
        if (yvSys.in_mobile_browser()) {
            return "in-mobile-browser";
        }
        if (yvSys.in_pc_browser()) {
            return "in-pc-browser";
        }
        if (yvSys.in_electron()) {
            return "in-electron";
        }
        if (yvSys.in_mobile_app()) {
            return "in-mobile-app";
        }
    };

    $ionicPlatform.ready(function () {
    });

}]).constant("$ionicLoadingConfig", {
    // delay: 100,
    // duration: 5000,
    noBackdrop: true,
    hideOnStateChange: true,
    template: "<ion-spinner></ion-spinner>"
});
