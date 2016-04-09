
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
    .config(['$httpProvider', '$routeProvider', '$locationProvider', function ($httpProvider, $routeProvider, $locationProvider) {
        //here we set the routing for the SPA
        $routeProvider
            .when('/', {
                templateUrl: 'views/navigation.html',
                controller: 'NavigationController'
            })
             .when('/videos', {
                templateUrl: 'views/videos.html',
                controller: 'VideosController'
            })
            .when('/gallery', {
                templateUrl: 'views/gallery.html',
                controller: 'GalleryController'
            })
            .when('/growth', {
                templateUrl: 'views/growth.html',
                controller: 'GrowthController'
            })
            .when('/shop', {
                templateUrl: 'views/shop.html',
                controller: 'ShopController'
            })
            .when('/cart', {
                templateUrl: 'views/cart.html',
                controller: 'CartController'
            })
            .when('/contact', {
                templateUrl: 'views/contact.html',
                controller: 'ContactController'
            })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }])
    .run(['$location', '$rootScope',
        function ($location, $rootScope) {

            //if($.mobile){
            //    $.mobile.defaultPageTransition = 'fade';
            //    $.mobile.ignoreContentEnabled = true;
            //    $.mobile.page.prototype.options.domCache = false;
            //    $.mobile.ajaxEnabled = false;
            //}
            //else {
            //    $(window).on("mobileinit", function () {
            //        $.mobile.defaultPageTransition = 'fade';
            //        $.mobile.ignoreContentEnabled = true;
            //        $.mobile.page.prototype.options.domCache = false;

            //        //$.mobile.ajaxEnabled = false;
            //    });
            //}           
        }]);

    return module;
});
