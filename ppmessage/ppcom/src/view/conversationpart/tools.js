View.conversationPartTools = ( function() {

    var avatarClassPrefix = 'pp-conversation-part-msg-by-admin-avatar';

    ////////// API //////////
    
    return {
        buildExtra: buildExtra,
        buildAvatars: buildAvatars
    }

    ///////// Inner Impl ////////

    function buildExtra( item ) {
        var color = '#c9cbcf',
            text = item.extra.description,
            show = false;
        
        if ( Service.$tools.isMessageSendError( item ) ) {
            color = 'red';
            text = item.extra.errorDescription;
        } else if ( item.messageState === 'SENDING' ) {
            text = Service.Constants.i18n( 'SENDING' );
        }

        show = text && text.length > 0 && !Service.$tools.isUploading( item );

        return {
            style: 'color:' + color + "; display:" + ( show ? 'block' : 'none' ),
            text: text,
            show: show
        };
    }

    function buildAvatars( originAvatar, activeConversationToken ) {
        var users = Service.$conversation.getUser( activeConversationToken );
        if ( users.length <= 1 ) {
            return new View.Img( { className: avatarClassPrefix, src: originAvatar } );
        } else if ( users.length === 2 ) {
            var $container = new View.Div( avatarClassPrefix + '-container' ),
                len = users.length,
                SEQUENCE = [ 'first', 'second' ];

            for ( var i=0; i<len; i++ ) {
                $container.add( new View.Img( { src: users[ i ].user_avatar, 
                                                className: 'pp-conversation-part-msg-' + SEQUENCE[i] + '-of-two-avatar' } ) );
            }
            
            return $container;
        } else if ( users.length >= 3 ) {
            var $container = new View.Div( avatarClassPrefix + '-container' ),
                MAX_LEN = 3,
                SEQUENCE = [ 'first', 'second', 'third' ];

            for ( var i=0; i<MAX_LEN; i++ ) {
                $container.add( new View.Img( { src: users[ i ].user_avatar, 
                                                className: 'pp-conversation-part-msg-' + SEQUENCE[i] + '-of-three-avatar' } ) );
            }
            
            return $container;        
        }
    }
    
} )();
