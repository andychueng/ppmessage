Service.$notifyAuth = (function() {

    var AUTH_TYPE = 'auth';

    //////// API ////////////
    return {
        get: authMessageDispatcher
    }

    function authMessageDispatcher ($notifyService, authMsg) {
        
        return {
            auth: auth,
            dispatch: onAuth
        }

        function auth () {
            
            var $api = Service.$api,
                $json = Service.$json,
                $device = Service.$device,
                $ppSettings = Service.$ppSettings,
                wsSettings = $notifyService.getWsSettings(),

                // auth params
                api_token = $api.getApiToken(),
                user_uuid = wsSettings.user_uuid,
                device_uuid = wsSettings.device_uuid,
                app_uuid = wsSettings.app_uuid,
                is_service_user = false,
                extra_data = {
                    page_title: document.title,
                    page_url: location.href,
                    browser_os : $device.getOSName(),
                    browser_os_version : $device.getOSVersion(),
                    browser_name : $device.getBrowserName(),
                    browser_version : $device.getBrowserVersion(),
                    browser_language : $device.getBrowserLanguage(),
                    language_override : $ppSettings.getLanguage(),
                    document_referrer : document.referrer
                };

            // register webSocket
            $notifyService.write($json.stringify({
                type: AUTH_TYPE,
                api_token: api_token,
                app_uuid: app_uuid,
                user_uuid: user_uuid,
                device_uuid: device_uuid,
                extra_data: extra_data,
                is_sider_device: false,
                is_mobile_device: false,
                is_service_user: false
            }));

        }

        function onAuth() {            
            if (!authMsg) {
                return;
            }

            var wsSettings = $notifyService.getWsSettings();
            Service.$api.createPPComDefaultConversation({
                app_uuid: wsSettings.app_uuid,
                user_uuid: wsSettings.user_uuid,
                device_uuid: wsSettings.device_uuid
            });

            // auth success
            if (authMsg.error_code === 0 || authMsg.code === 0) {
                Modal.$conversationContentGroup.tryLoadLostMessages();                
            }
        }
        
    }
    
})();
