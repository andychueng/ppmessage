View.$groupContentItem = (function() {

    var userIcon = Configuration.assets_path + 'img/icon-user-conversation.png',
        userIconStyle = 'background-image:url(' + userIcon + ')';

    function Item(data) {
        View.PPDiv.call(this, {
            'class': 'pp-group-item',
            group_uuid: data.uuid
        });

        var groupName = data.name,
            timeStamp = '',
            groupID = data.uuid,
            icon = data.icon,
            summary = data.summary;

            buildAvatar = function() {
                return new View.Img( {
                    src: icon
                } );
            },
            
            buildBody = function() {
                return new View.PPDiv({ className: 'pp-group-item-body' })
                    .add(new View.PPDiv({ className: 'pp-group-item-meta' })
                         .add(new View.PPDiv({ className: 'pp-group-item-body-author' }).text( groupName ))
                         .add(new View.PPDiv({ className: 'pp-group-item-body-timestamp' }).text( timeStamp ))
                         .add(new View.PPDiv({ className: 'pp-group-item-body-unread-dot' })))
                    .add(new View.PPDiv({ className: 'pp-group-item-content' })
                         .add(new View.PPDiv({ className: 'pp-group-item-content-container' })
                              .add(new View.PPDiv({ className: 'pp-group-item-content-text' }).text( summary )))
                         .add(new View.Div({ className: 'pp-group-item-body-user-icon', style: userIconStyle })));
            },

            buildEvent = function() {
                var $e = findItem(groupID);
                
                $e.click('click', function() {
                    Ctrl.$conversationList.showItem( groupID );
                });
                
            };

        // Build HTML
        this.add(buildAvatar())
            .add(buildBody());

        // Build Event
        $timeout(buildEvent);

    }
    extend(Item, View.PPDiv);
    
    var clsSummary = 'pp-group-item-content-text',
        clsSummarySelector = '.' + clsSummary,
        classPrefix = 'pp-group-item-body',

        findItem = function(groupUUID) {
            return $('.pp-group-content-container')
                .find('div[group_uuid=' + groupUUID +']');
        },

        // @param groupUUID
        // @param unread > 0 --> show blue circle
        showUnread = function(groupUUID, unread) {
            if ( unread > 0 ) {
                var $item = findItem(groupUUID);
                $item.find('.' + classPrefix + '-unread-dot').show();
                $item.find('.' + classPrefix + '-timestamp').css( {
                    color: View.Style.Color.main_color,
                    'font-weight': 'bold'
                } );
            }
        },

        hideUnread = function(groupUUID) {
            var $item = findItem(groupUUID);
            $item.find( '.' + classPrefix + '-unread-dot').hide();
            $item.find('.' + classPrefix + '-timestamp').css( {
                color: '',
                'font-weight': ''
            } );
        },

        findGroupItemImg = function ( groupUUID ) {
            return $( '.pp-group-content-container div[group_uuid=' + groupUUID + '] img' );
        },

        groupIcon = function ( groupUUID, user ) {

            if ( groupUUID && user ) {
                
                findGroupItemImg ( groupUUID )
                    .attr( 'src', user.user_avatar )
                    .attr( 'user_uuid', user.user_uuid );
                
            } else {
                return findGroupItemImg ( groupUUID )
                    .attr( 'src' );
            }
            
        },

        build = function(data) {
            return new Item(data);
        };

    return {
        build: build,

        showUnread: showUnread,
        hideUnread: hideUnread,

        // act as setter and getter
        groupIcon: groupIcon,

        // act as setter
        description: description,
        timestamp: timestamp
    }

    function description( token, desc ) {
        findItem( token ).find( clsSummarySelector ).text( desc );
    }

    function timestamp( token, timeago ) {
        findItem( token ).find( '.' + classPrefix + '-timestamp' ).text( timeago );
    }
    
})();
