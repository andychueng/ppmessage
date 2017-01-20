/**
 * Prepare info for each page when init
 *
 * - For each page, on `_init` method, you should call `yvLogin.prepare` to prepare `active user` and `active user_team` info
 *
 * ```javascript
 * yvLogin.prepare( function() { // prepare ok ... }, { $scope: $scope, onRefresh: function() { // refresh page ... } } );
 * ```
 * 
 * - Difference between `activeUser` and `yvLoginedUser`. 
 *
 *   for `Non-Admin` user, `yvLoginedUser` is equal to `yvActiveUser`; 
 *
 *   for `Admin` user, `yvLoginedUser` is `Admin User`, and `yvActiveUser` is current active user which associated with current
 *   selected app. if you pass `{ $scope: xxx, onRefresh: xxx }` param in `yvLogin.prepare` method, then `yvLogin` will try to 
 *   bind `$destroy` and `yvConstants.BROADCAST_EVENT_KEY.REFRESH_PAGE` event to `$scope`, when a new app is selected, then you 
 *   will receive a notify callback to let you `refresh page`;
 * 
 * ----------------------------------------------------
 * |                               ( yvLoginedUser )  | <= `website header`
 * ----------------------------------------------------
 * |                                                  | 
 * |                                                  |
 * |                                                  |
 * |           ( activeUser: yvUser )                 | <= `website content`
 * |                                                  |
 * |                                                  |
 * |                                                  |
 * ----------------------------------------------------
 *
 */

angular.module( "this_app.services" ).factory( "yvLogin", yvLogin );
yvLogin.$inject = [ 'yvUser', 'yvAjax', 'yvDebug',
                    'yvConstants', 'yvLoginedUser',
                    '$rootScope', "$state", "$timeout", "$cookies" ];

function yvLogin( yvUser, yvAjax, yvDebug,
                  yvConstants, yvLoginedUser,
                  $rootScope, $state, $timeout, $cookieStore ) {

    var ERROR_CODE = { OK: 0, STATUS_ILLEGAL: 1, LOGIN_ERROR: 2 },

        STATUS = {
            OWNER_0: 1 << 0,
            OWNER_1: 1 << 1,
            OWNER_2: 1 << 2,
            ADMIN: 1 << 3
        },

        activeUser;
    
    return {
        
        ERROR_CODE: ERROR_CODE,
        STATUS: STATUS,
        
        updateLoginedUser: updateLoginedUser,
        check_logined: check_logined,
        checkActiveUser: checkActiveUser,
        checkLoginedUser: checkLoginedUser,

        getLoginedUser: getLoginedUser,
        isLogined: isLogined,
        setLogined: setLogined,
        logout: logout,

        updateActiveUserCookieKey: updateActiveUserCookieKey,
        updateLoginedUserCookieKey: updateLoginedUserCookieKey
        
    }

    function updateLoginedUser( user ) {
        yvLoginedUser.update( user );
        yvDebug.d( '===logined user===', user );
    }

    function updateActiveUser( user ) {
        yvUser.set_login_data( user );
        activeUser = user;
        yvDebug.d( '===active user===', user );
    }

    function updateActiveUserCookieKey( userUUID ) {
        $cookieStore.put(yvConstants.COOKIE_KEY.ACTIVE_USER_UUID, userUUID);
    }

    function updateLoginedUserCookieKey( userUUID, accessToken ) {
        $cookieStore.put(yvConstants.COOKIE_KEY.ACCESS_TOKEN, accessToken); // store access_token
        $cookieStore.put(yvConstants.COOKIE_KEY.LOGINED_USER_UUID, userUUID);
    }

    function getLoginedUser() {
        return yvLoginedUser.get();
    }

    function isLogined() {
        return yvLoginedUser.isLogined();
    }

    function setLogined( l ) {

        yvLoginedUser.setLogined( l );

        if ( l ) {
            var broadcastObj = {
                isAdmin: yvLoginedUser.isAdminUser()
            };
            $rootScope.$emit( yvConstants.BROADCAST_EVENT_KEY.LOGIN_FINISHED, broadcastObj );
            yvDebug.d( '===event:login finished===' );
        }
        
    }

    function logout() {
        
        yvLoginedUser.logout();
        activeUser = null;
        yvUser.logout();

        $cookieStore.remove( yvConstants.COOKIE_KEY.LOGINED_USER_UUID );
        $cookieStore.remove( yvConstants.COOKIE_KEY.ACTIVE_USER_UUID );
        $cookieStore.remove( yvConstants.COOKIE_KEY.ACCESS_TOKEN );
        
    }

    function checkActiveUser( logined, unlogined, state ) {
        if ( activeUser ) {
            if ( logined ) logined( activeUser );
            return;
        }        
    }

    function checkLoginedUser( logined, unlogined, state ) {
        check_logined( logined, unlogined, state );
    }

    function check_logined( logined, unlogined, state ) {
        if ( yvLoginedUser.get() ) {
            if ( logined ) logined( yvLoginedUser.get() );
            return;
        }        
    }
    
}


