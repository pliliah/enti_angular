
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
             .when('/shop/:category', {
                 templateUrl: 'views/shopDetails.html',
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
            .when('/history', {
                templateUrl: 'views/history.html',
                controller: 'HistoryController'
            })
            .when('/links', {
                 templateUrl: 'views/links.html',
                 controller: 'LinksController'
             })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutController'
            })

            .when('/growth/care', {
                templateUrl: 'views/info/care.html',
                controller: 'GrowthController'
            })
            .when('/growth/cutting', {
                templateUrl: 'views/info/cutting.html',
                controller: 'GrowthController'
            })
            .when('/growth/fertilization', {
                templateUrl: 'views/info/fertilization.html',
                controller: 'GrowthController'
            })
            .when('/growth/place', {
                templateUrl: 'views/info/place.html',
                controller: 'GrowthController'
            })
            .when('/growth/potting', {
                templateUrl: 'views/info/potting.html',
                controller: 'GrowthController'
            })
            .when('/growth/soil', {
                templateUrl: 'views/info/soil.html',
                controller: 'GrowthController'
            })
            .when('/growth/technologies', {
                templateUrl: 'views/info/technologies.html',
                controller: 'GrowthController'
            })

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }])
    .run(['$location', '$rootScope',
        function ($location, $rootScope) {

            //if($.mobile){
            //    $.mobile.defaultPageTransition = 'none';
            //    $.mobile.ignoreContentEnabled = true;
            //    $.mobile.page.prototype.options.domCache = false;
            //    $.mobile.ajaxEnabled = false;
            //}
            //else {
            //    $(window).on("mobileinit", function () {
            //        $.mobile.defaultPageTransition = 'none';
            //        $.mobile.ignoreContentEnabled = true;
            //        $.mobile.page.prototype.options.domCache = false;
            //        $.mobile.ajaxEnabled = false;
            //    });
            //}      
            
        }]);

    return module;
});
