Service.$ppmatc = (function() {

    var _interval = 3000, // 3s
        _stop = true,
        _intervalID,
        _watchedArray,

        EVENT_ENT_USER = 'ent_user',
        EVENT_TRACK = 'track_event';
    
    return {
	// start ppmatc service to 
	// 1) watch window._ppmatc array
	// 2) handle event by FIFO principle
	start: start,
	// stop ppmatic service to
	// 1) stop watch window._ppmatc array
	stop: stop
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

    // internal impl
    function _doJob() {
        if (_watchedArray && _watchedArray.length > 0) {
            _run( _watchedArray.pop() );
        }
    }

    function _run( event ) {
        if ( _isEntUserEvent( event ) ) {
            Service.$debug.d( '[do work] ent_user:', event );
        } else if ( _isTrackEvent( event ) ) {
            Service.$debug.d( '[do work] track_event', event );
        } else {
            Service.$errorHint.warn( "[Service.$ppmatc] Unsupported event: ", event );
            return;
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
    }
    
}());
