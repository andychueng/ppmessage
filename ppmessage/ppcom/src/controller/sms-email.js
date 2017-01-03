Ctrl.$smsEmail = (function(){
    
    return {
        submit: submit
    }

    // option: email or mobile
    function submit( option, callback ) {
        if ( Service.$tools.validateEmail( option ) ) { // email
            
        } else if ( Service.$tools.validatePhoneNumber( option ) ) { // phone
            
        }

        $timeout(function() {
            callback && callback( true );
        }, 3000);
    }

}());
