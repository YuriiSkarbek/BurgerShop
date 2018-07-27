var app = angular.module('app', []);

app.controller('mainCtrl', function($scope){
    $scope.name = 'Yurii';
    $scope.surname = 'Skarbek';
})

app.filter('surnameFilter', function(){
    return function (str){
        return str.substr(0, 1) + '.'
    }
})