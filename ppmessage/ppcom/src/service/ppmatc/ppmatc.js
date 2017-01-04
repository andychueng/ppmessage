Service.$ppmatc = (function() {

    var _interval = 3000, // 3s
        _stop = true,
        _intervalID,
        _watchedArray,

        EVENT_ENT_USER = 'ent_user',
        EVENT_TRACK = 'track_event',
        EVENT_PP_SETTINGS = 'pp_settings',
        EVENT_UNKNOWN = 'UNKNOWN';
    
    return {
	    // start ppmatc service to 
	    // 1) watch window._ppmatc array
	    // 2) handle event by FIFO principle
	    start: start,
	    // stop ppmatic service to
	    // 1) stop watch window._ppmatc array
	    stop: stop,

        isStarted: isStarted
    }
    
    function start() {
        if (_stop == false ) {
            Service.$errorHint.warn( "Service.$ppmatc already started!" );
            return;
        }

        Service.$debug.d( "Service.$ppmatc start!" );
	    _stop = false;

        _watchedArray = ( window._ppmatc !== undefined && window._ppmatc ) || [];
        _intervalID = window.setInterval(_doJob, _interval);
    }
    
    function stop() {
        if (_intervalID) {
            window.clearInterval( _intervalID );
            _intervalID = undefined;
        }

	    _stop = true;
        Service.$debug.d( "Service.$ppmatc stop!" );
    }

    function isStarted() {
        return !_stop;
    }

    // internal impl
    function _doJob() {
        if (_watchedArray && _watchedArray.length > 0) {
            var e = _watchedArray.pop();
            _run( _type(e), e );
        }
    }

    function _type( event ) {
        if ( _isEntUserEvent( event ) ) {
            return EVENT_ENT_USER;
        } else if ( _isTrackEvent( event ) ) {
            return EVENT_TRACK;
        } else if ( _isPPSettingsEvent( event ) ) {
            return EVENT_PP_SETTINGS;
        } else {
            return EVENT_UNKNOWN;
        }
        
        function _isEntUserEvent( event ) {
            return event && 
                EVENT_ENT_USER in event && 
                event[ EVENT_ENT_USER ].ent_user_name &&
                event[ EVENT_ENT_USER ].ent_user_id &&
                event[ EVENT_ENT_USER ].ent_user_createtime;
        }

        function _isTrackEvent( event ) {
            return event && 
                EVENT_TRACK in event &&
                event[ EVENT_TRACK ].track_event_name &&
                event[ EVENT_TRACK ].track_event_data;
        }

        function _isPPSettingsEvent( event ) {
            return event && 
                EVENT_PP_SETTINGS in event &&
                event[ EVENT_PP_SETTINGS ].app_uuid;
        }
    }

    function _run( type, event ) {
        switch (type) {
            case EVENT_ENT_USER:
            break;

            case EVENT_TRACK:
            break;

            case EVENT_PP_SETTINGS:
            PP.boot( event[ EVENT_PP_SETTINGS ] );
            break;

            case EVENT_UNKNOWN:
            Service.$errorHint.warn( "[Service.$ppmatc] Unsupported event: ", event );
            break;
        }
    }
    
}());
