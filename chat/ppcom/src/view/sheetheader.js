View.$sheetHeader = (function() {

    /**
     * @constructor
     */
    function PPSheetHeader() {
        
        var ctrl = Ctrl.$sheetheader,
            PPDiv = View.PPDiv,
            Div = PPDiv,
            PPElement = View.PPElement,

            iconBack = Configuration.assets_path + 'img/icon-back.png',
            iconClose = Configuration.assets_path + 'img/close.png',

            buildHeaderContent = function() {
                return new PPDiv( { className: 'pp-sheet-header-title-container', 
                                    style: 'background-color:' + View.Style.Color.main_color })
                    .add( buildHeaderBody() );
            },

            buildConversationsButton = function() {
                return new PPDiv({
                    'class': 'pp-sheet-conversations-button',
                    style: 'background-image:url(' + iconBack + ')'
                }).add(new PPDiv({
                    'class': 'pp-header-buttons-back-contents',
                })).add(new PPDiv({
                    'class': 'pp-unread-count pp-font pp-box-sizing'
                }));
            },

            buildHeaderBody = function() {
                return new PPDiv('pp-sheet-header-body')
                    .add(new PPDiv('pp-sheet-header-title').text( Service.Constants.i18n( 'CONVERSATIONS' ) ))
                    .add(new PPDiv('pp-sheet-header-app-name').text( Service.$app.app().app_name ));
            },

            buildCloseButton = function() {
                return new PPDiv({
                    'class':'pp-header-buttons-close',
                    style: 'background-image:url(' + iconClose + ')'
                }).add(new PPDiv({
                    'class': 'pp-header-buttons-close-contents'
                }))
            },

            buildSheetHeaderEvent = function() {
                $('#' + id).bind('click', ctrl.onSheetHeaderClicked);
            },

            buildConversationsButtonEvent = function() {
                var selector = '#pp-container .pp-header-buttons-back-contents';
                $(selector)
                    .bind('click', function() {
                        Ctrl.$conversationList.show();
                        showHeaderBody();
                    });
            },

            buildCloseButtonEvent = function() {
                var selector = '#pp-container .pp-header-buttons-close';
                $(selector).bind( 'click', function() {
                    Ctrl.$sheetheader.minimize();
                } );
            },

            buildUnreadButtonEvent = function() {
                var selector = '.pp-sheet-conversations-button .pp-unread-count';
                $ ( selector )
                    .bind('mouseover', function () {
                        $ ( groupButtonIconSelector ).mouseover();
                    })
                    .bind('mouseleave', function () {
                        $ ( groupButtonIconSelector ).mouseleave();
                    })
                    .bind('click', function () {
                        $ ( groupButtonIconSelector ).click();
                    });
            };
        
        PPDiv.call(this, {
            id: id,
            'class': id + ' pp-box-sizing pp-unselectable'
        }, ctrl);

        // Build HTML
        this.add(buildHeaderContent())
            .add(buildConversationsButton())
            .add(buildCloseButton());

        // Bind event
        $timeout(function() {
            ctrl.onSheetHeaderInit();
            buildSheetHeaderEvent();
            buildConversationsButtonEvent();
            buildCloseButtonEvent();
            buildUnreadButtonEvent();
        });
    }
    extend(PPSheetHeader, View.PPDiv);

    var id = 'pp-sheet-header',
        classPrefix = 'pp-sheet-header-',
        teamProfileClassPrefix = classPrefix + 'team-profile',
        teamProfileFullClassPrefix = teamProfileClassPrefix + '-full',
        titleSelector = '.pp-sheet-header-app-name',
        unreadCountSelector = '.pp-unread-count',
        groupButtonSelector = '.pp-sheet-conversations-button',
        groupButtonIconSelector = groupButtonSelector + ' .pp-sheet-header-button-icon',
        titleSelector = '.pp-sheet-header .title-container',

        teamProfileFullShowing = false,
        TEAM_PROFILE_FULL_HEIGHT = 100,
        TEAM_PROFILE_FULL_ANIM_DURATION = 200, // duration in millseconds

        isMouseoverImg = false,
        REMOVE_GROUP_MEMBER_HOVERCARD_EVENT_ID = 'rm-group-member-hovercard',
        mEventToken = REMOVE_GROUP_MEMBER_HOVERCARD_EVENT_ID,

        build = function() {
            return new PPSheetHeader();
        },

        // unreadCount > 0, show unread number
        // unreadCount <= 0, hide unread number
        setUnreadCount = function(unreadCount) {
            if (unreadCount > 0) {
                $(unreadCountSelector).show().text(unreadCount);
            } else {
                $(unreadCountSelector).hide();
            }
        },

        showGroupButton = function() {
            $(groupButtonSelector).show();
        },

        hideGroupButton = function() {
            $(groupButtonSelector).hide();
        },

        setTitle = function(title) {
            $( titleSelector ).text( title );
            $( '.' + classPrefix + 'team-profile-app-name' ).text( title );
        };

    ///////// API //////////////
    return {
        build: build,

        height: height,

        setUnreadCount: setUnreadCount,
        showGroupButton: showGroupButton,
        hideGroupButton: hideGroupButton,

        showDropDownButton: showGroupMembersDropDownButton,
        hideDropDownButton: hideGroupMembersDropDownButton,
        changeDropDownButtonToHideState: changeGroupMembersDropDownButtonToHideState,
        changeDropDownButtonToShowState: changeGroupMembersDropDownButtonToShowState,

        setTitle: setTitle,

        showHeaderBody: showHeaderBody,
        showTeamProfile: showTeamProfile,
        isShowingTeamProfileFull: isShowingTeamProfileFull,
        showTeamProfileFull: showTeamProfileFull,
        hideTeamProfileFull: hideTeamProfileFull,

        reBuildTeamProfile: reBuildTeamProfile
    }

    ////////// Implementation /////

    function showGroupMembersDropDownButton () {

        if ( Service.$sheetHeader.isShowDropDownButton() ) return;
        
        Service.$sheetHeader.showDropDownButton( true ); // update state
        
        var $el = $( titleSelector );
        
        $el.append( new View.Element( 'i', {
            className: 'down-icon',
            style: 'background: url(' + Configuration.assets_path + 'img/icon-down.png) 0 -795px'
        } ).getHTML() )
            .addClass( 'clickable' )
            .on( 'click', function() {

                var $groupMembers = Ctrl.$groupMembers;

                if ( $groupMembers.isShow() ) {
                    changeGroupMembersDropDownButtonToHideState();
                    $groupMembers.hide();
                } else {
                    changeGroupMembersDropDownButtonToShowState();
                    $groupMembers.show();
                }
                
            } );
        
    }

    function hideGroupMembersDropDownButton () {

        Service.$sheetHeader.showDropDownButton( false ); // update state
        
        var $el = $( titleSelector );

        // remove drop-down button
        $el.find( 'i' ).detach();

        $el.removeClass( 'clickable' );
        $el.off( 'click' );
        
    }

    function changeGroupMembersDropDownButtonToHideState() {
        $( titleSelector ).find( 'i' )
            .attr( 'style', 'background: url(' + Configuration.assets_path + 'img/icon-down.png) 0 -795px' );
    }
    
    function changeGroupMembersDropDownButtonToShowState() {
        $( titleSelector ).find( 'i' )
            .attr( 'style', 'background: url(' + Configuration.assets_path + 'img/icon-down.png) 0 -2362px' );
    }

    function height() {
        return $( '#' + id ).height();
    }

    function showHeaderBody() {
        hideTeamProfileFull( function() {
            hideTeamProfile();
            $( '.' + classPrefix + 'body' ).show();
        } );
    }

    function hideHeaderBody() {
        $( '.' + classPrefix + 'body' ).hide();
    }

    function showTeamProfile() {
        hideHeaderBody();
        $( '.' + classPrefix + 'team-profile' ).show();
    }

    function hideTeamProfile() {
        $( '.' + classPrefix + 'team-profile' ).hide();
    }

    function isShowingTeamProfileFull() {
        return teamProfileFullShowing;
    }

    function showTeamProfileFull( config ) {
        if ( teamProfileFullShowing ) return;
        teamProfileFullShowing = true;

        hideTeamProfile();
        
        var $full = $( '.' + teamProfileFullClassPrefix ),
            $conversationList = $( '#pp-conversation-content' );

        $full.css( 'margin-top', -TEAM_PROFILE_FULL_HEIGHT ).show();
        $full.animate( { 'margin-top': "+=" + TEAM_PROFILE_FULL_HEIGHT }, TEAM_PROFILE_FULL_ANIM_DURATION );
        $conversationList.animate( { scrollTop: 0 }, 0 );
        $conversationList.animate( { 'top': "+=" + TEAM_PROFILE_FULL_HEIGHT }, TEAM_PROFILE_FULL_ANIM_DURATION );
        $( '#' + id ).animate({ height: "+=" + TEAM_PROFILE_FULL_HEIGHT }, TEAM_PROFILE_FULL_ANIM_DURATION );
    }

    function hideTeamProfileFull( callback ) {
        var $full = $( '.' + teamProfileFullClassPrefix );
        if ( !teamProfileFullShowing ) {
            $full.hide();
            callback && callback();
            return;
        }
        teamProfileFullShowing = false;

        $full.animate( { 'margin-top': "-=" + TEAM_PROFILE_FULL_HEIGHT }, { duration: TEAM_PROFILE_FULL_ANIM_DURATION, queue: false } );
        $( '#pp-conversation-content' ).animate( { 'top': "-=" + TEAM_PROFILE_FULL_HEIGHT }, { duration: TEAM_PROFILE_FULL_ANIM_DURATION, queue: false } );
        $( '#' + id ).animate({ height: "-=" + TEAM_PROFILE_FULL_HEIGHT }, { duration: TEAM_PROFILE_FULL_ANIM_DURATION, queue: false } );

        $timeout( _completed, TEAM_PROFILE_FULL_ANIM_DURATION + 50 );
        function _completed() {
            $( '.' + teamProfileFullClassPrefix ).hide();
            showTeamProfile();
            callback && callback();
        }
    }

    function _bindEvent( users ) {
        if ( Service.$device.isMobileBrowser() ) {
            _bindMobileEvent( users );
        } else {
            _bindPCEvent( users );
        }
    }

    function _bindMobileEvent( users ) {
        $( '.' + teamProfileFullClassPrefix + '-avatar img' )
            .on( 'click', function ( e ) {
                
                var userId = $( this ).attr( 'user_uuid' );

                View.$loading.show();
                Ctrl.$groupMembers.hide();
                Ctrl.$groupMembers.onMemberClicked( userId, function() {
                    View.$loading.hide();
                } );
                
            } );
    }

    function _bindPCEvent( users ) {
        $( '.' + teamProfileFullClassPrefix + '-avatar img' )
            .bind( 'mouseover', function( e ) {
                e.stopImmediatePropagation();

                isMouseoverImg = true;
                Service.$task.cancel( mEventToken );

                var user = _findUser( users, $( this ).attr( 'user_uuid' ) );
                
                View.$groupMemberHovercard.remove();
                View.$groupMemberHovercard.show( user, { e: e, el: $( this ) } );
            } )
            .bind( 'mouseleave', function( e ) {
                isMouseoverImg = false;
            } );

        $( '#' + teamProfileFullClassPrefix )
            .bind( 'click', function ( e ) {
                !isMouseoverImg && View.$groupMemberHovercard.remove();
            } )
            .bind( 'mouseover', function ( e ) {
                if ( View.$groupMemberHovercard.isShow() && !View.$groupMemberHovercard.isMouseover() ) {
                    
                    Service.$task.plan( mEventToken , function() {
                        !isMouseoverImg &&
                            !View.$groupMemberHovercard.isMouseover() &&
                            View.$groupMemberHovercard.remove();
                    } );
                    
                }
                
            } );
    }

    function _findUser( users, userId ) {

        var user;
        $.each( users, function( index, item ) {
            if ( userId === item.user_uuid ) {
                user = item;
            }
        } );

        return user;
        
    }

    function reBuildTeamProfile( activeConversationToken ) {
        $( '.' + teamProfileFullClassPrefix ).remove();
        $( '.' + teamProfileClassPrefix ).remove();

        var $sheetHeader = $( '.pp-sheet-header-title-container' ),
            users = Service.$conversation.getUser( activeConversationToken ),
            conversation = Service.$conversationManager.find( activeConversationToken ),
            welcomeMessage = Service.$app.app().welcome_message;

        $sheetHeader
            .prepend( buildTeamProfileFull( users, conversation, welcomeMessage ).getElement()[0].outerHTML )
            .prepend( buildTeamProfile( users, conversation, welcomeMessage ).getElement()[0].outerHTML );

        $( '.' + teamProfileClassPrefix + '-container' ).bind( 'click', showTeamProfileFull );
        _bindEvent( users );
    }

    function buildTeamProfile( users, conversation, welcomeMessage ) {
        return new View.Div( teamProfileClassPrefix )
            .add( new View.Div( { className: teamProfileClassPrefix + '-container' }  )
                  .add( buildTeamAvatars( users ) )
                  .add( new View.Div( teamProfileClassPrefix + '-body' )
                        .add( new View.P( teamProfileClassPrefix + '-app-name'  ).text( conversation.conversation_name ) )
                        .add( new View.P( teamProfileClassPrefix + '-description' ).text( welcomeMessage ) )));
    }

    function buildTeamProfileFull( users, conversation ) {
        return new View.Div( teamProfileFullClassPrefix )
            .add( new View.Div( teamProfileFullClassPrefix + '-team-name' ).text( conversation.conversation_name ) )
            .add( new View.Div( teamProfileFullClassPrefix + '-description' ).text( Service.$app.app().welcome_message ) )
            .add( buildTeamProfileFullAvatars( users ) );
    }

    function buildTeamAvatars( users ) {
        users = users || [];
        
        var parent = new View.Div( teamProfileClassPrefix + '-avatar-container' ),
        MAX = 3, 
        i = 0;

        while ( i < MAX && i < users.length ) {
            var user = users[ i ];
            parent.add( new View.Div( teamProfileClassPrefix + '-avatar'  )
                        .add( new View.Img( { src: user.user_avatar  } ) ));
            i++;
        }
        
        return parent;
    }

    function buildTeamProfileFullAvatars( users ) {
        users = users || [];
        var parent = new View.Div( teamProfileFullClassPrefix + '-avatar-container' ),
        MAX = 3,
        i = 0;

        while ( i < MAX && i < users.length ) {
            var user = users[ i ];
            parent.add( new View.Div( teamProfileFullClassPrefix + '-avatar' )
                        .add( new View.Img( { src: user.user_avatar, user_uuid: user.user_uuid } ) )
                        .add( new View.Div( teamProfileFullClassPrefix + '-name' ).text( user.user_fullname ) ) );
            i++;
        }

        return parent;
    }
    
})();
