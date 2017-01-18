/**

## Inject `PPDebug` scripts to the third web site

```javascript
var head = document.getElementsByTagName('head')[0];
var ppcom = document.createElement("script");
ppcom.setAttribute('src', 'http://192.168.0.206:8001/assets/ppdebug.js');
head.appendChild(ppcom);
```

## `API`

- `PPDebug.show()`: show debug window in current page
- `PPDebug.hide()`: hide debug window in current page

*/

( function() {

    var $,
        Service,
        Ctrl,
        Modal,
        APP_UUID = '642b6758-dd27-11e6-afb1-74de2b58a3a8';

    ////////// PPDebug ////////////
    window.PPDebug = ( function() {

        var debugContainer = 'pp-debug',
            debugContainerId = '#' + debugContainer;

        return {
            show: show,
            hide: hide
        }

        function show() {
            if ( !window.PP ) throw new Error( 'window.PP is undefined' );

            $ = PP.fn.$;
            Service = PP.fn.Service;
            Modal = PP.fn.Modal;
            Ctrl = PP.fn.Controller;
            
            if ( $( debugContainerId ).is( ':visible') ) return;

            _buildView();
        }

        function hide() {
            $( debugContainerId ).detach();
        }

        function _buildView() {
            $( document.body ).append( '<div id=' + debugContainer + '></div>' );
            _cssDebugContainer();

            var $elDebugContainer = $( debugContainerId );
            
            $elDebugContainer.append( _buildInputViewHtml( 'random-msg-arrived', '随机新消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'current-msg-arrived', '当前会话新消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'show-all-conversations', '显示所有会话列表' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'show-all-users', '显示所有用户' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'typing', '当前会话对方正在输入' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'send-msg', '当前会话发送消息' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'monitor', '监视所有事件' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'user-info-change', '加载所有用户信息至下拉菜单' ) );
            $elDebugContainer.append( _buildCheckoutViewHtml( 'enable-quick-mode', 'Enable Quick Message Mode' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'audio-msg-arrived', '当前会话语音消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'text-msg-arrived', '当前会话文字消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'file-msg-arrived', '当前会话文件消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'img-msg-arrived', '当前会话图片消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'emoji-msg-arrived', '当前会话Emoji消息到来' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'get-current-conversation-uuid', '得到当前会话conversation_uuid' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'console-current-conversation-msgs', 'console打印当前会话所有消息' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'simulate-and-show-group-members-with-diverse-state', '显示组下拉用户(假数据+状态随机)' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'add-duplicate-ppcom-script', '在已有的情况下添加一个新的scripts' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'simulate-one-conversation-avaliable', '模拟一个Conversation Avaliable' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'check-current-messagepanel-mode', '查看当前MessagePanel所在的Mode' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'snapshot', '快照' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'push-pp-settings-to-ppmatc', 'Push PPSettings' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'push-ent-user-to-ppmatc', 'Push Ent User Event to PPMatc' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'push-track-event-to-ppmatc', 'Push Track Event to PPMatc' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'push-pp-settings-launch-style-left-to-ppmatc', 'Push Launch Style Left to PPMatc' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'push-pp-settings-launch-style-right-to-ppmatc', 'Push Launch Style Right to PPMatc' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'push-pp-settings-launch-style-normal-to-ppmatc', 'Push Launch Style Normal to PPMatc' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'append-email-input-msg', 'Append email Input msg' ) );
            $elDebugContainer.append( _buildInputViewHtml( 'append-email-input-msg-with-selected', 'Append email Input msg with email' ) );
            
            $elDebugContainer.append( '<br/><select class="drop-down"><option>None</option></select><br/>' );
            $elDebugContainer.append( _buildInputViewHtml( 'clear', '清空' ) );
            $elDebugContainer.append( '<textarea id="debug-area"></textarea>' );
            _cssDebugTextarea();

            var test = Test();
            window.PPTest = test;
            _bindViewClickEvent( 'random-msg-arrived', test.onMessage );
            _bindViewClickEvent( 'current-msg-arrived', test.onChattingMessage );
            _bindViewClickEvent( 'show-all-conversations', test.conversationList );
            _bindViewClickEvent( 'show-all-users', test.userList );
            _bindViewClickEvent( 'typing', test.onChattingTyping );
            _bindViewClickEvent( 'send-msg', test.sendMessage );
            _bindViewClickEvent( 'monitor', test.monitor );
            _bindViewClickEvent( 'user-info-change', test.userListInDropDown );
            _bindViewClickEvent( 'clear', test.clear );
            _bindViewClickEvent( 'audio-msg-arrived', test.onAudioMessage );
            _bindViewClickEvent( 'text-msg-arrived', test.onTextMessage );
            _bindViewClickEvent( 'file-msg-arrived', test.onFileMessage );
            _bindViewClickEvent( 'img-msg-arrived', test.onImgMessage );
            _bindViewClickEvent( 'emoji-msg-arrived', test.onEmojiMessage );
            _bindViewClickEvent( 'get-current-conversation-uuid', test.debugCurrentConversationId );
            _bindViewClickEvent( 'console-current-conversation-msgs', test.consoleCurrentConversationMsgs );
            _bindViewClickEvent( 'simulate-and-show-group-members-with-diverse-state', test.simulateAndShowGroupMembersWithDiverseState );
            _bindViewClickEvent( 'add-duplicate-ppcom-script', test.addDuplicatePPComScripts );
            _bindViewClickEvent( 'simulate-one-conversation-avaliable', test.simulateOneConversationAvaliable );
            _bindViewClickEvent( 'check-current-messagepanel-mode', test.checkCurrentMessagePanelMode );
            _bindViewClickEvent( 'snapshot', test.snapshot );
            _bindViewClickEvent( 'push-pp-settings-to-ppmatc', test.pushPPSettingsToPPMatc );
            _bindViewClickEvent( 'push-ent-user-to-ppmatc', test.pushEntUserToPPMatc );
            _bindViewClickEvent( 'push-track-event-to-ppmatc', test.pushTrackEventToPPMatc );
            _bindViewClickEvent( 'push-pp-settings-launch-style-left-to-ppmatc', test.pushLaunchStyleLeftToPPMatc );
            _bindViewClickEvent( 'push-pp-settings-launch-style-right-to-ppmatc', test.pushLaunchStyleRightToPPMatc );
            _bindViewClickEvent( 'push-pp-settings-launch-style-normal-to-ppmatc', test.pushLaunchStyleNormalToPPMatc );
            _bindViewClickEvent( 'append-email-input-msg', test.appendEmailInputMsg );
            _bindViewClickEvent( 'append-email-input-msg-with-selected', test.appendEmailInputMsgWithSelected );
            
            // Initial code
            test.pushPPSettingsToPPMatc();
        }

        function _cssDebugContainer() {
            $( debugContainerId ).css( {
                'z-index': 12345678,
                position: 'absolute',
                top: 20,
                left: 20,
                padding: 5,
                border: '1px solid black',
                background: 'rgba(0, 0, 0, 0.38)'
            } );
        }

        function _cssDebugTextarea() {
            $( '#debug-area' ).css( {
                color: 'white',
                width: 600,
                height: 300,
                left: 200,
                'background-color': 'rgba(0, 0, 0, 0.17)'
            } );
        }

        function _buildInputViewHtml( cls, val ) {
            return '<input type="button" value="' + val + '" class="' + cls + '" /><br/>'
        }

        function _buildCheckoutViewHtml( cls, label ) {
            return '<label><input checked class="' + cls + '" type="checkbox">' + label + '</label><br/>';
        }

        function _bindViewClickEvent( cls, func ) {
            $( debugContainerId + ' .' + cls ).on( 'click', func );
        }
        
    } )();

    ///////// Test //////////
    function Test() {

        var debugArea = '#debug-area',
            dropDown = '.drop-down';

        return {
            onMessage: onMessage,
            onChattingMessage: onChattingMessage,
            onAudioMessage: onAudioMessage,
            onTextMessage: onTextMessage,
            onFileMessage: onFileMessage,
            onImgMessage: onImgMessage,
            onEmojiMessage: onEmojiMessage,
            
            onChattingTyping: onChattingTyping,
            sendMessage: sendMessage,
            conversationList: conversationList,
            userList: userList,
            userListInDropDown: userListInDropDown,
            monitor: monitorAll,

            debugCurrentConversationId: debugCurrentConversationId,
            consoleCurrentConversationMsgs: consoleCurrentConversationMsgs,

            simulateAndShowGroupMembersWithDiverseState: simulateAndShowGroupMembersWithDiverseState,
            addDuplicatePPComScripts: addDuplicatePPComScripts,
            simulateOneConversationAvaliable: simulateOneConversationAvaliable,
            checkCurrentMessagePanelMode: checkCurrentMessagePanelMode,
            snapshot: snapshot,

            pushPPSettingsToPPMatc: pushPPSettingsToPPMatc,
            pushEntUserToPPMatc: pushEntUserToPPMatc,
            pushTrackEventToPPMatc: pushTrackEventToPPMatc,

            pushLaunchStyleLeftToPPMatc: pushLaunchStyleLeftToPPMatc,
            pushLaunchStyleRightToPPMatc: pushLaunchStyleRightToPPMatc,
            pushLaunchStyleNormalToPPMatc: pushLaunchStyleNormalToPPMatc,

            appendEmailInputMsg: appendEmailInputMsg,
            appendEmailInputMsgWithSelected: appendEmailInputMsgWithSelected,

            clear: clear
        }

        /////// onNewMessageArrived ///////
        function monitorAll() {

            var $monitor = Service.$monitor,
                Event = $monitor.Event;
            
            $monitor.watch( Event.show, function( event, data ) {
                append( '[' + event + '] 会话 ' + data.uuid + ' 显示\n' );
            } );

            $monitor.watch( Event.hide, function( event, data ) {
                append( '[' + event + '] 会话 ' + data.uuid + ' 隐藏\n' );
            } );

            $monitor.watch( Event.resume, function( event, data ) {
                append( '[' + event + '] 会话 ' + data.uuid + ' onResume\n' );
            } );

            $monitor.watch( Event.watch, function( event, data ) {
                append( '[' + event + '] Watch Typing ' + data + '\n');
            } );

            $monitor.watch( Event.unwatch, function( event, data ) {
                append( '[' + event + '] UnWatch Typing ' + data + '\n');
            } );

            $monitor.watch( Event.typing, function( event, data ) {
                append( '[' + event + '] Typing ' + data + '\n');
            } );

        }
        
        function sendMessage() {

            var i = Math.floor( Math.random() * 2 );

            switch ( i ) {
            case 0:
                new Service.PPMessage.Builder('TEXT')
                    .textMessageBody( getTextMessage().bo )
                    .build().send();
                break;

            case 1:
                new Service.PPMessage.Builder('EMOJI')
                    .emojiMessageCode( getEmojiMessage().bo )
                    .build().send();
                break;
            }
            
        }
        
        function clear() {
            $( debugArea ).empty();
            $( dropDown ).find( 'option:first' ).attr( 'selected', true );
        }
        
        function debug( iterableObj ) {

            var content = '';
            $.each( iterableObj, function( index, item ) {

                // header
                content += index + '. ' + ( item.user_uuid || item.uuid ) + '\n\n';

                // body
                $.each( item, function( key, value ) {
                    content += key + ': ' + value + '\n';
                } );

                // footer
                content += '====================\n\n';
                
            } );

            $( debugArea ).text( $( debugArea ).text() + content );
        }

        function append( text ) {
            var old = $( debugArea ).text();
            $( debugArea ).text( old + text );
            
            scroll();
        }

        function scroll() {
            $( debugArea ).stop().animate({
                scrollTop: $( debugArea )[0].scrollHeight
            }, 600, 'swing');
        }

        function userListInDropDown() {
            resetDropDown();
            
            var users = userList();
            $.each( users, function( index, item ) {
                $( dropDown ).append('<option uuid="' + item.user_uuid + '">' + item.user_fullname + '</option>');
            } );

            $( dropDown ).on( 'change' , function( e ) {
                var userId = $( this ).children( 'option:selected' ).attr( 'uuid' );
                if ( userId ) {
                    
                    var old = Service.$users.getUser( userId ).getInfo(),
                        newer = $.extend( { user_uuid: userId }, getRandomUserInfo() );

                    Service.$users.updateUser( newer );
                    append( '\n用户' + userId + '信息变更为：\n' );
                    debug( [ newer ] );
                    
                }
            } );
            
        }

        function resetDropDown() {
            $( dropDown ).empty().append('<option>None</option>');
            $( dropDown ).off( 'change' );
        }
        
        function userList() {
            var all = Service.$users.getUsers(),
                users = [];

            $.each( all, function( key, value ) {
                users.push( value.getInfo() );
            } );

            debug( users );
            return users;
        }
        
        function conversationList() {
            var all = Service.$conversationManager.all();
            debug( all );
        }

        function debugCurrentConversationId() {
            append(
                '当前活跃会话 conversation_uuid: ' + 
                Service.$conversationManager.activeConversation().uuid );
        }

        function consoleCurrentConversationMsgs() {
            Service.$debug.h().d(
                Modal.$conversationContentGroup
                    .get( Service.$conversationManager.activeConversation().uuid )
                    .getMessages()
            );
        }

        function addDuplicatePPComScripts() {
            var head = document.getElementsByTagName('head')[0];
            var ppcom = document.createElement("script");
            ppcom.setAttribute('src', 'http://192.168.0.206:8080/ppcom/assets/pp-library.min.js');
            head.appendChild(ppcom);
        }

        function simulateAndShowGroupMembersWithDiverseState() {

            var users = Service.$users.getUsers(),
                fakeUsers = [];
                
            $.each( users, function( key, value ) {

                if ( Service.$user.quickId() !== key ) { // ignore current portal user

                    // random online state
                    var user = $.extend( {}, value.getInfo() );
                    user.is_browser_online = random( [ true, false ] );
                    user.is_mobile_online = random( [ true, false ] );
                    user.is_online = user.is_browser_online || user.is_mobile_online;
                    fakeUsers.push( user );
                    
                }
                
            } );

            debug( fakeUsers );
            
            View.$groupMembers._show( fakeUsers );
        }

        function simulateOneConversationAvaliable() {
            Service.$notification.onWebSocketMessage( {
                data: {
                    type: 'ACK',
                    device_uuid: Service.$tools.getUUID(),
                    "what": 'CONVERSATION',
                    "code": 0,
                    "extra": { conversation_uuid : '1bf95561-0c1e-11e6-bc7a-acbc327f19e9' },
                }
            } );
        }

        function checkCurrentMessagePanelMode() {
            append( 'Current MessagePanel Mode: ' + Ctrl.$conversationPanel.mode() + '\n' );
        }

        function snapshot() {
            var info = '';
            info += 'app route policy: ' + Service.$app.app().app_route_policy + '\n';
            info += 'is webSocket OK: ' + Service.$notification.isWsOk() + '\n';
            info += 'current mode: ' + Ctrl.$conversationPanel.mode() + '\n';
            append( info );
        }

        function pushPPSettingsToPPMatc() {
            window._ppmatc = window._ppmatc || [];
            window._ppmatc.push({
                pp_settings: {
                    app_uuid: APP_UUID,
                    language: 'zh-CN',
                    view: {
                        launch_style: {
                            mode: 'normal'
                        }
                    }
                }
            });
        }

        function pushEntUserToPPMatc() {
            window._ppmatc = window._ppmatc || [];
            window._ppmatc.push({
                ent_user: {
                    ent_user_name: 'Guijinding',
                    ent_user_id: '1234',
                    ent_user_createtime: 1483505560586
                }
            });
        }

        function pushTrackEventToPPMatc() {
            window._ppmatc = window._ppmatc || [];
            window._ppmatc.push({
                track_event: {
                    track_event_name: 'create_project',
                    track_event_data: {
                        project_name: 'HelloProject'
                    }
                }
            });
        }

        function pushLaunchStyleLeftToPPMatc() {
            window._ppmatc = window._ppmatc || [];
            window._ppmatc.push({
                pp_settings: {
                    app_uuid: APP_UUID,
                    view: {
                        launch_style: {
                            mode: 'custom',
                            position: 'left'
                        }
                    }
                }
            });
        }

        function pushLaunchStyleRightToPPMatc() {
            window._ppmatc = window._ppmatc || [];
            window._ppmatc.push({
                pp_settings: {
                    app_uuid: APP_UUID,
                    view: {
                        launch_style: {
                            mode: 'custom',
                            position: 'right'
                        }
                    }
                }
            });
        }

        function pushLaunchStyleNormalToPPMatc() {
            window._ppmatc = window._ppmatc || [];
            window._ppmatc.push({
                pp_settings: {
                    app_uuid: APP_UUID,
                    view: {
                        launch_style: {
                            mode: 'normal'
                        }
                    }
                }
            });
        }

        function appendEmailInputMsg() {
            var ci = Service.$conversationManager.activeConversation().uuid,
            message = new Service.PPMessage.Builder( Service.PPMessage.TYPE.SMS_EMAIL )
                .conversationId( ci )
                .userIcon( random( imgs() ) )
                .build();
            
            Service.$pubsub.publish('msgArrived/chat', message);
        }

        function appendEmailInputMsgWithSelected() {
            var ci = Service.$conversationManager.activeConversation().uuid,
            message = new Service.PPMessage.Builder( Service.PPMessage.TYPE.SMS_EMAIL )
                .conversationId( ci )
                .userIcon( random( imgs() ) )
                .smsEmailBody( {
                    selected_type: 'EMAIL',
                    contact: 'a@gmail.com'
                } )
                .build();
            
            Service.$pubsub.publish('msgArrived/chat', message);
        }
        
        function onChattingMessage() {
            onMessage( { chatting: true } );
        }

        function onChattingTyping() {
            var ci = Service.$conversationManager.activeConversation().uuid;
            Service.$notification.onWebSocketMessage( {
                data: {
                    type: 'TYPING'
                }
            } );
        }
        
        function onMessage( config ) {
            _onMessage( getRandomMessage(), config );
        }

        function onAudioMessage() {
            _onMessage( getAudioMessage(), { chatting: true } );
        }

        function onTextMessage() {
            _onMessage( getTextMessage(), { chatting: true } );
        }

        function onFileMessage() {
            _onMessage( getFileMessage(), { chatting: true } );
        }

        function onImgMessage() {
            _onMessage( getImageMessage(), { chatting: true } );
        }

        function onEmojiMessage() {
            _onMessage( getEmojiMessage(), { chatting: true } );
        }

        function _onMessage( message, config ) {
            Service.$notification.onWebSocketMessage( {
                data: {
                    type: 'MSG',
                    msg: {
                        pid: Service.$tools.getUUID(),
                        id: Service.$tools.getUUID(),
                        ts: Date.now() / 1000,
                        ci: getConversationId(),
                        fi: getFi(),
                        tt: 'S2P',
                        ft: 'DU',
                        ms: message.ms,
                        bo: message.bo,
                        is_quick_message: $( '.enable-quick-mode' ).is( ':checked' )
                    }
                }
            } );

            function getFi() {

                var all = Service.$users.getUsers(),
                    ids = [];
                $.each( all, function( key, value ) {
                    if ( key !== Service.$user.getUser().getInfo().user_uuid ) {
                        ids.push( key );    
                    }
                } );

                return ids[ Math.floor( Math.random() * ids.length ) ];
                
            }

            function getConversationId() {

                if ( config && config.chatting ) {
                    return Service.$conversationManager.activeConversation().uuid;
                }

                return randomConversationId();
                
                function randomConversationId() {

                    var all = Service.$conversationManager.all(),
                        ciArrays = [];
                    
                    $.each( all, function( index, item ) {
                        if ( item.type == Service.$conversationManager.TYPE.CONVERSATION ) {
                            ciArrays.push( item.uuid );
                        }
                    } );

                    return ciArrays[ Math.floor( Math.random() * ciArrays.length ) ];
                    
                }
                
            }
        }

        function getRandomMessage() {

            var messageTypeCount = 5,
                i = Math.floor( messageTypeCount * Math.random() );

            switch ( i ) {
            case 0:
                return getTextMessage();

            case 1:
                return getEmojiMessage();

            case 2:
                return getImageMessage();

            case 3:
                return getFileMessage();

            case 4:
                return getAudioMessage();
            }
            
        }

        function getImageMessage() {

            var imgUrl = random( imgs() );
            
            return {
                ms: 'IMAGE',
                bo: Service.$json.stringify({
                    orig: imgUrl
                })
            }
        }

        function getTextMessage() {
            var texts = ['A', 'B', 'C', 'D', 'E', 'F', 'G',
                         "A shout out to developers of SourceTree - a nice GUI for git and hg. Useful even for a command-line fan like me. ",
                         "In a keypress event, the Unicode value of the key pressed is stored in either the keyCode or charCode property, never both. If the key pressed generates a character (e.g. 'a'), charCode is set to the code of that character, respecting the letter case. (i.e. charCode takes into account whether the shift key is held down). Otherwise, the code of the pressed key is stored in keyCode.",
                         "This feature is non-standard and is not on a standards track. Do not use it on production sites facing the Web: it will not work for every user. There may also be large incompatibilities between implementations and the behavior may change in the future."
                        ],
                text = texts [ Math.floor( Math.random() * texts.length ) ];
            
            return {
                ms: 'TEXT',
                bo: text
            }
        }

        function getEmojiMessage() {
            var emojiArray = Service.$emoji.getEmojiGroup( [
                'People', 'Nature', 'Objects',
                'Places', 'Symbols'
            ][ Math.floor( Math.random() * 5 ) ] );

            var keys = [];
            $.each( emojiArray, function( key, value ) {
                keys.push( key );
            } );

            var emoji = emojiArray[ keys [ Math.floor( Math.random() * keys.length ) ] ].value;

            return {
                ms: 'TEXT',
                bo: emoji
            };
        }

        function getFileMessage() {
            
            var name = random( [ '文件-1', '文件-2', 'File-3' ] ),
                fid = Service.$tools.getUUID();

            return {
                ms: 'FILE',
                bo: Service.$json.stringify( {
                    name: name,
                    fid: fid
                } )
            }
            
        }

        function getAudioMessage() {
            
            var mp3 = [ { fid: 'http://192.168.0.212:8001/assets/congcong_wangfei.mp3',
                           dura: 241
                         },
                         { fid: 'http://192.168.0.212:8001/assets/congcong_wangfei_10.mp3',
                           dura: 6
                         },
                         { fid: 'http://192.168.0.212:8001/assets/zhiqingchun_wangfei.mp3',
                           dura: 193
                         } ] [ Math.floor( Math.random() * 3 ) ];

            return {
                ms: 'AUDIO',
                bo: Service.$json.stringify( {
                    mp3: mp3               
                } )
            }
            
        }

        function getRandomUserInfo() {
            return {
                user_fullname: [ '小明', '小红', '小芳' ][ Math.floor( Math.random() * 3 ) ],
                user_avatar: imgs() [ Math.floor( Math.random() * imgs().length ) ],
                is_online: [ true, false ][ Math.floor( Math.random() * 2 ) ]
            }
        }

        function random( array ) {
            return array [ Math.floor( Math.random() * array.length ) ];
        }

        function imgs() {
            return [
                'http://imglf0.nosdn.127.net/img/SENKQXkvaU1MYkgyMG5UWEVuRmExWWUrQ2ViaFBuUU9OTXFmR2Zsdk1EZDJmK1pBSkUzaktRPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg',
                'http://imglf0.nosdn.127.net/img/VjgyYVlpdUNvODNHblNyL2RRVFJlZzdGcDBrbXE3cmpPVFpLb3pvQlFnMFdNWnJwaG1NdTl3PT0.2?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg',
                'http://imglf1.nosdn.127.net/img/ZGc5YVQwZGxjLzlOaDlVNlNMSFVSc1JXQjJMN3JBLzVZVHh0K1NRVy9OaS8xcnBYc29CbGNnPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg',
                'http://imglf.nosdn.127.net/img/aFdKY3Iydi82VUFLZXVmaDNvTkRFMjgxZStZZlMrUEcyeUQ5THlIWUI3YkxIMFpqNXpzcnRRPT0.jpg?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg%7Cwatermark&type=2&text=wqkgam95bW9jaGEgLyBqb3ltb2NoYS5sb2Z0ZXIuY29t&font=bXN5aA==&gravity=southwest&dissolve=30&fontsize=240&dx=8&dy=10&stripmeta=0',
                'http://imglf0.nosdn.127.net/img/VjgyYVlpdUNvODJ4RTlPb0pBVzgvWjQvS0FDRGVjbmRmUm1tQTFIbFg0TE4rWW4wVitYSGV3PT0.2?imageView&thumbnail=500x0&quality=96&stripmeta=0&type=jpg'
            ];
        }
        
    }
    
} )();
