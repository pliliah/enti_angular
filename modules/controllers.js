define([
    'angular',
    //'text!widgets/traderoom/traderoomWidget.html!strip'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.controllers', []);
    
    module.controller('NavigationController', ['$scope', function ($scope) {

        $scope.load = function () {
            $(document).trigger('pagechange');
        }

        $scope.load();
    }]);

    module.controller('VideosController', ['$scope', function ($scope) {

    }]);

    return module;
});