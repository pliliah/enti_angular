﻿define([
    'angular',
    'md5',
    'sha1',
    'base64'
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
    
    module.service('shopService', ['$http', 'config', '$rootScope', function ($http, config, $rootScope) {
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
                    $rootScope.$broadcast('categoriesLoaded', self.categories);
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

        // Gets the specified item by it's id 
        self.GetItemById = function (itemId, callback) {
            $http.get(config.apiUrl + 'ShoppingItems?itemId=' + itemId)
                .then(callback,
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

    module.service('shoppingCartService', ['shoppingCartData', '$cookies', 'config', '$http', '$rootScope',
        function (shoppingCartData, $cookies, config, $http, $rootScope) {
        var self = this;

        var updateShoppingCookie = function () {
            if ($cookies.get(config.shoppingCartCookie)) {
                $cookies.remove(config.shoppingCartCookie);
            }
            $cookies.put(config.shoppingCartCookie, JSON.stringify(shoppingCartData));
            $rootScope.$emit('shoppingCartUpdated', shoppingCartData);
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

        self.UpdateOrder = function (order, isCompleted) {
            return $http.put(config.apiUrl + 'Order?isCompleted=' + isCompleted, order);
        }

        return self;
    }]);

    module.service('loginService', ['$http', 'config', '$rootScope', '$location', '$cookies',
        function ($http, config, $rootScope, $location, $cookies) {
        var self = this;

        var generateNonce = function (numbersCount) {
            ///<summary> Generates randowm NONCE text </summary>
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            if (!numbersCount)
                numbersCount = 19;

            for (var i = 0; i < numbersCount; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };        
        self.IsLoggedIn = function () {
            ///<summary> Checks whether the user is logged in </summary>
            if ($cookies.get(config.userCookie) &&
                $cookies.get(config.nonceCookie) &&
                $cookies.get(config.createdCookie) &&
                $cookies.get(config.digestCookie)) {
                return true;
            }
            return false;
        };

        self.Login = function (username, password, callback) {
            var nonce = generateNonce();
            var nonce2base64 = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(nonce));
            var created = (new Date()).toISOString();
            var hashedPass = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(md5(nonce + created + password)));
           
            var params = {
                user: username,
                nonce: nonce2base64,
                date: created,
                digest: hashedPass
            };
            $http.post(config.apiUrl + 'Login', params)
                .then(function (response) {
                    //success
                    if (response.data && response.data.code) {
                        switch (response.data.code) {
                            case 202:
                                //save credentials to cookie for further use
                                var now = new Date(),
                                    expire = new Date(now.getTime() + 15 * 60000); //expire in 15 minutes

                                $cookies.remove(config.userCookie);
                                $cookies.remove(config.nonceCookie);
                                $cookies.remove(config.createdCookie);
                                $cookies.remove(config.digestCookie);
                                $cookies.put(config.userCookie, JSON.stringify(username), { expires: expire });
                                $cookies.put(config.nonceCookie, JSON.stringify(nonce2base64), { expires: expire });
                                $cookies.put(config.createdCookie, JSON.stringify(created), { expires: expire });
                                $cookies.put(config.digestCookie, JSON.stringify(hashedPass), { expires: expire });
                                $rootScope.$broadcast('loginSuccessfull');
                                callback(true);
                                break;
                            case 401: 
                            default:
                                $cookies.remove(config.userCookie);
                                $cookies.remove(config.nonceCookie);
                                $cookies.remove(config.createdCookie);
                                $cookies.remove(config.digestCookie);
                                callback(false);
                        }
                    }
                }, function (error) {
                    //error
                    callback(false);
                });
        }

        return self;
        }]);

    module.service('customersService', ['$http', 'config', '$rootScope', '$location', '$cookies',
        function ($http, config, $rootScope, $location, $cookies) {
            var self = this;

            self.customers = [];

            self.GetCustomers = function () {
                $http.get(config.apiUrl + 'Customer')
               .then(function (response) {
                   //successs
                   self.customers = response.data;
                   $rootScope.$emit('customersLoaded', self.customers);
                   return self.customers;
               },
               function (error) {
                   //error
               });
            }

            return self;
        }]);

    module.service('contactsService', ['$http', 'config', '$rootScope', '$location', '$cookies',
        function ($http, config, $rootScope, $location, $cookies) {
            var self = this;
            self.selectedContact = {};

            self.GetContacts = function () {
                $http.get(config.apiUrl + 'Contact')
                .then(function (response) {
                    //successs
                    self.contacts = response.data;
                    $rootScope.$emit('contactsLoaded', self.contacts);
                    return self.contacts;
                },
                function (error) {
                    //error
                });
            }

            //Insert new user contact with a question
            self.InsertNewContact = function (contact) {
                return $http.post(config.apiUrl + 'Contact', contact);
            }

            //Marks the contact as completed i.e. send answer by phone and not email
            self.MarkCompleted = function (contact, answer) {
                return $http.put(config.apiUrl + 'Contact?id=' + contact.contactId + '&isCompleted=true' + '&answer=' + answer);
            }

            //Marks the contact as completed by sending email
            self.SendMessage = function (message, contact) {
                return $http.put(config.apiUrl + 'Contact?id=' + contact.contactId + '&email=' + contact.email + '&name=' + contact.name + '&message=' + message);
            }

            return self;
        }]);

    module.service('notificationsService', ['$http', 'config', '$rootScope', '$location', '$cookies',
        function ($http, config, $rootScope, $location, $cookies) {
            var self = this;

            self.notifications = [];

            self.GetNotifications = function () {
                $http.get(config.apiUrl + 'Notifications')
               .then(function (response) {
                   //successs
                   self.notifications = response.data;
                   $rootScope.$broadcast('notificationsLoaded', self.notifications);
                   return self.notifications;
               },
               function (error) {
                   //error
               });
            }

            return self;
        }]);

    return module;
});