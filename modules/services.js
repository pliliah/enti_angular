﻿define([
    'angular'    
], function (angular) {
    var module = angular.module('enti.services', ['ngCookies']);

    module.factory('shoppingCartData', ['$cookies', 'config', function ($cookies, config) {
        if ($cookies.get(config.shoppingCartCookie)) {
            return JSON.parse($cookies.get(config.shoppingCartCookie));
        }
        else {
            return {};
        }
    }]);
    
    module.service('shopService', ['$http', 'config', function ($http, config) {
        var self = this;
        self.categories = {};
        self.shoppingItems = {
            items: [], 
            category: {}
        };

        //Gets all the categories from the DB
        self.GetCategories = function () {
            $http.get(config.apiUrl + 'Categories')
                .then(function (response) {
                    //successs
                    var category = null;
                    for (inx in response.data) {
                        category = response.data[inx];
                        self.categories[category.systemName] = category;
                    }
                },
                function (error) {
                    //error
                });
        }

        self.GetCategoryItems = function (category) {            
            self.shoppingItems.category = category;
            self.shoppingItems.items = [];
            $http.get(config.apiUrl + 'ShoppingItems?categoryId=' + category.id)
                .then(function (response) {
                    //successs
                    for (inx in response.data) {
                        self.shoppingItems.items.push(response.data[inx]);
                    }
                },
                function (error) {
                    //error
                });                    
        }

        self.InsertCategoryItem = function (newItem) {
           return  $http.post(config.apiUrl + 'ShoppingItems', newItem);
        }

        self.UpdateCategoryItem = function (item) {
            return $http.put(config.apiUrl + 'ShoppingItems', item);                
        }

        self.DeleteShoppingItem = function (item) {
            return $http.delete(config.apiUrl + 'ShoppingItems?id=' + item.id);               
        }

        self.GetCategories();

        return self;
    }]);

    module.service('shoppingCartService', ['shoppingCartData', '$cookies', 'config', '$http', function (shoppingCartData, $cookies, config, $http) {
        var self = this;

        var updateShoppingCookie = function () {
            if ($cookies.get(config.shoppingCartCookie)) {
                $cookies.remove(config.shoppingCartCookie);
            }
            $cookies.put(config.shoppingCartCookie, JSON.stringify(shoppingCartData));
        }

        self.AddCartItem = function (item, quantity) {
            if (item.quantity > 0) {
                if (shoppingCartData[item.id]) {
                    shoppingCartData[item.id].quantity = quantity;
                }
                else {
                    shoppingCartData[item.id] = {
                        item: item,
                        quantity: quantity
                    }
                }

                updateShoppingCookie();
            }
        }

        self.UpdateCart = function (shoppingCart) {
            updateShoppingCookie();
        }

        self.DeleteCartItem = function (item) {
            if (shoppingCartData[item.id]) {
                delete shoppingCartData[item.id];
            }
            updateShoppingCookie();
        }

        self.EmptyCart = function () {
            shoppingCartData = {};
            $cookies.remove(config.shoppingCartCookie);
        }

        self.SubmitOrder = function (customer, shoppingCart, callback) {
            var params = {
                shoppingCart: [],
                customer: customer
            }
            for (var id in shoppingCart) {
                params.shoppingCart.push(shoppingCart[id])
            }
            var result = $http.post(config.apiUrl + 'Order', params)
                .success(function (data, status) {
                    console.log('success');
                    self.EmptyCart();
                    callback(data, status);
                })
                .error(function () {
                    console.log('error');
                });
        }

        return self;
    }]);

    module.service('ordersService', ['$http', 'config', '$rootScope', function ($http, config, $rootScope) {
        var self = this;
        self.orders = [];
        self.orderDetails = {};

        self.GetOrders = function () {
            $http.get(config.apiUrl + 'Order')
                .then(function (response) {
                    //successs
                    self.orders = response.data;
                    $rootScope.$emit('ordersLoaded', self.orders);
                    return self.orders;
                },
                function (error) {
                    //error
                });
        }

        self.GetOrderDetails = function (id) {
            $http.get(config.apiUrl + 'Order?orderId=' + id)
                .then(function (response) {
                    //success
                    self.orderDetails = response.data;
                    $rootScope.$emit('orderDetailsLoaded', self.orderDetails);
                    return response.data;
                },
                function (error) {
                    //error
                });
        }

        self.UpdateOrder = function (id, isCompleted) {
            return $http.put(config.apiUrl + 'Order?id=' + id + '&isCompleted=' + isCompleted);
        }
    }]);

    return module;
});