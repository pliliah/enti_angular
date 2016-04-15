define([
    'angular',
    'js/photoswipe/photoswipe.min',
    'js/photoswipe/photoswipe-ui-default.min',
    'js/photoswipe/angular-photoswipe'
    //'text!widgets/traderoom/traderoomWidget.html!strip'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.controllers', ['ngPhotoswipe']);
    
    module.controller('NavigationController', ['$scope', function ($scope) {

        $scope.load = function () {
            $(document).trigger('pagechange');
        }

        $scope.load();
    }]);

    module.controller('VideosController', ['$scope', function ($scope) {
       
    }]);

    module.controller('GalleryController', ['$scope', function ($scope) {
        //these are the images from the gallery
        $scope.slides = [];
        for (var i = 1; i < 16; i++) {
            $scope.slides.push({
                src: 'img/gallery/' + i + '.jpg',
                safeSrc: 'img/gallery/' + i + '.jpg',
                thumb: 'img/gallery/' + i + '.jpg',
                caption: 'Lorem Ipsum Dolor',
                size: '500x500',
                type: 'image'
            });
        }
    }]);

    module.controller('GrowthController', ['$scope', function ($scope) {

    }]);

    module.controller('ShopController', ['$scope', function ($scope) {

    }]);

    module.controller('CartController', ['$scope', function ($scope) {

    }]);

    module.controller('ContactController', ['$scope', function ($scope) {

    }]);

    return module;
});