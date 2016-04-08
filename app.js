
define([
    //'text!app.config.json!strip',
    'angular',
    'jquery',
    'modules/controllers'
],
function (angular, jQuery) {
    var module = angular.module('enti', [
        'ngRoute',
        'enti.controllers'
    ])
    .config(['$httpProvider', '$routeProvider', '$provide', function ($httpProvider, $routeProvider, $provide) {
        //here we set the routing for the SPA
        $routeProvider.when('/', {
            templateUrl: 'views/navigation.html',
            controller: 'NavigationController'
        })
        .otherwise({ redirectTo: '/' });
        
        //$routeProvider;
    }])
    .run(['$location', '$rootScope',
        function ($location, $rootScope) {
            //$rootScope.isLogged = cantorService.services.isLoginCookiePresent();

            //
            //$rootScope.dateFormat = 'MM/dd/yy HH:mm:ss';
            if($.mobile){
                $.mobile.defaultPageTransition = 'fade';
                $.mobile.ignoreContentEnabled = true;
                $.mobile.page.prototype.options.domCache = false;
                $.mobile.ajaxEnabled = false;
            }
            else {
                $(window).on("mobileinit", function () {
                    $.mobile.defaultPageTransition = 'fade';
                    $.mobile.ignoreContentEnabled = true;
                    $.mobile.page.prototype.options.domCache = false;

                    //$.mobile.ajaxEnabled = false;
                });
            }           
        }]);

    return module;
});
