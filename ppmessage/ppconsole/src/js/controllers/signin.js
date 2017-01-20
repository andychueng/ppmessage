angular.module("this_app")
    .controller("SignInCtrl", function($scope, $state, $stateParams, $timeout, $translate, $cookieStore, yvAjax, yvUtil, yvUser, yvTransTags, yvConstants, yvDebug, yvLogin) {

        $scope.user = {
            user_status: "OWNER_2",
            is_service_user: false,
            user_fullname: "",
            user_email: "",
            user_password: "",
            app_name: "",

            user_password_is_visible: false,
            password_input_type: "password",
        };

        var get_token = function (onSuccess, onError) {
            yvAjax.get_credentials_token()
                .success( function( response ) {
                    if (response.access_token) {
                        onSuccess && onSuccess( response );
                    } else {
                        onError && onError( response );
                    }
                } )
                .error( function( error ) {
                    onError && onError( error );
                } );
        };
                
        var signin = function(user) {
            var password = sha1($scope.user.user_password);
            yvAjax.login({user_email: $scope.user.user_email, user_password: password}).then(function(response) {
                var data = response.data;

                console.log("login return : %o", response);
                
                if (data.error_code != 0) {
                    $scope.toast_error_string("SIGNIN_FAILED_TAG");
                    return;
                }
                
                yvLogin.updateActiveUserCookieKey( data.user_uuid );
                yvLogin.updateLoginedUserCookieKey( data.user_uuid, data.access_token );

                yvAjax.get_user_detail_with_password(data.user_uuid).then(function(response) {

                    var _udata = response.data;
                    if (_udata.error_code != 0) {
                        return;
                    }

                    yvUser.set_team(_udata.team);
                    
                    yvLogin.updateLoginedUser( angular.copy( _udata ) );
                    yvLogin.setLogined( true );
                    
                    var _url = yvConstants.USER_STATUS[_udata.user_status];
                    
                    if (_udata.user_status == "SERVICE") {
                        yvLogin.updateActiveUser( _udata );
                        $scope.start_ppmessage(true);
                        return;
                    }
                    
                    if (_udata.user_status == "OWNER_2") {
                        $state.go(_url);
                        return;
                    }
                    
                    yvDebug.d("do not know how to handle user_status: %s", data.user_status);
                    return;
                }, function() {
                    $scope.toast_error_string("SIGNIN_FAILED_TAG");
                });
            }, function(response) {
                $scope.toast_error_string("SIGNIN_FAILED_TAG");
            });
            
        };
        
        $scope.sign_in_form_submit = function() {
            signin($scope.user);
        };

        $scope.show_user_password = function(show) {
            if (show) {
                $scope.user.user_password_is_visible = true;
                $scope.user.password_input_type = "text";
            } else {
                $scope.user.user_password_is_visible = false;
                $scope.user.password_input_type = "password";
            }
        };
        
    }); // end login ctrl
