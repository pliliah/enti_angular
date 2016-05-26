define([
    'angular',
    'modules/services',
    'text!modules/templates/successModal.html!strip'
    //'uiGrid'
], function (angular, services) {
    var module = angular.module('enti.panel.controllers', []);    

    module.controller('AdminController', ['$scope', function ($scope) {

    }]);

    module.controller('ItemsController', ['$scope', 'shopService', '$uibModal', 'config',
        function ($scope, shopService, $uibModal, config) {
        $scope.categories = shopService.categories;
        $scope.categoryItems = shopService.shoppingItems;
        $scope.selectedCategory = null;
        $scope.selectedItem = {};
        $scope.imagesFolter = config.shoppingItemGallery;
        
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
                if ($scope.selectedCategory.id) {
                    //get items again if there is selected category
                    shopService.GetCategoryItems($scope.selectedCategory);
                }
            }
        });

        $scope.Update = function (item) {
            shopService.UpdateCategoryItem(item)
            .then(function (response) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'modules/templates/successModal.html',
                    controller: 'ModalController',
                    size: 'sm', //'lg' and by default none
                    resolve: {
                        message: function () {
                            return 'Артикул "' + item.title + '" е редактиран успешно!';
                        },
                        path: function () {
                            return '/admin/items';
                        }
                    }
                });
            });
        }

        $scope.Delete = function (item) {
            shopService.DeleteShoppingItem(item)
                .then(function (response) {                   
                    var modalInstance = $uibModal.open({
                        templateUrl: 'modules/templates/successModal.html',
                        controller: 'ModalController',
                        size: 'sm', //'lg' and by default none
                        resolve: {
                            message: function () {
                                return 'Артикул "' + item.title + '" е изтрит успешно!';
                            },
                            path: function () {
                                return '/admin/items';
                            }
                        }
                    });
            });
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
                            return 'Артикул "' + newItem.title + '" е добавен успешно!';
                        },
                        path: function () {
                            return '/admin/items';
                        }
                    }
                });
            });;
        }       

    }]);

    module.controller('OrdersController', ['$scope', 'ordersService', '$uibModal', 'config', '$rootScope',
        function ($scope, ordersService, $uibModal, config, $rootScope) {
            $scope.orders = [];
            ordersService.GetOrders();
            $scope.today = new Date();
            
            $rootScope.$on('ordersLoaded', function (event, orders) {
                $scope.orders = orders;
            });

            $scope.ShowOrder = function (order) {

            }

            //Compares the order date to the current date
            $scope.CompareDates = function(orderDate){
                return Math.round(Math.abs(($scope.today.getTime() - (new Date(orderDate)).getTime()) / (24 * 60 * 60 * 1000))) - 1;
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