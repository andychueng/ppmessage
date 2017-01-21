angular.module("this_app.route", [])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state("app", {
                abstract: true,
                url: "/app",
                templateUrl: "templates/app.html",
                controller: "AppCtrl"
            })

            .state("app.config", {
                url: "/config",
                templateUrl: "templates/config.html",
                controller: "ConfigCtrl"
            })

        ;
      
        $urlRouterProvider.otherwise("/app/config");

    });
