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
        if ( enabled ) return;
        if ( !Ctrl.$hoverCard.get().isInited() ) {
            Service.$debug.d( '[Quick-Message] Cannot enable quick message mode, Hovercard not inited' );
            return;
        }
        if ( Ctrl.$conversationPanel.isOpen() ) {
            Service.$debug.d( '[Quick-Message] Cannot enable quick message mode, ConversationPanel not open' );
            return;
        }

        enabled = true;

        $('#pp-messenger').show();
        View.$conversation.show();
        
        $( '#pp-composer' ).hide();
        $( '#pp-conversation' ).hide();

        $( '.pp-conversation-part-pulltorefreshbutton' ).hide();
        $( '.pp-messenger-panel' ).css( { 'background-color': 'transparent', 'box-shadow': 'none' } );
        $( '.pp-conversation-content' ).css( { top: 'initial', 
                                               width: '330px',
                                               'background-color': 'transparent', 
                                               'margin-bottom': '0px', 
                                               'padding': '0px 20px 0px 0px', 
                                               '-webkit-mask-image': 'linear-gradient(0deg,#000,#000,transparent)',
                                               'mask-image': 'linear-gradient(0deg,#000,#000,transparent)',
                                               'overflow-y': 'hidden', 
                                               'margin-right': '-16px' } );
        $( '.pp-sheet-header' ).hide();
        $( '#pp-composer-container' ).css( { 'border-radius': '5px', 'width': '270px' } );
        $( '.pp-composer-container-textarea' )
            .css( { 'border-radius': '5px',
                    'padding-top': '16px',
                    'padding-bottom': '16px' } )
            .attr( 'placeholder', Service.Constants.i18n( 'WRITE_TO_REPLY' ) );
        $( '.pp-conversation-container' ).css( { height: '100%', overflow: 'hidden', position: 'relative' } );   
        View.$conversationContentContainer.bindEvent();
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
                                               width: '',
                                               'background-color': '', 
                                               'margin-bottom': '', 
                                               'padding': '', 
                                               '-webkit-mask-image': '',
                                               'mask-image': '',
                                               'overflow-y': '', 
                                               'margin-right': '' } );
        $( '.pp-sheet-header' ).show();
        $( '#pp-composer-container' ).css( { 'border-radius': '', 'width': '' } );
        $( '.pp-composer-container-textarea' )
            .css( { 'border-radius': '', 'padding-top': '18px', 'padding-bottom': '18px' } )
            .attr( 'placeholder', Service.Constants.i18n( Service.$device.inMobile() ? 
                                                          'START_CONVERSATION_MOBILE_HINT' : 
                                                          'START_CONVERSATION_HINT') );
        $( '.pp-conversation-container' ).css( { height: '', overflow: '', position: '' } );

        View.$conversationContentContainer.unbindEvent();
        View.$conversationContentContainer.hideDismissBarDirect();
    }

    function handleMessage( ppMessage ) {
        var ppMessageBody = ppMessage.getBody(),
            prepare = function() {
                Ctrl.$conversationContent.clear();
                $( '#pp-composer' ).show();
                $( '#pp-conversation' ).show();
            },
            handle = function() {
                Service.$debug.d( '[Quick-Message] activeId: ', activeConversationId, ppMessageBody );
                if ( activeConversationId !== ppMessageBody.messageConversationId ) {
                    return false;
                }

                Ctrl.$conversationContent.appendMessage( ppMessageBody, true );
                View.$conversationContentContainer.adjustDismissBarPosition();
                View.$conversationContent.scrollToBottom();
                return true;
            };

        if ( activeConversationId === undefined ) { // First quick message arrive
            activeConversationId = ppMessageBody.messageConversationId;

            if ( lastMode === Ctrl.$conversationPanel.MODE.LIST ) {
                Ctrl.$conversationList.showItem( activeConversationId, function( success ) { // Async prepare & handle
                    Ctrl.$conversationPanel.setMode( Ctrl.$conversationPanel.MODE.QUICK_MESSAGE );
                    prepare();
                    handle();
                } );
                return true;
            } else { // sync prepare & handle
                prepare();
                return handle();
            }
        } else { // Not the first quick message
            return handle();
        }
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
