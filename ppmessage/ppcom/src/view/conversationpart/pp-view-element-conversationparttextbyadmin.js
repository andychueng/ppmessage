((function(View) {

    var avatarClass = 'pp-conversation-part-msg-by-admin-avatar';

    /**
     * @constructor
     */
    function PPConversationPartTextByAdmin(item) {
        View.PPDiv.call(this, 'pp-conversation-part-text-by-admin');

        var html = View.$textUrlChecker.match(item.message.text.body).trustAsHtml(),
            defaultServeNameMarginLeft = '37px',
            inQuickMessageMode = Ctrl.$conversationQuickMessage.isEnabled() && Service.$messageToolsModule.isQuickMessage( item ),
            bgColorStyle = inQuickMessageMode ? 'background-color:#FFF' : '',
            bodyMarginLeftStyle = inQuickMessageMode ? 'margin-left:3px' : '';

        Service.$pubsub.subscribe('user/infochange/' + item.user.id, function(topics, user) {

            var selector = '#pp-conversation-part-' + item.messageId,
                userInfo = user.getInfo();

            // Change user avatar src
            $(selector)
                .find('.' + avatarClass)
                .attr('src', userInfo.user_avatar);  
            
        });
        
        this.add(new View.PPDiv('pp-conversation-part-text-by-admin-outer')
                 .add(new View.PPDiv('pp-conversation-part-text-by-admin-outer-2')
                      .add(View.conversationPartTools.buildAvatars( item.user.avatar, Service.$conversationManager.activeConversation().token ))
                      .add(new View.PPDiv('pp-conversation-part-msg-by-admin-body-container')
                           .add(new View.PPDiv( { style: 'padding-bottom: 10px;' } )
                                .add(new View.PPDiv({ className: 'pp-conversation-part-text-by-admin-body-container', style: bodyMarginLeftStyle })
                                     .add(new View.PPDiv({
                                         id: 'pp-conversation-part-text-by-admin-body',
                                         'class': 'pp-conversation-part-text-by-admin-body pp-font pp-text-link-admin pp-selectable',
                                         style: bgColorStyle
                                     })
                                          .html(html)) )
                                .add( new View.Div( 'pp-conversation-part-text-by-admin-body-triangle pp-conversation-part-msg-by-admin-body-triangle' ).show( inQuickMessageMode ) ))
                           .add(new View.PPDiv('pp-conversation-part-text-by-admin-timestamp-container')
                                .add(new View.PPElement('span', {
                                    'class': 'pp-selectable pp-font',
                                    id: 'pp-conversation-part-text-by-admin-timestamp-' + item.messageId
                                }))))));
    }
    extend(PPConversationPartTextByAdmin, View.PPDiv);

    View.PPConversationPartTextByAdmin = PPConversationPartTextByAdmin;
    
})(View));
