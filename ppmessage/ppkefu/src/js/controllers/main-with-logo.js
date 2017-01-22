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

        yvMain.init_yvdb(function (user) {
            nav_login(user);
        });
    }

    init();
}]);
