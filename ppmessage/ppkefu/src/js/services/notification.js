ppmessageModule.factory("yvNoti", [
    "$timeout",
    "$rootScope",
    "yvAPI",
    "yvSys",
    "yvSSL",
    "yvUser",
    "yvLink",
    "yvType",
    "yvAlert",
    "yvLocal",
    "yvBase",
    "yvMessage",
    "yvConstants",
function ($timeout, $rootScope, yvAPI, yvSys, yvSSL, yvUser, yvLink, yvType, yvAlert, yvLocal, yvBase, yvMessage, yvConstants) {
    
    var SOCKET_STATE = ["CONNECTING", "OPEN", "CLOSING", "CLOSED"];
    var _pc_socket = null;
    var _typing_promise = null;
    var _reconnect_interval = null;
    var _pending_messages = [];

    function _on_resume() {
        $timeout(function () {
            __open_socket();
        });
    }

    function _on_pause() {
        $timeout(function() {
            __close_socket();
        });
    }
        
    function _socket_reconnect_interval() {
        var _d = new Date(), _s = _socket_reconnect();
        // console.log("SOCKET RECONNECT AT: ", _d.toUTCString(), "CURRENT STATE IS: ", _s);
    }
    
    function _is_socket_type_data(data) {
        if (data.type !== undefined) {
            return true;
        }
        return false;
    }
    
    function _is_socket_meta_data(data) {
        if (data.error_code !== undefined) {
            return true;
        }
        return false;
    }
    
    function _is_socket_message_data(data) {
        // message type and message subtype
        if (data.mt !== undefined && data.ms !== undefined) {
            return true;
        }
        return false;
    }

    function _handle_socket_meta_data(obj) {
    }

    function _handle_socket_type_data(obj) {
        //FIXME: online message
        //FIXME: typing message

        if (obj.type == "ONLINE" || obj.type == "TYPING") {
            return;
        }
        
        if (obj.type == "MSG") {
            _handle_socket_message_data(obj.msg);
            return;
        }

        if (obj.type == "ACK") {
            $rootScope.$broadcast("event:receive_ack_message", obj);
            return;
        }

        //console.error("unknown ws message: %o", obj)
        return;
    }
    
    function _handle_socket_message_data(obj) {
        $rootScope.$broadcast("event:add_message", obj);
    }

    function __open_socket() {
        _socket_init();
        _reconnect_interval = setInterval(_socket_reconnect_interval, 1000 * 10);
    }
    
    function __close_socket() {
        
        if (_pc_socket != null) {
            _pc_socket.close();
            _pc_socket = null;
        }
        
        if (_reconnect_interval != null) {
            clearInterval(_reconnect_interval);
            _reconnect_interval = null;
        }
    }
        
    function _fn_pc_open() {
        if (!_pc_socket) {
            console.error("there is no pc socket");
            return;
        }

        var _socket_state = _pc_socket.readyState;
        var _auth = {
            type: "auth",
            is_service_user: true,
            api_token: yvUser.get("access_token"),
            user_uuid: yvUser.get("uuid"),
            device_uuid: yvUser.get("device_uuid"),
            app_uuid: yvUser.get("app").uuid
        };

        if (_socket_state === WebSocket.OPEN) {
            _pc_socket.send(JSON.stringify(_auth));

            // send pending message
            angular.forEach(_pending_messages, function (message) {
                console.log("-------send pending message", message);
                _pc_socket.send(JSON.stringify(message));
            });
            _pending_messages.length = 0;
            return;
        }
        
        console.error("pc socket is not open, current state is: ", SOCKET_STATE[_socket_state]);
        return;
    }

    function _fn_pc_close() {
        console.log("======WS closed==========");
    }

    function _fn_pc_listener(message) {
        var _o = JSON.parse(message.data);

        if (_is_socket_type_data(_o)) {
            _handle_socket_type_data(_o);
            return;
        }
        
        return;
    }

    function _socket_init() {
        var server = yvAPI.get_server();
        var ws = server.protocol == "https://" ? "wss://" : "ws://";
        var host = server.port ? server.host + ":" + server.port : server.host;
        var url = ws + host + "/pcsocket/WS";
        _pc_socket = new WebSocket(url);
        _pc_socket.onopen = _fn_pc_open;
        _pc_socket.onmessage = _fn_pc_listener;
        _pc_socket.onclose = _fn_pc_close;
    }

    function _socket_reconnect() {
        if (!_pc_socket) {
            _socket_init();
            return "NO_SOCKET";
        }
        var _socket_state = _pc_socket.readyState;
        if (_socket_state === WebSocket.CLOSING || _socket_state === WebSocket.CLOSED) {
            console.log("socket_reconnect, socket is closing or closed, will reconnect");
            _socket_init();
        }
        return SOCKET_STATE[_socket_state];
    }

    function _exit() {
        // for every platform
        __close_socket();
    }

    function _send_type_message(_body) {
        if (!_pc_socket || _pc_socket.readyState != WebSocket.OPEN) {
            console.error("send type message failed for socket not open");
            return;
        }
        _pc_socket.send(JSON.stringify(_body));
    }

    function _send_pp_message(_m, _s, _e, _e) {
        if (!_pc_socket || _pc_socket.readyState != WebSocket.OPEN) {
            console.error("send type message failed for socket not open, push it to pending list");
            _pending_messages.push(_m);
            _e && _e();
            return;
        }
        _pc_socket.send(JSON.stringify(_m));
        _s && _s();
        return
    }
    
    return {
        init: function (_success, _error) {
            __close_socket();            
            __open_socket();
        },

        exit: function () {
            _exit();
        },
        
        send_message: function(_m, _s, _e, _e) {
            _send_pp_message(_m, _s, _e, _e);
        },
        
    };
}]);
