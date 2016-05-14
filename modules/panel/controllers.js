define([
    'angular',
    'modules/services',
    'text!modules/templates/successModal.html!strip'
], function (angular, services) {
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

        $scope.Delete = function (item) {
            shopService.DeleteShoppingItem(item);
        }
    }]);

    module.controller('ItemDetailsController', ['$scope', '$routeParams', function ($scope, $routeParams) {
        var itemId = $routeParams.id;
    }]);

    module.controller('NewItemController', ['$scope', '$routeParams', 'shopService',  '$uibModal', function ($scope, $routeParams, shopService,  $uibModal) {
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
            shopService.InsertCategoryItem(newItem)
            .then(function (response) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'modules/templates/successModal.html',
                    controller: 'ModalController',
                    size: 'sm', //'lg' and by default none
                    resolve: {
                        message: function () {
                            return 'Артикул добавен успешно';
                        },
                        path: function () {
                            return '/admin/items';
                        }
                    }
                });
            });;
        }       

    }]);

    module.controller('ModalController', ['$scope', '$location', '$uibModalInstance', 'message', 'path', function ($scope, $location, $uibModalInstance, message, path) {
        $scope.message = message;

        $scope.ok = function () {
            $uibModalInstance.close();
            $location.path(path);
        };
    }]);

    return module;
});