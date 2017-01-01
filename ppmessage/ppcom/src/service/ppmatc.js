Service.$ppmatc = (function() {

    var _interval = 3000, // 3s
    _stop = true;
    
    return {
	// start ppmatc service to 
	// 1) watch window._ppmatc array
	// 2) handle event by FIFO principle
	start: start,
	// stop ppmatic service to
	// 1) stop watch window._ppmatc array
	stop: stop
    }
    
    // options: { ppmatc: [] }
    function start( options ) {
	_stop = false;
    }
    
    function stop() {
	_stop = true;
    }
    
}());
