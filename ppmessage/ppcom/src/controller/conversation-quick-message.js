Ctrl.$conversationQuickMessage = (function() {

    var supportQuickMessageMode = true,
        enabled = false,
        activeConversationId = undefined,
        lastMode = undefined;

    return {
        isSupportQuickMessageMode: isSupportQuickMessageMode,
        isEnabled: isEnabled,

        enable: enable,
        disable: disable,

        handleMessage: handleMessage,
        getActiveConversationId: getActiveConversationId,

        setLastMode: setLastMode,
        getLastMode: getLastMode
    }

    function isSupportQuickMessageMode() {
        return supportQuickMessageMode;
    }

    function isEnabled() {
        return isSupportQuickMessageMode && enabled;
    }
    
    function enable() {
        if (enabled || 
            !Ctrl.$hoverCard.get().isInited() ||
            Ctrl.$conversationPanel.isOpen()) return;

        enabled = true;

        $('#pp-messenger').show();
        View.$conversation.show();
        
        $( '#pp-composer' ).hide();
        $( '#pp-conversation' ).hide();

        $( '.pp-conversation-part-pulltorefreshbutton' ).hide();
        $( '.pp-messenger-panel' ).css( { 'background-color': 'transparent', 'box-shadow': 'none' } );
        $( '.pp-conversation-content' ).css( { top: '0px', 
                                               'background-color': 'transparent', 
                                               'margin-bottom': '20px', 
                                               'padding': '30px 6px 0px 35px', 
                                               'overflow-y': 'scroll', 
                                               'margin-right': '-16px' } );
        $( '.pp-sheet-header' ).hide();
        $( '#pp-composer-container' ).css( { 'border-radius': '5px', 'width': '270px' } );
        $( '.pp-composer-container-textarea' ).css( { 'border-radius': '5px' } ).attr( 'placeholder', 'Write to reply' );
        $( '.pp-conversation-container' ).css( { height: '100%', overflow: 'hidden', position: 'relative' } );   
    }

    function disable() {
        if (!enabled) return;

        enabled = false;
        activeConversationId = undefined;
        lastMode = undefined;

        $( '#pp-composer' ).show();
        $( '#pp-conversation' ).show();

        $( '.pp-conversation-part-pulltorefreshbutton' ).show();
        $( '.pp-messenger-panel' ).css( { 'background-color': View.Style.Color.base, 'box-shadow': '' } );
        $( '.pp-conversation-content' ).css( { top: '', 
                                               'background-color': '', 
                                               'margin-bottom': '', 
                                               'padding': '', 
                                               'overflow-y': '', 
                                               'margin-right': '' } );
        $( '.pp-sheet-header' ).show();
        $( '#pp-composer-container' ).css( { 'border-radius': '', 'width': '' } );
        $( '.pp-composer-container-textarea' )
            .css( { 'border-radius': '' } )
            .attr( 'placeholder', Service.Constants.i18n( Service.$device.inMobile() ? 
                                                          'START_CONVERSATION_MOBILE_HINT' : 
                                                          'START_CONVERSATION_HINT') );
        $( '.pp-conversation-container' ).css( { height: '', overflow: '', position: '' } );
    }

    function handleMessage( ppMessage ) {
        var ppMessageBody = ppMessage.getBody(),
            prepare = function() {
                Ctrl.$conversationContent.clear();
                $( '#pp-composer' ).show();
                $( '#pp-conversation' ).show();
            },
            handle = function() {
                if ( activeConversationId !== ppMessageBody.messageConversationId ) {
                    return false;
                }

                Ctrl.$conversationContent.appendMessage( ppMessageBody, true );
                View.$conversationContent.scrollToBottom();
            };

        if ( activeConversationId === undefined ) { // First quick message arrive
            activeConversationId = ppMessageBody.messageConversationId;

            if ( lastMode === Ctrl.$conversationPanel.MODE.LIST ) {
                Ctrl.$conversationList.showItem( activeConversationId, function( success ) { // Async prepare & handle
                    Ctrl.$conversationPanel.setMode( Ctrl.$conversationPanel.MODE.QUICK_MESSAGE );
                    prepare();
                    handle();
                } );
            } else { // sync prepare & handle
                prepare();
                handle();
            }
        } else { // Not the first quick message
            handle();
        }

        return true;
    }

    function getActiveConversationId() {
        return activeConversationId;
    }

    function setLastMode( mode ) {
        lastMode = mode;
    }

    function getLastMode() {
        return lastMode;
    }

}() );
