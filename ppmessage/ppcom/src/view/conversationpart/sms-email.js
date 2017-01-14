View.$smsEmail = (function() {

    var classPrefix = 'msg-sms-email-'
        iconBack = Configuration.assets_path + 'img/icon-back.png',

        activeOption = 'EMAIL',
        clearContext = function() {
            $( '.' + classPrefix + 'options-container a' ).removeClass( classPrefix + 'options-container-active' );
            $( '.' + classPrefix + 'input input' ).focus().val( '' );
        },
        optionEmailElementClick = function() {
            clearContext();
            $( this ).addClass( classPrefix + 'options-container-active' );
            activeOption = 'EMAIL';
            $( '.' + classPrefix + 'input input' ).attr( { type: 'email', placeholder: 'email@domain.com' } );
        },
        optionSmsElementClick = function() {
            clearContext();
            $( this ).addClass( classPrefix + 'options-container-active' );
            activeOption = 'SMS';
            $( '.' + classPrefix + 'input input' ).attr( { type: 'text', placeholder: '+86 123 456 7890' } );
        },
        submitBtnClick = function() {
            var val = $( '.' + classPrefix + 'input input' ).val();
            if (activeOption === 'EMAIL') {
                if ( val === '' ) {
                    $( '.' + classPrefix + 'error' )
                        .text( "This email doesn't look quite right" )
                } else {
                    _submit( val );
                }
            } else if (activeOption === 'SMS') {
                if ( val === '' ) {
                    $( '.' + classPrefix + 'error' )
                        .text( "This number is missing a few digits" );
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
            }

            var $input = $( '.' + classPrefix + 'input input' ),
                $submitBtn = $( '.' + classPrefix + 'submit-button' );

            $input.prop( 'disabled', true );
            $submitBtn.prop( 'disabled', true );
            $input.val( contact );

            $( '.' + classPrefix + 'submit-container' ).hide();
            $( '.' + classPrefix + 'options-container a' ).prop( 'disabled', true );
            $( '.' + classPrefix + 'title' ).text( "You'll be notified here and by" );
            $( '.' + classPrefix + 'error' ).hide();
            $input.addClass( classPrefix + 'input-success' ).prop( 'disabled', true );
            $( '.' + classPrefix + 'options-container a' ).unbind( 'click' );
        };

    function SmsEmail( item ) {
        View.Div.call( this, { className: classPrefix + 'container' } );

        this.add( new View.Img( { className: 'pp-conversation-part-msg-by-admin-avatar', src: item.user.avatar } ) )
            .add( new View.Div( { className: 'pp-conversation-part-msg-by-admin-body-container' } )
                  .add( new View.Div( { className: classPrefix + 'admin' } )
                        .add( new View.P( classPrefix + 'title' ).text( 'Get notified' ) )
                        .add( new View.Div( classPrefix + 'options-container' )
                              .add( new View.Element( 'a', { className: classPrefix + 'options-container-active',
                                                             selector: '.' + classPrefix + 'options-container a:eq(0)', 
                                                             event: { click: optionEmailElementClick }  
                                                           } ).text( 'Email' ) )
                              .add( new View.Element( 'a', { selector: '.' + classPrefix + 'options-container a:eq(1)', 
                                                             event: { click: optionSmsElementClick }  
                                                           } ).text( 'SMS' ) ) )
                        .add( new View.Div( classPrefix + 'input-container' )
                              .add( new View.Div( classPrefix + 'input' )
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
