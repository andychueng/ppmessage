// IE8, IE9 not support `WebSocket`, `FormData`, `File` API
((function(Service) {

    Service.$device = (function() {

        var w = window,

            deviceWidth = (w.innerWidth > 0) ? w.innerWidth : screen.width,
            deviceHeight = (w.innerHeight > 0) ? w.innerHeight : screen.height,

            MOBILE_MAX_WIDTH = 736,
            DEVICE_ID_COOKIE_KEY = 'pp-device-id',
            DEVICE_ID_COOKIE_EXPIRE = 10 * 365 * 24 * 3600, // 10 years, never delete it
            deviceId, // device identifier

            userAgent = navigator.userAgent,
            platform = navigator.platform,

            isIOS = /iPhone|iPad|iPod/i.test(userAgent),
            isAndroid = /Android/i.test(userAgent),
            isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent),
            isWP = /Windows Phone/i.test(userAgent) || /iemobile/i.test(userAgent) || /WPDesktop/i.test(userAgent),

            isMac = platform.toUpperCase().indexOf('MAC') >= 0,
            isWin = platform.toUpperCase().indexOf('WIN') > -1,
            isLin = platform.toUpperCase().indexOf('LINUX') > -1,

            OS = {
                MAC: 'MAB',
                LIN: 'LIB',
                WIN: 'WIB'
            };

        var clientStrings = [
            {s:'Windows 3.11', r:/Win16/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows ME', r:/Windows ME/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];

        var osName = "unknown";
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(userAgent)) {
                osName = cs.s;
                break;
            }
        }

        var osVersion = "unknown";

        if (/Windows/.test(osName)) {
            osVersion = /Windows (.*)/.exec(osName)[1];
            osName = 'Windows';
        }

        switch (osName) {
        case 'Mac OS X':
            osVersion = /Mac OS X (10[\.\_\d]+)/.exec(userAgent)[1];
            break;
            
        case 'Android':
            osVersion = /Android ([\.\_\d]+)/.exec(userAgent)[1];
            break;
            
        case 'iOS':
            osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(navigator.appVersion || "");
            osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
            break;
        }


        var browserName = window.navigator.appName;
        var browserVersion = window.navigator.appVersion;
        var verOffset;
        
        // Opera
        if ((verOffset = userAgent.indexOf('Opera')) != -1) {
            browserName = 'Opera';
            browserVersion = userAgent.substring(verOffset + 6);
            if ((verOffset = userAgent.indexOf('Version')) != -1) {
                browserVersion = userAgent.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = userAgent.indexOf('MSIE')) != -1) {
            browserName = 'Microsoft Internet Explorer';
            browserVersion = userAgent.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = userAgent.indexOf('Chrome')) != -1) {
            browserName = 'Chrome';
            browserVersion = userAgent.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = userAgent.indexOf('Safari')) != -1) {
            browserName = 'Safari';
            browserVersion = userAgent.substring(verOffset + 7);
            if ((verOffset = userAgent.indexOf('Version')) != -1) {
                browserVersion = userAgent.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = userAgent.indexOf('Firefox')) != -1) {
            browserName = 'Firefox';
            browserVersion = userAgent.substring(verOffset + 8);
        }
        // Other browsers
        else if ((nameOffset = userAgent.lastIndexOf(' ') + 1) < (verOffset = userAgent.lastIndexOf('/'))) {
            browserName = userAgent.substring(nameOffset, verOffset);
            browserVersion = userAgent.substring(verOffset + 1);
            if (browserName.toLowerCase() == browserName.toUpperCase()) {
                browserName = window.navigator.appName;
            }
        }

        var ix;
        // trim the version string
        if ((ix = browserVersion.indexOf(';')) != -1) browserVersion = browserVersion.substring(0, ix);
        if ((ix = browserVersion.indexOf(' ')) != -1) browserVersion = browserVersion.substring(0, ix);

        this.getDeviceWidth = function() {
            return deviceWidth;
        };

        this.getDeviceHeight = function() {
            return deviceHeight;
        };

        this.inMobile = function() {
            var w = this.getDeviceWidth();
            return w <= MOBILE_MAX_WIDTH;
        };

        this.inMobileWidth = this.inMobile;

        this.disableScroll = function() {
            $('html, body').css({
                'overflow': 'hidden',
                'height': '100%'
            });
        };

        this.enableScroll = function() {
            $('html, body').css({
                'overflow': 'auto',
                'height': 'auto'
            });
        };

        this.isIOS = function() {
            return isIOS;
        };

        this.isAndroid = function() {
            return isAndroid;
        };

        this.isMobileBrowser = function() {
            return isMobile;
        };

        // if IE browser, then return IE version number
        // if not IE browser, then return false
        this.isIE = function () {
            var ua = userAgent;

            var msie = ua.indexOf('MSIE ');
            if (msie > 0) {
                // IE 10 or older => return version number
                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
            }

            var trident = ua.indexOf('Trident/');
            if (trident > 0) {
                // IE 11 => return version number
                var rv = ua.indexOf('rv:');
                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
            }

            var edge = ua.indexOf('Edge/');
            if (edge > 0) {
                // IE 12 => return version number
                return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
            }

            // other browser
            return false;
        };

        this.isIE9 = function() { // IE 9
            var ieVersion = this.isIE();
            return ieVersion && ieVersion == 9;
        };

        this.isIE9OrLowerVersionBrowser = function() { // <= IE 9
            var ieVersion = this.isIE();
            return ieVersion && ieVersion <= 9;
        };

        /** Detect is windwos platform **/
        this.isWindowsPlatform = function() {
            return isWin;
        };

        this.isMac = function() { // is mac platform
            return isMac;
        };

        this.isFirefox = function() {
            return typeof InstallTrigger !== 'undefined'; //Firefox 1.0+
        };

        this.getOSType = function() {

            if ( isAndroid || isLin ) return OS.LIN;

            if ( isIOS || isMac ) return OS.MAC;

            if ( isWP || isWin ) return OS.WIN;

            return OS.MAC;
        };

        this.getDeviceId = function() {

            if (deviceId) return deviceId;

            deviceId = Service.$cookies.get(DEVICE_ID_COOKIE_KEY) || function() {
                var uuid = Service.$tools.getUUID();
                Service.$cookies.set(DEVICE_ID_COOKIE_KEY, uuid, {
                    expires: DEVICE_ID_COOKIE_EXPIRE
                });
                return uuid;
            }();

            return deviceId;
            
        };

        /* Whether or not support play mp3 */
        this.audioMp3 = function() {
            var e = $( '<audio>' )[0];
            return !!e.canPlayType && !!e.canPlayType("audio/mpeg;").replace(/^no$/, "");
        };

        this.getOSName = function() {
            return osName;
        };
        
        this.getOSVersion = function() {
            return osVersion;
        };

        this.getBrowserName = function() {
            return browserName;
        };

        this.getBrowserVersion = function() {
            return browserVersion;
        };

        this.getBrowserLanguage = function() {
            return window.navigator.userLanguage || window.navigator.language;
        };
        
        return this;
        
    })();
    
})(Service));
