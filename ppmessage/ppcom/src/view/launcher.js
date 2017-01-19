View.$launcher = (function() {

    /**
     * @constructor
     */
    function PPLauncher() {
        var ctrl = Ctrl.$launcher.get(),
            showLauncher = ctrl.shouldShowLauncherWhenInit(),
            PPDiv = View.PPDiv;
        
        PPDiv.call(this, {
            id: 'pp-launcher',
            'class': 'pp-launcher'
        }, ctrl);
        
        var self = this;
        var launcherButtonImageCssStyle = 'background-image: url(' + NORMAL_BG + ');' + 'background-color:' + View.Style.Color.launcher_background_color;

        var bottomMargin = ctrl.getLauncherBottomMargin(),
            rightMargin = ctrl.getLauncherRightMargin(),
            style = 'bottom:' + bottomMargin + "; right:" + rightMargin;
        
        this.add(new PPDiv({
            id: 'pp-launcher-container',
            style: style,
            event: {
                init: function() {
                    ctrl.onLauncherInit();
                }
            }
        }, ctrl)
                 .add(new PPDiv('pp-launcher-button-container')
                      .add(new PPDiv({
                          id: 'pp-launcher-button',
                          'class': 'pp-launcher-button pp-unselectable',
                          style: launcherButtonImageCssStyle,
                          event: {
                              click: function() {
                                  self.controller.onClickEvent();
                              }
                          }
                      })))
                 .add(new PPDiv({
                     id: 'pp-launcher-badge',
                     'class':'pp-launcher-badge pp-font',
                     style: 'display:none'
                 }, ctrl))
                 .add(View.$hoverCard.build()))
            .show(showLauncher);
    }
    extend(PPLauncher, View.PPDiv);

    var selectorButton = '#pp-launcher-button',
        clsButtonMaximize = 'pp-launcher-button-maximize',
        clsButtonMinimize = 'pp-launcher-button-minimized',

        selectorButtonContainer = '#pp-launcher-button-container',
        clsButtonContainerActive = 'pp-launcher-button-container-active',
        clsButtonContainerInActive = 'pp-launcher-button-container-inactive',

        STATE = { NORMAL: 'normal', CLOSE: 'close' },
        NORMAL_BG = Configuration.assets_path + 'img/icon-newacquire.png',
        CLOSE_BG = Configuration.assets_path + 'img/close.png',
        state = STATE.NORMAL,

        getState = function() {
            return state;
        },

        build = function() {
            return new PPLauncher();
        },

        shouldHideLauncher = function() {
            return View.$settings.getLaunchStyle().mode.toLowerCase() === View.Settings.LAUNCH_MODE.CUSTOM;
        },

        hideLauncher = function() {
            switch( View.$settings.getLaunchStyle().mode.toLowerCase() ) {
            case View.Settings.LAUNCH_MODE.CUSTOM:
                $( '.pp-launcher' ).hide();
                break;
            case View.Settings.LAUNCH_MODE.NORMAL:
                $( selectorButton ).removeClass( clsButtonMaximize ).addClass( clsButtonMinimize );
                $( selectorButtonContainer ).removeClass( clsButtonContainerActive ).addClass( clsButtonContainerInActive );
                break;
            }
        },
        
        // state: View.$launcher.STATE
        showLauncher = function( _state ) {
            var $launcher = $( selectorButton );
            $launcher.removeClass( clsButtonMinimize ).addClass( clsButtonMaximize );
            $( selectorButtonContainer ).removeClass( clsButtonContainerInActive ).addClass( clsButtonContainerActive );

            state = _state;
            var bgURL = (state == STATE.NORMAL) ? NORMAL_BG : CLOSE_BG;
            $launcher.css( 'background-image', 'url(' + bgURL + ')' );
        },
        
        showMessageBox = function() {
            showLauncher( STATE.CLOSE );
            $('#pp-messenger').show();
            View.$conversation.show();
            Ctrl.$hoverCard.get().hideHoverCardNow();
        };
    
    return {
        STATE: STATE,
        build: build,

        shouldHideLauncher: shouldHideLauncher,
        hideLauncher: hideLauncher,
        showLauncher: showLauncher,
        showMessageBox: showMessageBox,

        state: getState
    }
    
})();
