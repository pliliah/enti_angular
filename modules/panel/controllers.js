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

    module.controller('OrdersController', ['$scope', 'ordersService', '$rootScope', '$location',
        function ($scope, ordersService, $rootScope, $location) {
            $scope.orders = [];
            ordersService.GetOrders();
            $scope.today = new Date();
            
            $rootScope.$on('ordersLoaded', function (event, orders) {
                $scope.orders = orders;
            });

            $scope.ShowOrder = function (order) {
                $location.path('admin/orders/' + order.orderId);
            }

            //Compares the order date to the current date
            $scope.CompareDates = function(orderDate){
                return Math.round(Math.abs(($scope.today.getTime() - (new Date(orderDate)).getTime()) / (24 * 60 * 60 * 1000))) - 1;
            }
        }]);

    module.controller('OrderDetailsController', ['$scope', 'ordersService', '$uibModal', 'config', '$rootScope', '$routeParams',
       function ($scope, ordersService, $uibModal, config, $rootScope, $routeParams) {
           $scope.orderDetails = {};
           $scope.imagesFolter = config.shoppingItemGallery;
           $scope.totalPrice = 0;

           $rootScope.$on('orderDetailsLoaded', function (event, order) {
               $scope.orderDetails = order;
               for (var i = 0; i < order.items.length; i++ ) {
                   $scope.totalPrice += order.items[i].itemPrice * order.items[i].quantity;
               }
           });

           //take the order data 
           if ($routeParams.id) {
               ordersService.GetOrderDetails($routeParams.id);
           }

           //Saves the order as submitted
           $scope.OrderSubmitted = function (orderId, isCompleted) {
               ordersService.UpdateOrder(orderId, isCompleted)
                   .then(function (response) {
                   var modalInstance = $uibModal.open({
                       templateUrl: 'modules/templates/successModal.html',
                       controller: 'ModalController',
                       size: 'sm', //'lg' and by default none
                       resolve: {
                           message: function () {
                               return 'Поръчка номер "' + orderId + '" е записана като ' + (isCompleted ? 'изпратена' : 'неизпратена') + '!';
                           },
                           path: function () {
                               return '/admin/orders';
                           }
                       }
                   });
               });
           }
           
       }]);

    module.controller('ModalController', ['$scope', '$location', '$uibModalInstance', 'message', 'path', function ($scope, $location, $uibModalInstance, message, path) {
        $scope.message = message;

        $scope.ok = function () {
            $uibModalInstance.close();
            $location.path(path);
        };
    }]);

    module.controller('LoginController', ['$scope', '$location', 'loginService', function ($scope, $location, loginService) {
        //check whether user is logged in
        $scope.username = '';
        $scope.password = '';

        if (true) {
            var $id = $('#dialog');
            //transition effect    
            $('#mask').fadeIn(1000);
            $('#mask').fadeTo("slow", 0.8);
            //transition effect
            $id.fadeIn(2000);
        }
        else {
            $location.path('/');
        }

        $scope.Login = function (username, password) {
            loginService.Login(username, password, function (response) {
                if (response) {
                   //hide the dialog here
                }
                else {
                    $location.path('/');
                }
            });
        }
    }]);

    return module;
});