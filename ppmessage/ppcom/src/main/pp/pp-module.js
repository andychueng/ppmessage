function PPModule(jQuery) {
    
    var _fn = null;
    
    var getFn = function(jQuery) { // get a fn
        if (_fn == null) {
            _fn = PPMessage(jQuery);
            
            // Faciliate our debug to see the inner world of `PP` object by call `PP.fn.xxx`
            // Consider to remove this line when put `PP` on release mode
            if (window.PP) {
                window.PP.fn = _fn;
            }
        }
        return _fn;
    };
    
    var _pp = {
        
        /**
         * major.minor.status.revision
         */
        version : '1.0.0.2',

        /**
         * Boot PPCom with ppSettings
         */
        boot : function(ppSettings, callback) {
            ppSettings = ppSettings || window.ppSettings;
            ppSettings && getFn(jQuery).Service.$publicApi.boot(ppSettings, callback);
        },

        /**
         * Show PPCom MessageBox
         */
        show : function() {
            getFn(jQuery).Service.$publicApi.show();
        },

        /**
         * Hide PPCom MessageBox
         */
        hide : function() {
            getFn(jQuery).Service.$publicApi.hide();
        },

        // Show PPCom MesssageBox
        open : function() {
            getFn(jQuery).Service.$publicApi.show();
	},
	    
	// Hide PPCom MessageBox
	close : function() {
            getFn(jQuery).Service.$publicApi.hide();
	},
	    
	// Check is PPCom MessageBox opened
	isOpen : function() {
	    return getFn(jQuery).Service.$publicApi.isOpen();
	},

	// Toggle PPCom MessageBox
	toggle : function() {
	    if (windoow.PP.isOpen()) {
	        window.PP.close();
	    } else {
	        window.PP.open();
	    }
	},

        /**
         * PPCom MessageBox onShow event callback
         */
        onShow : function(event) {
		    getFn(jQuery).Service.$publicApi.onShow(event);
        },

        /**
         * PPCom MessageBox onHide event callback
         */
        onHide : function(event) {
            getFn(jQuery).Service.$publicApi.onHide(event);
        },

        /**
         * This method will effectively clear out any user data that you have been passing through the JS API. 
         * You should call the shutdown method anytime a user logs out of your application.
         *
         * [Note]: This will cause PPCom fully dismiss from your application.
         */
        shutdown : function() {
            getFn(jQuery).Service.$publicApi.shutdown();
            _fn = null;
        },

        /**
         * Update PPCom by ppSettings
         */
        update : function(ppSettings) {
            ppSettings = ppSettings || window.ppSettings;
            if(getFn(jQuery).Service.$publicApi.update(ppSettings)) {
                _pp.shutdown();
                _pp.boot(ppSettings);
            }
        }

    };

    return _pp;
}
