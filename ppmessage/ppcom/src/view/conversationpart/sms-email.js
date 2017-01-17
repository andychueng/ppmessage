View.$smsEmail = (function() {

    var classPrefix = 'msg-sms-email-'
        iconBack = Configuration.assets_path + 'img/icon-back.png',
        iconFlags = Configuration.assets_path + 'img/icon-flags.png',
        iconFlagsElStyle = 'background-image:url(' + iconFlags + ')',
        clsFlag = '#pp-container .pp-flag',
        DEFAULT_FLAG = 'cn',

        activeOption = 'EMAIL',
        timeoutHideError = function() {
            $timeout( function() {
                $( '.' + classPrefix + 'error' ).text( '' );                
            }, 2000 );
        },
        clearContext = function() {
            $( '.' + classPrefix + 'options-container a' ).removeClass( classPrefix + 'options-container-active' );
            $( '.' + classPrefix + 'input input' ).focus().val( '' );
        },
        optionEmailElementClick = function() {
            $( clsFlag ).hide();
            clearContext();
            $( this ).addClass( classPrefix + 'options-container-active' );
            activeOption = 'EMAIL';
            $( '.' + classPrefix + 'input input' )
                .attr( { type: 'email', placeholder: 'email@domain.com' } )
                .css( { padding: '0 12px' } );
        },
        optionSmsElementClick = function() {
            $( clsFlag ).show();
            clearContext();
            $( this ).addClass( classPrefix + 'options-container-active' );
            activeOption = 'SMS';
            $( '.' + classPrefix + 'input input' )
                .attr( { type: 'text', placeholder: '+' + Service.$flags.query( DEFAULT_FLAG ).dialCode + ' 123 456 7890' } )
                .css( { padding: '0 12px 0 32px' } );
        },
        submitBtnClick = function() {
            var val = $( '.' + classPrefix + 'input input' ).val();
            if (activeOption === 'EMAIL') {
                if ( !Service.$tools.validateEmail( val ) ) {
                    $( '.' + classPrefix + 'error' )
                        .text( Service.Constants.i18n( 'EMAIL_ADDRESS_DOESNT_LOOK_QUITE_RIGHT' ) );
                    timeoutHideError();
                } else {
                    _submit( val );
                }
            } else if (activeOption === 'SMS') {
                if ( !Service.$tools.validatePhoneNumber( val ) ) {
                    $( '.' + classPrefix + 'error' )
                        .text( Service.Constants.i18n( 'NUMBER_MISSING_A_FEW_DIGITS' ) );
                    timeoutHideError();
                } else {
                    _submit( activeOption, val );
                }
            }

            function _submit( optionType, val ) {
                var $input = $( '.' + classPrefix + 'input input' ),
                    $submitBtn = $( '.' + classPrefix + 'submit-button' );

                $input.prop( 'disabled', true );
                $submitBtn.prop( 'disabled', true );
                Ctrl.$smsEmail.submit( val, function( ok ) {
                    if ( ok ) {
                        onContactSelected( activeOption );
                    } else {
                        $input.prop( 'disabled', false );
                        $submitBtn.prop( 'disabled', false );
                    }
                } );
            }
        },

        onContactSelected = function( activeOption, contact ) {
            if (activeOption === 'EMAIL') {
                $( '.' + classPrefix + 'options-container a:eq(1)' ).hide();
            } else {
                $( '.' + classPrefix + 'options-container a:eq(0)' ).hide();
                $( clsFlag ).hide();
                $( '.' + classPrefix + 'input input' )
                    .css( { padding: '0 12px' } );
            }

            var $input = $( '.' + classPrefix + 'input input' ),
                $submitBtn = $( '.' + classPrefix + 'submit-button' );

            $input.prop( 'disabled', true );
            $submitBtn.prop( 'disabled', true );
            $input.val( contact );

            $( '.' + classPrefix + 'submit-container' ).hide();
            $( '.' + classPrefix + 'options-container a' ).prop( 'disabled', true );
            $( '.' + classPrefix + 'title' ).text( Service.Constants.i18n( 'YOULL_BE_NOTIFIED' ) );
            $( '.' + classPrefix + 'error' ).hide();
            $input.addClass( classPrefix + 'input-success' ).prop( 'disabled', true );
            $( '.' + classPrefix + 'options-container a' ).unbind( 'click' );
        };

    function SmsEmail( item ) {
        View.Div.call( this, { className: classPrefix + 'container' } );

        this.add( new View.Img( { className: 'pp-conversation-part-msg-by-admin-avatar', src: item.user.avatar } ) )
            .add( new View.Div( { className: 'pp-conversation-part-msg-by-admin-body-container' } )
                  .add( new View.Div( { className: classPrefix + 'admin' } )
                        .add( new View.P( classPrefix + 'title' ).text( Service.Constants.i18n( 'GET_NOTIFIED' ) ) )
                        .add( new View.Div( classPrefix + 'options-container' )
                              .add( new View.Element( 'a', { className: classPrefix + 'options-container-active',
                                                             selector: '.' + classPrefix + 'options-container a:eq(0)', 
                                                             event: { click: optionEmailElementClick }  
                                                           } ).text( Service.Constants.i18n( 'EMAIL' ) ) )
                              .add( new View.Element( 'a', { selector: '.' + classPrefix + 'options-container a:eq(1)', 
                                                             event: { click: optionSmsElementClick }  
                                                           } ).text( Service.Constants.i18n( 'SMS' ) ) ) )
                        .add( new View.Div( classPrefix + 'input-container' )
                              .add( new View.Div( classPrefix + 'input' )
                                    .add( new View.Div( { className: 'pp-flag ' + DEFAULT_FLAG, style: iconFlagsElStyle } ) )
                                    .add( new View.Element( 'input', { selector: '.' + classPrefix + 'input input',
                                                                       event: {
                                                                           init: function() { $( this ).focus(); }
                                                                       },
                                                                       type: 'email', 
                                                                       placeholder: 'email@domain.com', 
                                                                       autocomplete: 'off' } ) ) )
                              .add( new View.Div( classPrefix + 'submit-container' )
                                    .add( new View.Div( { className: classPrefix + 'submit-button', 
                                                          selector: '.' + classPrefix + 'submit-button',
                                                          event: { click: submitBtnClick } } )
                                          .add( new View.Div( {className: classPrefix + 'submit-icon', style: 'background-image:url(' + iconBack  + ')' } ) )
                                          .add( new View.Div( classPrefix + 'valid-icon' ) ) ) ))
                        .add( new View.P( classPrefix + 'error' ) ) ) );

        $timeout( function() {
            var smsEmailBody = item.message.smsEmail;
            if ( smsEmailBody.selected_type !== undefined && 
                 smsEmailBody.contact !== undefined ) {
                onContactSelected( smsEmailBody.selected_type, smsEmailBody.contact );
            }
        } );
    }
    extend (SmsEmail, View.Div);
    
    return {
        build: build
    }

    function build( item ) {
        return new SmsEmail( item );
    }

}());
