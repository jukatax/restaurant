
angular.module('restaurant')
        .directive('basket' , ['$window' , function($window){
                return {
                        controller: 'MainCtrl',
                        restrict: "A",
                        templateUrl : 'templates/basket.html'
                }

}]);