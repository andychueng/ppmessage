((function(Service) {

    var textMessageSendSettings = (function() {
        
        return {
            build: function (body) {
                return {
                    upload: false,
                    uploadType: 'txt',
                    uploadContent: body.message.text.body
                };
            }
            
        };

    })();

    Service.$textMessageSendSettings = textMessageSendSettings;
    
})(Service));
