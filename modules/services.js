define([
    'angular'
    //'text!widgets/traderoom/traderoomWidget.html!strip'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.services', ['ngCookies']);

    module.factory('shoppingCartData', ['$cookies', function ($cookies) {
        if ($cookies.get('shoppingCart')) {
            return JSON.parse($cookies.get('shoppingCart'));
        }
        else {
            return {};
        }
    }]);

    module.service('shopService', [function () {
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

    module.service('shoppingCartService', ['shoppingCartData', '$cookies', function (shoppingCartData, $cookies) {
        var self = this;

        var updateShoppingCookie = function () {
            if ($cookies.get('shoppingCart')) {
                $cookies.remove('shoppingCart');
            }
            $cookies.put('shoppingCart', JSON.stringify(shoppingCartData));
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
            $cookies.remove('shoppingCart');
        }

        return self;
    }]);


    return module;
});