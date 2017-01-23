View.$groupMemberHovercard = (function() {

    var globalSelector = '.pp-container',
        parentSelector = '#pp-group-member-hovercard-panel',
        hovercardClassName = 'group-member-hovercard',
        elSelector = globalSelector + ' .' + hovercardClassName,
        textareaElSelector = elSelector + ' textarea',
        bodyElSelector = elSelector + ' .body',
        textareaContainerElSelector = elSelector + ' .textarea-container',

        HOVERCARD_HEIGHT = 156, // default hovercard height
        HOVERCARD_TOP_OFFSET = 25,
        IMG_WIDTH = 70, // width of `img`
        HALF_IMG_WIDTH = IMG_WIDTH / 2,
        DEFAULT_PANEL_WIDTH = 368,
        HOVERCARD_WIDTH = 260,

        mouseover = false; // mouse `over` or `leave` on current hovercard ? 

    /////// API ////////////
    
    return {
        show: show,
        remove: remove,
        isShow: isShow,
        isMouseover: isMouseover
    }

    // @param user:
    // {
    //     user_fullname: xxx,
    //     user_uuid: xxx,
    //     user_signature: xxx,
    //     user_avatar: xxxxxx
    // }
    // @param config:
    // {
    //     e: `mouseevent`,
    //     el: `jQuery element`
    // }
    function show( user, config ) {
        View.$groupMemberHovercardPanel.show();

        var position = calcHovercardPosition( config );
        
        $( parentSelector ).append( build( user, position ).getHTML() );

        // bind event on show
        bindHovercardEvent( user, position );
    }

    function remove() {
        isShow() && $( elSelector ).detach();
        unbindHovercardEvent();
        mouseover = false;
        View.$groupMemberHovercardPanel.hide();
    }

    function isShow() {
        return $( elSelector ).length > 0;
    }

    // GroupMemberHovercard.Views
    ////////////////////////////

    function build( memberInfo, position ) {
        
        var hoverCard = new GroupMemberHovercard( memberInfo, position );
        hoverCard
            .add( buildBody( memberInfo ) )
            .add( buildTextarea( memberInfo ) )
            .add( buildPseudoStyle( position.arrowRight ) );

        bindHovercardEvent( memberInfo, position );

        return hoverCard;
    }

    function buildBody( memberInfo ) {
        return new View.Div({
            className: 'body'
        })
            .add( buildUserAvatar( memberInfo ) )
            .add( buildUserInfo( memberInfo ) );
    }

    function buildUserAvatar( memberInfo ) {

        var avatar = memberInfo.user_avatar;

        return new View.Div({
            className: 'img-container'
        }).add(new View.Img({
            src: avatar
        }));
        
    }

    function buildUserInfo( memberInfo ) {

        var name = memberInfo.user_fullname,
            signature = memberInfo.user_signature;

        return new View.Div({
            className: 'info'
        }).add(new View.Div({
            className: 'name'
        }).text( name ))
            .add(new View.Div({
                className: 'signature'
            }).text( signature ));
        
    }

    function buildTextarea( memberInfo ) {
        var placeHolder = Service.Constants.i18n('HOVER_CARD_TEXTAREA_HINT');

        return new View.Div({
            className: 'textarea-container'
        }).add(new View.Element('textarea', {
            placeholder: placeHolder
        }));
    }

    //GroupMemberHovercard.Views.CssStyle
    /////////////////////////////////////

    // @param right: arrow right margin, 'number' type
    function buildPseudoStyle( right ) {
        var style = new View.Element('style', {
            type: 'text/css',
            className: hovercardClassName + '-style'
        });

        style.text( getArrowUpStyle( right ) );

        return style;
    }

    function getArrowUpStyle ( right ) {
        return '.pp-container .group-member-hovercard:after, .pp-container .group-member-hovercard:before{' +
            'top: -16px;' + 
            'right: ' + right + 'px;' + 
            'border: solid transparent;content: " ";height: 0;width: 0;position: absolute;pointer-events: none;}' + 
            '.pp-container .group-member-hovercard:before {border-color: rgba(204,204,204,0);border-bottom-color: rgba(0,0,0,0.07);border-width: 9px;margin-left: -5px;top: -18px;}' + 
            '.pp-container .group-member-hovercard:after {border-color: rgba(250,250,251,0);border-bottom-color: #fff;border-width: 9px;margin-left: -6px;}';
    }

    //GroupMemberHovercard.Position
    ////////////////////////////////
    
    // @param `config` {
    //     e: `mouseevent`,
    //     el: `jQuery element`
    // }
    //
    // @return {
    //     top: hovercard top margin relative to the window top edge
    //     arrowRight: arrow right margin relative to the window right edge
    // }
    function calcHovercardPosition( config ) {

        var upEdgeDistance = config.el.offset().top - $( window ).scrollTop(),
            hovercardOffsetY = HOVERCARD_TOP_OFFSET;

        return {
            e: config.e,
            top: upEdgeDistance + hovercardOffsetY + ( Service.$device.inMobileWidth() ? 25 : 5 ),
            arrowRight: calcArrowRight( config.e )
        };
        
    }

    function calcArrowRight( mouseEvent ) {
        var // @see http://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
            // `screenX` and `screenY`: Relative to the top left of the physical screen/monitor, this reference point only moves if you increase or decrease the number of monitors or the monitor resolution.
            // `clientX` and `clientY`: Relative to the upper left edge of the content area (the viewport) of the browser window. This point does not move even if the user moves a scrollbar from within the browser.
            marginRight = $( window ).width() - mouseEvent.clientX - IMG_WIDTH,
            fix = HALF_IMG_WIDTH - mouseEvent.offsetX;

        // number `5` is a magic number that let `hovercard` a little closer from right
        if ( Service.$device.inMobileWidth() ) {
            return HOVERCARD_WIDTH / 2 - 9 / 2; // 9 is triangle border width
        }
        return marginRight - fix - 20;
    }

    //GroupMemberHovercard.Event
    ////////////////////////////
    function bindHovercardEvent( memberInfo, position ) {

        $( textareaElSelector )
            .on( 'focus', function( e ) {
                // `onMemberClicked` event will break the transition animation
                // so must make `onMemberClicked` triggerd after the animation transition completed
                smoothTransitionToMessagePanel( position, function() {
                    Ctrl.$groupMembers.onMemberClicked( memberInfo.user_uuid );    
                } );
            } );

        $( elSelector )
            .on( 'mouseover', function ( e ) {                
                mouseover = true;                
            } )
            .on( 'mouseleave', function ( e ) {
                mouseover = false;
            } );
        
    }

    function unbindHovercardEvent() {
        $( textareaElSelector ).off( 'focus' );
        $( elSelector ).off( 'mouseover' ).off( 'mouseleave' );
    }

    function smoothTransitionToMessagePanel( position, completeCallback ) {

        var textareaHeight = 46,
            fixTextareaPaddingBottom = 0,
            textareaTargetHeight = 40,
            textareaTargetMargin = 0,
            bodyHeight = 100,
            messagePanelWidth = getPanelWidth(),
            duration = 300,
            sheetHeaderHeight = 0,
            windowHeight = $( '#pp-conversation' ).height(),
            hovercardTargetHeight = windowHeight - sheetHeaderHeight,
            marginTop = ( $( elSelector ).offset().top - sheetHeaderHeight - $( window ).scrollTop() ) +
            ( windowHeight - ( $( textareaElSelector ).offset().top - $( window ).scrollTop() ) ) -
            ( bodyHeight - textareaHeight ) -
            fixTextareaPaddingBottom;

        $( elSelector )
            .animate( {
                width: messagePanelWidth,
                height: hovercardTargetHeight,
                left: 0,
                top: sheetHeaderHeight
            }, duration );

        $( bodyElSelector )
            .animate( {
                opacity: .0
            }, duration );

        $( textareaElSelector )
            .animate( {
                height: textareaTargetHeight
            } );

        $( textareaContainerElSelector )
            .animate( {
                height: textareaTargetHeight,
                'margin-top': marginTop,
                'margin-left': textareaTargetMargin,
                'margin-right': textareaTargetMargin
            }, duration, function () {

                View.$groupMembers.opacity( .0 );
                
                $( elSelector ).animate( {
                    opacity: .0
                }, duration, function () {
                    
                    Ctrl.$groupMembers.hide( false );
                    View.$composerContainer.focus();

                    $onResult( undefined, completeCallback );
                    
                });
                
            });

    }

    function isMouseover() {
        return mouseover;
    }

    function getPanelWidth() {
        return $( '.pp-messenger-panel' ).width();
    }

    //GroupMemberHovercard
    ////////////////////////
    function GroupMemberHovercard( memberInfo, position ) {
        var inMobileWidth = Service.$device.inMobileWidth(),
            left = undefined;

        if ( inMobileWidth ) {
            left = ( position.e.clientX - position.e.offsetX + HALF_IMG_WIDTH - HOVERCARD_WIDTH / 2 );
        }

        View.Div.call(this, {
            className: hovercardClassName,
            style: 'top:' + position.top + 'px;' + ( left !== undefined ? 'left:' + left + 'px' : '' )
        });
    }
    extend( GroupMemberHovercard, View.Div );
    
})();
