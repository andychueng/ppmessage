View.$conversationContentContainer = (function() {

    var id = 'pp-conversation-container',
        selector = '.' + id,
        dismissButtonBg = Configuration.assets_path + 'img/close.png',
        dismissImgStyle = 'background-image:url(' + dismissButtonBg + ')',

        dismissClassPrefix = 'pp-borderless-dismiss',

        hide = function() {
            $(selector).hide();
        },

        show = function(fadeIn) {
            if (fadeIn) {
                $(selector).show();    
            } else {
                $(selector).fadeIn();    
            }
        },

        visible = function() {
            return $(selector).is(':visible');
        },

        adjustDismissBarPosition = function() {
            if ( !Ctrl.$conversationQuickMessage.isEnabled() ) return;

            var $el = $( '.pp-conversation-content' ),
                $dismissBar = $( '.' + dismissClassPrefix + '-bar' ),
                DISMISSBAR_HEIGHT = 32,
                TOP = 20,
                remainSpace = window.innerHeight - $el.height() - $( '#pp-composer' ).height() - Service.$tools.cssNum( $( '.pp-messenger-panel' ).css( 'bottom' ) ) - Service.$tools.cssNum( $( '.pp-borderless-dismiss-bar' ).css( 'margin-bottom' ) ) - DISMISSBAR_HEIGHT,
                bottom = 0;

            if ( remainSpace < TOP ) {
                bottom = window.innerHeight - Service.$tools.cssNum( $( '.pp-messenger-panel' ).css( 'bottom' ) ) - $( '#pp-composer' ).height() - TOP - 10;
            } else {
                bottom = $el.height() + Service.$tools.cssNum( $el.css( 'bottom' ) );
            }

            $dismissBar.css( 'bottom', bottom );
        },

        showDismissBar = function() {
            $( '.' + dismissClassPrefix + '-bar' ).slideUp();
        },

        hideDismissBar = function() {
            $( '.' + dismissClassPrefix + '-bar').slideDown();
        },

        hideDismissBarDirect = function() {
            $( '.' + dismissClassPrefix + '-bar').hide();
        },

        build = function() {
            return new View.PPDiv(id)
                .add( new View.Div( { className: dismissClassPrefix + '-bar' } )
                      .add( new View.Div( { className: dismissClassPrefix + '-button', 
                                            style: dismissImgStyle,
                                            selector: '.' + dismissClassPrefix + '-button', 
                                            event: {
                                                click: function() {
                                                    Ctrl.$conversationQuickMessage.disable();
                                                    Ctrl.$conversationQuickMessage.enable();
                                                }
                                            } } ) )
                      .add( new View.Div( { className: dismissClassPrefix + '-view-more',
                                            selector: '.' + dismissClassPrefix + '-view-more',
                                            event: {
                                                click: function() {
                                                    Ctrl.$launcher.get().onClickEvent();
                                                }
                                            } } ).text( Service.Constants.i18n( 'VIEW_MORE' ) ) )
                    )
                .add(View.$conversationContent.build())
                .add(View.$composerContainer.build());
        },

        bindEvent = function() {

            var $el = $( selector );
            // Bind mouse enter event
            $el.bind( 'mouseover', function( event ) {
                if ( !Ctrl.$conversationQuickMessage.isEnabled() ) return;
                adjustDismissBarPosition();
                hideDismissBar();
            } );
            $el.bind( 'mouseleave', function( event ) {
                if ( !Ctrl.$conversationQuickMessage.isEnabled() ) return;
                showDismissBar();
            } );
        },

        unbindEvent = function() {
            var $el = $( selector );
            $el.unbind( 'mouseover' );
            $el.unbind( 'mouseleave' );
        };
    
    return {
        hide: hide,
        show: show,
        visible: visible,
        adjustDismissBarPosition: adjustDismissBarPosition,
        showDismissBar: showDismissBar,
        hideDismissBar: hideDismissBar,
        hideDismissBarDirect: hideDismissBarDirect,

        build: build,
        bindEvent: bindEvent,
        unbindEvent: unbindEvent
    }
    
})();
