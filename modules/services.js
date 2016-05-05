define([
    'angular'
    //'text!widgets/traderoom/traderoomWidget.html!strip'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.services', ['ngCookies']);

    module.factory('shoppingCartData', ['$cookies', 'config', function ($cookies, config) {
        if ($cookies.get(config.shoppingCartCookie)) {
            return JSON.parse($cookies.get(config.shoppingCartCookie));
        }
        else {
            return {};
        }
    }]);

    module.service('shopService', ['$http', function ($http) {
        var self = this;

        self.GetCategoryItems = function (category) {
            var result = {items: [], category: category};
            for (var i = 1; i < 6; i++) {
                result.items.push({
                    id: i,
                    src: 'img/gallery/10.jpg',
                    title: 'Item number ' + i,
                    description: 'Description number ' + i,
                    price: 10 * i,
                    quantity: i + 5,
                    discount: i*10 - 10,
                    lastUpdated: new Date()
                });
            }
            return result;            
        }

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

        self.SubmitOrder = function (customer, shoppingCart) {
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
                })
                .error(function () {
                    console.log('error');
                });
        }

        return self;
    }]);


    return module;
});