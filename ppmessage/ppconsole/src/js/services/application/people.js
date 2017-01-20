//// this is data service for `ApplicationPeopleCtrl` ///////
(function() {

    yvAppPeopleService.$inject = [ 'yvAjax', 'yvUser', 'yvDebug' ];
    function yvAppPeopleService( yvAjax, yvUser, yvDebug ) {

        var DEFAULT_PAGE_COUNT = 12, jQuery = $;
        
        ////// Api //////////

        return {
            getAppServiceUsers: getAppServiceUsers,
            getAppServiceUsersWithPagination: getAppServiceUsersWithPagination,
            createServiceUser: createServiceUser
        }

        ////// Implementation //////////

        function getAppServiceUsers(successCallback, errorCallback) {
            
            yvAjax.get_service_user_list().then(function( response ) {
                if (response.data && response.data.error_code == 0) {
                    onSuccess(response.data);
                } else {
                    onError(response);
                }
            }, function(e) {
                onError(e);
            });
            
            function onSuccess( data ) {
                var appTeamServiceUsers = data.list || [];
                successCallback && successCallback( appTeamServiceUsers );
            }

            function onError( e ) {
                errorCallback && errorCallback( [] );
            }
            
        }

        // @description
        //     - filter by user_fullname or user_email
        //     - support pagination ( in front-end )
        //     - support sort by `updatetime`
        //
        // @param settings
        // {
        //     length: `count of each page`, default is 12
        //     start_page: 0 ~ +Infinity
        //     
        //     filter_keyword: `your keyword`, default is ''
        //     sort: `true/false`, default is `true`, sort by `updatetime` in Desending order
        // }
        //
        // @return
        // {
        //     users: [ userA, userB, ... ], // current page users
        //     total: totalNumber // total user's count after filtered
        // }
        function getAppServiceUsersWithPagination( settings, successCallback, errorCallback ) {
            getAppServiceUsers( function( users ) {
                
                // `angular.extend(dst, src);`
                // @see http://docs.angularjs.cn/api/ng/function/angular.extend
                var s = angular.extend( { filter_keyword: '', length: DEFAULT_PAGE_COUNT, start_page: 0, sort: true }, settings ),
                    filteredUsers = filter( s, users ),
                    total = filteredUsers.length,
                    paginationUsers = pagination( s, sort( s, filteredUsers ) );
                
                if (successCallback) {
                    successCallback({
                        users: paginationUsers,
                        total: total
                    });
                }   
            }, function( e ) {
                errorCallback && errorCallback(e);
            });
        }

        function createServiceUser( settings, successCallback, errorCallback ) {
            yvAjax.create_user( settings ).then( successCallback, errorCallback );
        }

        function filter( settings, users ) {
            
            if ( settings.filter_keyword === '' ) {
                return users || [];
            }

            var keyword = settings.filter_keyword,
                regex = new RegExp( '.*' + keyword + '.*', 'g' ),
                result = [];
            
            angular.forEach( users, function( value, index ) {
                if ( regex.test( value.user_email ) || regex.test( value.user_fullname ) ) {
                    result.push( value );
                }
            } );

            return result;
        }

        function pagination( settings, users ) {
            var pageCount = settings.length,
                pageNum = settings.start_page,
                len = users.length,
                startIndex = pageNum * pageCount,
                endIndex = startIndex + pageCount,
                i = startIndex,
                result = [];

            var user;
            while ( ( user = users [ i++ ] ) !== undefined && i <= endIndex ) {
                result.push( user );
            }
            return result;            
        }

        function sort( settings, users ) {
            if ( !settings.sort ) return users;
            return users.sort( compare );
            function compare( a, b ) {
                return a.updatetime > b.updatetime ? -1 : 1;
            }
        }
    }

    angular.module("this_app.services").factory("yvAppPeopleService", yvAppPeopleService);

} )();
