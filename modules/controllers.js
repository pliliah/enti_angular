define([
    'angular',
    'js/photoswipe/photoswipe.min',
    'js/photoswipe/photoswipe-ui-default.min',
    'js/photoswipe/angular-photoswipe',
    'modules/services'
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
        //these are the images from the gallery
        $scope.slides = [];
        for (var i = 1; i < 16; i++) {
            $scope.slides.push({
                src: 'img/gallery/' + i + '.jpg',
                safeSrc: 'img/gallery/' + i + '.jpg',
                thumb: 'img/gallery/' + i + '.jpg',
                caption: 'Lorem Ipsum Dolor',
                size: '400x400',
                type: 'image'
            });
        }
    }]);

    module.controller('GrowthController', ['$scope', function ($scope) {
        $scope.sectionLinks = [
            { imgSrc: "img/gallery/10.jpg", name: "Подстригване", description: "Видове бонсаи, оформление и стилове.", url: "growth/cutting" },
            { imgSrc: "img/gallery/1.jpg", name: "Грижи", description: "Поливане, подстригване, пресаждане и почви.", url: "growth/care" },
            { imgSrc: "img/gallery/5.jpg", name: "Саксии", description: "Видове саксии и избор на подходяща саксия за вашия бонсай.", url: "growth/potting" },
            { imgSrc: "img/gallery/15.jpg", name: "Технологии за отглеждане", description: "Стари и нови технологии за отглеждане на бонсаи. Плюсове и минуси на всяка една.", url: "growth/technologies" },
            { imgSrc: "img/gallery/15.jpg", name: "Почви", description: "Видове почви и дрениране.", url: "growth/soil" },
            { imgSrc: "img/gallery/15.jpg", name: "Място на отглеждане", description: "Външно и вътрешно отглеждане на бонсаите.", url: "growth/place" },
            { imgSrc: "img/gallery/15.jpg", name: "Торене", description: "Видове торове и торене при бонсаите.", url: "growth/fertilization" }
        ];
    }]);

    module.controller('ShopController', ['$scope', '$routeParams', 'shopService', 'shoppingCartService', function ($scope, $routeParams, shopService, shoppingCartService) {
        $scope.shopCategories = {
            plants: { imgSrc: "img/gallery/10.jpg", src: "shop/plants", name: "Растения", description: "Продажба на различни видове растения бонсаи и ...", count: 10 },
            soil: { imgSrc: "img/gallery/1.jpg", src: "shop/soil", name: "Почви", description: "Продажба на различни видове почви, подходящи за отглеждане на бонсаи", count: 15 },
            pots: { imgSrc: "img/gallery/5.jpg", src: "shop/pots", name: "Саксии", description: "Продажба на ръчно правени саксии за бонсаи, в различни видове и размери", count: 10 },
            accessories: { imgSrc: "img/gallery/15.jpg", src: "shop/accessories", name: "Аксесоари", description: "Всякакви аксесоари, необходими за грижите за вашите растения", count: 10 },
            fertilization: { imgSrc: "img/gallery/5.jpg", src: "shop/fertilization", name: "Торове", description: "Различни видове торове, подходящи за различните бонсаи", count: 10 }
        };
                
        //triggered when we change the page to see shop details
        $scope.$on('$routeChangeSuccess', function (next, current) {
            if (current.params.category) {
                $scope.category = $scope.shopCategories[current.params.category].name;
                $scope.categoryItems = shopService.GetCategoryItems($scope.category);
            }
            else {
                $scope.category = '';
                $scope.categoryItems = [];
            }
        });

        $scope.AddItemToCart = function (item) {
            shoppingCartService.AddCartItem(item, 1);
        }
    }]);

    module.controller('CartController', ['$scope', 'shoppingCartService', 'shoppingCartData', function ($scope, shoppingCartService, shoppingCartData) {
        $scope.shoppingCart = shoppingCartData;

    }]);

    module.controller('ContactController', ['$scope', function ($scope) {

    }]);

    module.controller('HistoryController', ['$scope', function ($scope) {

    }]);

    module.controller('LinksController', ['$scope', function ($scope) {
        //links to bg sites for bonsai
        $scope.bgLinks = [
            { src: "http://bonsai.bg/", title: "Бонсай Клуб - България" },
            { src: "http://bonsai-bg.com/", title: " Димитър Димитров" },
            { src: "http://pencho-minchev-bonsai.blogspot.bg", title: "Пенчо Минчев" },
            { src: "http://svilen.bonsai.bg/", title: "Свилен Добрев" },
            { src: "http://peter.bonsai.bg/", title: "Петър Светославов" },
            { src: "http://bonsaidnevnik.blogspot.bg/", title: "Радко Колев" },
            { src: "http://forum.flowersnet.info/viewforum.php?f=33", title: "Форум" }
        ];
        //links to clubs for bonsai
        $scope.clubsLinks = [
            { src: "http://www.aabcltd.org/", title: "Асоцияция на австралийските бонсай клубове" },
            { src: "http://www.cbs.org.au/index.php", title: "Бонсай общност - Канбера" },
            { src: "http://www.bonsai.asn.au/", title: "Бонсай общност - Австралия" },
            { src: "https://www.bonsaisocietyqld.asn.au/", title: "Бонсай общност - Куинсленд" },
            { src: "http://www.ottawabonsai.org/", title: "Бонсай общност - Отава" },
            { src: "http://bonsaimontreal.com/#&panel1-3", title: "Бонсай общност - Монтреал" },
            { src: "http://bonsaiduquebec.com/", title: "Бонсай общност - Квебек" },
            { src: "http://www.nibonsai.co.uk/", title: "Бонсай общество – Северна Ирландия" },
            { src: "http://www.arcobonsai.com/", title: "Аркобонсай клуб – Италия" },
            { src: "http://ahmedabadbonsaiclub.blogspot.bg/", title: "Ахмедабат бонсай клуб – Индия" },
            { src: "http://www.ebabonsai.com/", title: "Европейска бонсай асоциация" },
            { src: "http://www.absbonsai.org/", title: "Американска бонсай асоциация" },
            { src: "http://www.saba.org.za/", title: "Южноафриканска бонсай асоциация" },
            { src: "http://www.scottishbonsai.org/page.cfm?page=1", title: "Шотладска бонсай асоциация" },
            { src: "http://www.bonsainz.com/", title: "Новозеландска бонсай асоциация" },
            { src: "http://iabonsai.org/", title: "Бонсай асоциация – Айова" },
            { src: "http://www.shohin-europe.com/", title: "Европейска шохин асоциация" },
            { src: "http://bowiebonsai.tripod.com/", title: "Бауи бонсай клуб" },
            { src: "http://hawaiibonsaiassoc.org/", title: "Хавайска бонсай асоциация" },
            { src: "http://www.artisticbonsaicircle.co.uk/", title: "Кръг на бонсай артистите" }
        ];
        //links to blogs for bonsai
        $scope.blogsLinks = [
            { src: "http://walter-pall-bonsai.blogspot.bg/", title: "Уолтър Пол" },
            { src: "http://tedyboybonsai.blogspot.bg/", title: "Теди Бой" }            
        ];
        //links to shops for bonsai
        $scope.shopsLinks = [
            { src: "http://www.kaizenbonsai.com/", title: "Англия - Кайзен бонсай" },
            { src: "http://www.makebonsai.com/", title: "Англия - Ма Ке бонсай" },
            { src: "http://www.herons.co.uk/", title: "Англия - Херонс" },
            { src: "http://www.willowbog-bonsai.co.uk/", title: "Англия - Уилоубог" },
            { src: "http://www.greendragonbonsai.co.uk/", title: "Англия - Зелен Дракон" },
            { src: "http://www.johnhanbybonsai.co.uk/store/", title: "Английя - Джон Ханби" },
            { src: "http://www.southamptonbonsai.uk/", title: "Англия - Саутамптон бонсай" },
            { src: "https://www.bonsai-shop.com/", title: "Германия - Бонсай магазин" },            
            { src: "http://www.bonsaioutlet.com/", title: "САЩ - Бонсай аутлет" },
            { src: "http://www.bonsaiwest.com/", title: "САЩ - Бонсай уест" },
            { src: "http://www.hollowcreekbonsai.com/", title: "САЩ - Холоу Крийк" },
            { src: "http://www.bonsaiboy.com/", title: "САЩ - Бонсай бой" },
            { src: "http://www.samurai.nl/", title: "Холандия - Самурай" },
            { src: "http://www.bonsaiempire.com/", title: "Холандия - Бонсай империя" },
            { src: "http://www.yoshoen.com/", title: "Япония - Йошoен" }
        ];
    }]);

    module.controller('AboutController', ['$scope', function ($scope) {

    }]);

    return module;
});