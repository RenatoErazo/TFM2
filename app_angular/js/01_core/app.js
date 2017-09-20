(function() {

    var app = angular.module('LoginApp', [
        'ngRoute',
        'ngStorage',
        'login.controllers',
        'login.directives',
        'login.services',
        'app.filters',
        'app.directives',
        'ui.router',
        'angular.filter',
        'angular-carousel',
        'ngAnimate'

    ]);

    app.constant("glbConst", {
        "url": "/talento_api/index.php/"
    });

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

            $stateProvider
            // Index will decide if redirects to Login or Dashboard view
                .state("login", {
                url: '/login',
                templateUrl: 'index.html',
                controller: 'LogeoController'

            });
        }])
        .run(function($rootScope, $location) {
            $rootScope.$on("$routeChangeStart", function(event, next, current) {

                if ($rootScope.loggedInUser == null) {

                    // no logged user, redirect to /login
                    if (next.templateUrl === "partials/login.html") {} else {
                        //$location.path('')
                    }
                }
            });
        });


})();