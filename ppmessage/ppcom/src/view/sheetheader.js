View.$sheetHeader = (function() {

    /**
     * @constructor
     */
    function PPSheetHeader() {
        
        var ctrl = Ctrl.$sheetheader,
            PPDiv = View.PPDiv,
            PPElement = View.PPElement,

            iconBack = Configuration.assets_path + 'img/icon-back.png',
            iconClose = Configuration.assets_path + 'img/close.png',

            buildTitle = function() {
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
                    .add(new PPDiv('pp-sheet-header-title').text('Conversations'))
                    .add(new PPDiv('pp-sheet-header-app-name').text('PPMessage'));
            },

            buildCloseButton = function() {
                return new PPDiv({
                    'class':'pp-header-buttons-close',
                    style: 'background-image:url(' + iconClose + ')'
                }).add(new PPDiv({
                    'class': 'pp-header-buttons-close-contents'
                }))
            }

            buildSheetHeaderEvent = function() {
                $('#' + id).bind('click', ctrl.onSheetHeaderClicked);
            },

            buildConversationsButtonEvent = function() {
                var selector = '#pp-container .pp-header-buttons-back-contents';
                $(selector)
                    .bind('click', function() {
                        Ctrl.$conversationList.show();
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
        this.add(buildTitle())
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
        titleSelector = '.pp-sheet-header-app-name',
        unreadCountSelector = '.pp-unread-count',
        groupButtonSelector = '.pp-sheet-conversations-button',
        groupButtonIconSelector = groupButtonSelector + ' .pp-sheet-header-button-icon',
        titleSelector = '.pp-sheet-header .title-container',

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

        setTitle: setTitle
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
    
})();
