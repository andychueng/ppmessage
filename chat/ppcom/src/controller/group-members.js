Ctrl.$groupMembers = ( function() {

    ////////// API /////////////
    return {
        show: show,
        hide: hide,
        isShow: isShow,

        onMemberClicked: triggerMemberClickEvent
    }

    //////// Implementation ////////

    function show() {

        // 1. get current group identifier
        var token = findConversationId();

        // 2. show it
        View.$sheetHeader.changeDropDownButtonToShowState();
        View.$groupMembers.show( token );
        
    }

    function hide( animate ) {

        // 1. get current group identifier
        var token = findConversationId();

        // 2. hide it
        View.$sheetHeader.changeDropDownButtonToHideState();
        View.$groupMembers.hide( token, animate );
        
    }

    function isShow() {
        return View.$groupMembers.isShow();
    }

    function findConversationId() {
        var activeConversation = Service.$conversationManager.activeConversation();
        return activeConversation && activeConversation.token;
    }

    function triggerMemberClickEvent( userId, callback ) {
        View.$sheetHeader.hideTeamProfileFull( function() {

            Service.$conversationManager.asyncGetConversation( {
                user_uuid: userId
            } , function ( conversation ) {
                
                if ( conversation ) {
                    Service.$conversationManager.activeConversation( conversation.token );

                    // Ensure we get user
                    Service.$conversation.asyncGetUser( conversation.token, function() {
                        Ctrl.$conversationContent.show( conversation );
                        $onResult( undefined, callback );
                    } );
                }
                
            } );

        } );
    }
    
} )();
