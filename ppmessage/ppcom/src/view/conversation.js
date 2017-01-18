View.$conversation = (function() {

    var id = 'pp-conversation',
        selector = '#' + id,

        clsMaximize = 'pp-conversation-content-maximize',
        clsMinimize = 'pp-conversation-sheet-minimized',

        clsPanel = 'pp-messenger-panel',
        clsPanelSelector = '.' + clsPanel,

        PANEL_WIDTH = Service.Constants.STYLE.PANEL_WIDTH,
        extraPadding = Service.$device.isMobileBrowser() ? 0 : 20;

    return {
        
        build: function() {
            return new PPConversation();
        },

        makeConversationPanelVisible: function() {
            $( selector ).removeClass( clsMinimize ).addClass( clsMaximize );  
        },

        show: function() {
            View.$conversation.prepare();
            var viewSettings = View.$settings,
                launchStyle = viewSettings.getLaunchStyle(),
                launchMode = launchStyle.mode,
                launchPosition = launchStyle.position,
                launchBottom = launchStyle.bottom;
            
            switch ( launchMode.toLowerCase() ) {
            case View.Settings.LAUNCH_MODE.NORMAL: 
                $( clsPanelSelector ).css( { bottom : '' } );
                View.$conversation.makeConversationPanelVisible();
                break;
                
            case View.Settings.LAUNCH_MODE.CUSTOM:
                $( clsPanelSelector ).css( { bottom : launchBottom } );

                var DURA = 700; // 700ms
                switch ( launchPosition.toLowerCase() ) {
                case View.Settings.LAUNCH_POSITION.LEFT:
                    // slide from left to right
                    $( clsPanelSelector ).animate( { left: '+=' + ( PANEL_WIDTH + extraPadding ) + 'px' }, DURA );
                    break;
                case View.Settings.LAUNCH_POSITION.RIGHT:
                    // slide from right to left
                    $( clsPanelSelector ).animate( { right: '+=' + ( PANEL_WIDTH + extraPadding ) + 'px' }, DURA );
                    break;
                }
                break;
            }
        },

        hide: function() {
            var viewSettings = View.$settings,
                launchStyle = viewSettings.getLaunchStyle(),
                launchMode = launchStyle.mode,
                launchPosition = launchStyle.position;

            switch ( launchMode.toLowerCase() ) {
            case View.Settings.LAUNCH_MODE.NORMAL: 
                $( selector ).removeClass( clsMaximize ).addClass( clsMinimize );
                break;
                
            case View.Settings.LAUNCH_MODE.CUSTOM:
                var DURA = 700; // 700ms
                switch ( launchPosition.toLowerCase() ) {
                case View.Settings.LAUNCH_POSITION.LEFT:
                    // slide from left to right
                    $( clsPanelSelector ).animate( { left: '-=' + ( PANEL_WIDTH + extraPadding ) + 'px' }, DURA );
                    break;
                case View.Settings.LAUNCH_POSITION.RIGHT:                    
                    // slide from right to left
                    $( clsPanelSelector ).animate( { right: '-=' + ( PANEL_WIDTH + extraPadding ) + 'px' }, DURA );
                    break;
                }
                break;
            }
        },

        prepare: function() {
            var viewSettings = View.$settings,
                launchStyle = viewSettings.getLaunchStyle(),
                launchMode = launchStyle.mode,
                launchPosition = launchStyle.position;

            switch ( launchMode.toLowerCase() ) {
                case View.Settings.LAUNCH_MODE.NORMAL:
                $( clsPanelSelector ).css( { left: '', right: extraPadding + 'px' } );
                break;
                case View.Settings.LAUNCH_MODE.CUSTOM: {
                    switch ( launchPosition.toLowerCase() ) {
                    case View.Settings.LAUNCH_POSITION.LEFT:
                        $( clsPanelSelector ).css( { left: -( PANEL_WIDTH ) + 'px', right: '' } );
                        break;
                    case View.Settings.LAUNCH_POSITION.RIGHT:
                        $( clsPanelSelector ).css( { left: '', right: -( PANEL_WIDTH ) + 'px' } );
                        break;
                    }
                }
                break;
            }
        }
        
    }

    /**
     * @constructor
     */
    function PPConversation() {
        View.PPDiv.call(this, {
            id: id,
            style: 'background-color:' + View.Style.Color.base,
            'class': clsPanel + ' pp-box-sizing'
        });
        
        this.add(View.$sheetHeader.build())
            .add(View.$groupContent.build())
            .add(View.$conversationContentContainer.build())
            .add(View.$loading.build())
            .add(View.$groupMemberHovercardPanel.build());
    }
    extend(PPConversation, View.PPDiv);
    
})();
