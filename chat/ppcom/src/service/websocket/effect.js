Service.$notifyEffect = (function () {

    return {
        get: function($notifyService, msg) {
            return {
                dispatch: function() {
                    msg && Service.$pubsub.publish('ws/effect', msg);
                }
            };
        }
    };
})();
