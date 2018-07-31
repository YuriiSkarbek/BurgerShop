var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
        })
        .when('/menu', {
            templateUrl: 'templates/menu.html'
        })
        .when('/cart', {
            templateUrl: 'templates/cart.html'
        })
        .when('/contact', {
            templateUrl: 'templates/contact.html'
        })
        .when('/admin', {
            templateUrl: 'templates/admin.html'
        })
        .otherwise({
            templateUrl: 'templates/error.html'
        })

});

app.controller('productsCtrl', function ($http, $scope) {


    $scope.getProducts = function () {
        $http.get('http://localhost:8080/getProducts')
            .success(function (rows) {
                $scope.products = rows
            })
            .error(function (rows) {
                console.log('Ой, щось пішло не так ( getProducts )')
            })
    }
    $scope.getBurgers = function () {
        $http.get('http://localhost:8080/getBurgers')
            .success(function (rows) {
                $scope.products = rows
            })
            .error(function (rows) {
                console.log('Ой, щось пішло не так ( getBurgers )')
            })
    }
    $scope.getVegan = function () {
        $http.get('http://localhost:8080/getVegan')
            .success(function (rows) {
                $scope.products = rows
            })
            .error(function (rows) {
                console.log('Ой, щось пішло не так ( getVegan )')
            })
    }
    $scope.getOther = function () {
        $http.get('http://localhost:8080/getOther')
            .success(function (rows) {
                $scope.products = rows;
            })
            .error(function (rows) {
                console.log('Ой, щось пішло не так ( getOther )')
            })
    }
    $scope.getDrinks = function () {
        $http.get('http://localhost:8080/getDrinks')
            .success(function (rows) {
                $scope.products = rows
            })
            .error(function (rows) {
                console.log('Ой, щось пішло не так ( getDrinks )')
            })
    }


    $scope.cart = [];
    $scope.total = 0;
    $scope.totalCount = 0;

    $scope.addItemToCart = function (product) {
        if ($scope.cart.length >= 0) {
            angular.element(document.querySelector('.cart')).addClass('cart_in');
        }
        if ($scope.cart.length == 0) {
            product.count = 1;
            $scope.totalCount += 1;
            $scope.cart.push(product);
            $scope.total += +product.product_price;

        } else {
            var repeat = false;
            for (var i = 0; i < $scope.cart.length; i++) {
                if ($scope.cart[i].product_id == product.product_id) {
                    repeat = true;
                    if (product.count >= 99) {
                        product.count = 99
                    } else {
                        $scope.cart[i].count += 1;
                        $scope.totalCount += 1;
                        $scope.total += +product.product_price;
                    }

                }
            }
            if (!repeat) {
                product.count = 1;
                $scope.totalCount += 1;
                $scope.cart.push(product);
                $scope.total += +product.product_price;
            }
            document.getElementsByClassName('cart').addClass = 'cart_in'
        }
    }
    $scope.deleteItemCart = function (c) {
        var index = $scope.cart.indexOf(c);
        $scope.cart.splice(index, 1);
        $scope.total -= +c.product_price * c.count;
        $scope.totalCount -= c.count;
    }

    $scope.countPlus = function (c) {
        if (c.count >= 99) {
            c.count = 99
        } else {
            c.count++;
            $scope.total += +c.product_price;
            $scope.totalCount++;
        }

    }
    $scope.countMinus = function (c) {
        c.count--;
        $scope.totalCount--;
        $scope.total -= +c.product_price;
        if (c.count == 0) {
            $scope.deleteItemCart(c);
        }

    }

    $scope.value = 'delivery';
    $scope.delivery = {
            product_id: '0',
            product_name: "Доставка кур'єром",
            product_description: "Доставка по Львову",
            product_price: "60"
        }
    

    $scope.newValue = function (value) {
        if (value == 'selfDelivery') {
            document.getElementsByClassName('order_info-address')[0].style.display = 'none';
        } else {
            document.getElementsByClassName('order_info-address')[0].style.display = 'none';
            $scope.total += 60;
        }
    }


})




// директива для випадаючого меню на малих розширеннях
app.directive('menuToggle', function () {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function () {

                if (element.css('border') == '1px solid black') {
                    element.css('border', '1px solid transparent');
                    document.getElementById('mainMenu').style.display = 'none';

                } else {
                    element.css('border', '1px solid black');
                    document.getElementById('mainMenu').style.display = 'flex';

                }
            })
        }
    }
})

app.directive('cartOrder', function () {
    return {
        link: function (scope, element, attrs) {
            element.on('click', function () {
                document.getElementsByClassName('cart_container')[0].style.display = 'none';
                document.getElementsByClassName('cart_order')[0].style.display = 'block';
                toTop();
            })
        }
    }
})

function toTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
