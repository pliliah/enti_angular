define([
    'angular',
    'modules/services'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.panel.controllers', []);    

    module.controller('AdminController', ['$scope', function ($scope) {

    }]);

    module.controller('ItemsController', ['$scope', 'shopService', function ($scope, shopService) {
        $scope.categories = shopService.categories;
        $scope.categoryItems = shopService.shoppingItems;
        $scope.selectedCategory = null;
        $scope.selectedItem = {}
        
        $scope.GetItemsForCategory = function () {
            shopService.GetCategoryItems($scope.selectedCategory);
        }

        //triggered when we change the page to update selected item
        $scope.$on('$routeChangeSuccess', function (next, current) {
            if (current.params.id) {
                var item = {};
                for (var inx = 0; inx < $scope.categoryItems.items.length; inx++) {
                    item = $scope.categoryItems.items[inx];
                    if (item.id == current.params.id) {
                        $scope.selectedItem = item;
                        break;
                    }
                }               
                $scope.selectedCategory = $scope.categoryItems.category;               
            }
            else {
                $scope.selectedItem = {};
                $scope.selectedCategory = $scope.categoryItems.category;
            }
        });

        $scope.Update = function (item) {
            shopService.UpdateCategoryItem(item);
        }
    }]);

    module.controller('ItemDetailsController', ['$scope', '$routeParams', function ($scope, $routeParams) {
        var itemId = $routeParams.id;
    }]);

    module.controller('NewItemController', ['$scope', '$routeParams', 'shopService', function ($scope, $routeParams, shopService) {
        $scope.category = $routeParams.categoryName;
        $scope.newItem = {
            title: '',
            description: '',
            price: '',
            discount: '',
            src: '',
            quantity: '',
            categoryId: $routeParams.categoryId
        };

        $scope.Submit = function (newItem) {
            shopService.InsertCategoryItem(newItem);
        }
    }]);

    return module;
});