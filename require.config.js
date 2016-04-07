/**
 * Created by lilia.hristova on 29.3.2016 ã..
 */
'use strict';
require.config({
    baseUrl: '.',
    waitSeconds: 0,
    paths: {
        text: 'js/requirejs/text',
        //region Libs
        angular: 'js/angular/angular',
        angularRoute: 'js/angular/angular-route',
        ngTouch: 'js/angular/angular-touch',
        ngCookies: 'js/angular/angular-cookies',
        //angularBootstrap: 'js/angular/ui-bootstrap',
        //angularBootstrapTpls: 'js/angular/ui-bootstrap-tpls',
        //jQuery have to be loaded only if necessary
        jquery: 'js/jquery/jquery-1.12.2.min',
        jqueryMobile: 'js/jquery/jquery.mobile-1.4.5',
        flexslider: 'js/jquery.flexslider-min',
        //endregion

        //region Photoswipe
        pwKlass: 'js/photoswipe/klass.min',
        pwJQuery: 'js/photoswipe/code.photoswipe.jquery-3.0.5.min',
        //endregion

        //region Other libs
        less: 'js/less-1.1.4',
        modernizr: 'js/modernizr-2.6.2',
        iscroll: 'js/iscroll',
        mobileDetect: 'js/MobileDetect',
        plugins: 'js/plugins',
        script: 'js/script',
        //endregion

        //region Core dependencies
        app: 'app'
        //endregion
    },
    shim: {
        angular: { 'exports': 'angular' },
        jquery: {'exports': 'jquery'},
        angularRoute: {
            deps: ['angular'],
            'export': 'angularRoute'
        },
        ngTouch: {
            deps: ['angular'],
            'export': 'ngTouch'
        },
        ngCookies: {
            deps: ['angular'],
            'export': 'ngCookies'
        },
        //angularBootstrap: {
        //    deps: ['angular'],
        //    'export': 'angularBootstrap'
        //},
        //angularBootstrapTpls: {
        //    deps: ['angular'],
        //    'export': 'angularBootstrapTpls'
        //},
        jqueryMobile: {
            deps: ['jquery'],
            'export': 'jqueryMobile'
        },
        flexslider: {
            deps: ['jquery'],
            'export': 'flexslider'
        },
        pwJQuery: {
            deps: ['pwKlass', 'jquery'],
            'export': 'pwJQuery'
        },
        script: {
            deps: ['angular'],
            'export': 'script'
        }

    },
    priority: [
        "angular"
    ]
});

window.name = "NG_DEFER_BOOTSTRAP!";

//initial dependency injections
require([
    'angular',
    'jquery',
    'angularRoute',
    'ngTouch',
    //'angularBootstrapTpls',
    'ngCookies',    
    'jqueryMobile',
    'pwKlass',
    'pwJQuery',
    'less',
    'modernizr',
    'iscroll',
    'mobileDetect',
    'plugins',
    'script',
    'app',
], function (angular) {
    //this is called when all those javascripts has finished loading
    require(['app'], function (app) {
        angular.element().ready(function () {            
            angular.resumeBootstrap([app.name]);            
        });
    });
});