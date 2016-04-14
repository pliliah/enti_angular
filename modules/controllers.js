define([
    'angular',
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
        $scope.opts = {
            index: 0
        };

        //these are the images from the gallery
        $scope.slides = [];
        for (var i = 1; i < 16; i++) {
            $scope.slides.push({
                src: 'img/gallery/' + i + '.jpg',
                w: 500, h: 500
            });
        }

        $scope.showGallery = function (i) {
            if (angular.isDefined(i)) {
                $scope.opts.index = i;
            }
            $scope.open = true;
        };

        $scope.closeGallery = function () {
            $scope.open = false;
        };
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