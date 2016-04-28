define([
    'angular'
    //'text!widgets/traderoom/traderoomWidget.html!strip'
], function (angular, htmlTemplate) {
    var module = angular.module('enti.services', []);

    module.factory('shopDataModel', [function () {
        return {
            items: [
                //{
                //    src: '',
                //    title: '',
                //    description: '',
                //    price: 0,
                //    quantity: 0,
                //    discount: 0
                //}
            ],
            category: ''
        }
    }]);

    module.service('shopService', ['shopDataModel', function (shopDataModel) {
        var self = this;

        self.GetCategoryItems = function (category) {
            var result = {};
            shopDataModel.category = category;
            for (var i = 1; i < 6; i++) {
                shopDataModel.items.push({
                    src: '',
                    title: 'Item number ' + i,
                    description: 'Description number ' + i,
                    price: 10 * i,
                    quantity: i + 5,
                    discount: 0
                });
            }
        }

        return self;
    }]);

    return module;
});