define([
    'angular',
    //'text!widgets/traderoom/traderoomWidget.html!strip'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.controllers', [])
      
    .controller('NavigationController', ['$scope', function ($scope) {
        $scope.now = new Date();
    }]);

    return module;
});