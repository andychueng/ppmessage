ppmessageModule.controller("MainWithLogoCtrl", [
    "$scope",
    "yvSys",
    "yvNav",
    "yvMain",
    "yvUser",
    "yvLogin",
    "yvUpdater",
    "yvConstants",
function ($scope, yvSys, yvNav, yvMain, yvUser, yvLogin, yvUpdater, yvConstants) {

    function nav_login(user) {
        yvNav.clear(function () {
            if (!user) {
                return yvNav.login_no_user();
            }
            if (user.is_online && yvSys.has_db()) {
                return yvLogin.login_with_session(user);
            }
            yvNav.login_with_user(user);
        });
    }

    function init() {
        console.log("0000000000000000");
        yvMain.init_yvdb(function (user) {
            console.log("0000000000000000111111");
            yvUpdater.check_update();
            console.log("00000000000000003333333");
            nav_login(user);
            console.log("0000000000000000222222");
        });
    }

    init();
}]);
