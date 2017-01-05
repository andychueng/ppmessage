((function(View) {

    var avatarClass = 'pp-conversation-part-msg-by-admin-avatar';

    /**
     * @constructor
     */
    function PPConversationPartEmojiByAdmin(item) {
        View.PPDiv.call(this, 'pp-conversation-part-emoji-by-admin');

        Service.$pubsub.subscribe('user/infochange/' + item.user.id, function(topics, user) {

            var selector = '#pp-conversation-part-' + item.messageId,
                userInfo = user.getInfo();

            // Change user avatar src
            $(selector)
                .find('.' + avatarClass)
                .attr('src', userInfo.user_avatar);
            
        });

        this.add(new View.PPDiv('pp-conversation-part-emoji-by-admin-outer')
                 .add(new View.PPElement('img', {
                     src: item.user.avatar,
                     className: avatarClass
                 }))
                 .add(new View.PPDiv('pp-conversation-part-msg-by-admin-body-container')
                      .add(new View.PPElement('span', {
                          id: 'pp-conversation-part-emoji-by-admin-body',
                          'class': 'pp-conversation-part-emoji-by-admin-body pp-selectable'
                      }).text(item.message.emoji.code))
                      .add(new View.PPElement('span', {
                          id: 'pp-conversation-part-emoji-by-admin-timestamp-' + item.messageId,
                          'class': 'pp-conversation-part-emoji-by-admin-timestamp pp-selectable pp-font'
                      }).text())));
    }
    extend(PPConversationPartEmojiByAdmin, View.PPDiv);

    View.PPConversationPartEmojiByAdmin = PPConversationPartEmojiByAdmin;
    
})(View));
