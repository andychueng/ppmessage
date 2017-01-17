Ctrl.$smsEmail = (function(){
    
    return {
        submit: submit
    }

    // option: email or mobile
    function submit( value, callback ) {
        if ( Service.$tools.validateEmail( value ) ) { // email
            Service.$api.updateUser( {
                app_uuid: Service.$ppSettings.getAppUuid(),
                user_uuid: Service.$user.quickId(),
                user_email: value
            }, function( r ) {
                callback && callback( r && r.error_code === 0 );
            }, function( e ) {
                callback && callback( false );
            } );
            return;
        } else if ( Service.$tools.validatePhoneNumber( value ) ) { // phone
            // Service.$api.validatePhoneNumber( {
            //     app_uuid: Service.$app.appId(),
            //     user_uuid: Service.$user.quickId(),
            //     phone_number: value
            // }, function( response ) {
            //     callback && callback( true );
            // }, function( error ) {
            //     callback && callback( false );
            // } );
            return;
        }

        callback && callback( false );
    }

}());
