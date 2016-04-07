
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
    .config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
        //here we set the routing for the SPA
        //$routeProvider.when('/Traderoom', {
        //    templateUrl: 'views/traderoom/traderoom.html',
        //    controller: 'TraderoomViewCtrl'
        //});
        //
        //$routeProvider.otherwise({ redirectTo: '/Login' });
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

            $(document).trigger('pagechange');
        }]);

    return module;
});
