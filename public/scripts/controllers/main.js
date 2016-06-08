'use strict';

/**
 * @ngdoc function
 * @name jstestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the restaurant
 */
angular.module('restaurant')
  .controller('MainCtrl', ['$scope', '$cookies', 'MenuService', function ($scope, $cookies, MenuService) {
        $scope.dataAJAXed = false;
	    $scope.menu = {};
        $scope.order = {
                main : [],
                other: [],
                total : 0.0,
                mainMeals : 0,
                otherMeals : 0,
                confirm : false
        };
        //manage order if page was reloaded and cookie exists
        $scope.existingOrder = {};
        $scope.existingOrder.currentMainOrder = '';
        var orderFromCookie = $cookies.order;
        if( orderFromCookie && orderFromCookie.match(/((\d*[a-z]*)+|([a-z]*\d*)+)/i) ){
                $scope.existingOrder.currentMainOrder = orderFromCookie ;
        }else{
                $cookies.order = '';
        }
        /*===========================================*/
        /*===== add to basket and to cookie =========*/
        /*===========================================*/
        $scope.addToBasket = function(id,cookie){
                var tmpCookieOrder = $cookies.order; //get the existing cookie for the order
                var meal = $scope.menu.meals.filter(function(val,ind,arr){ return arr[ind].id===id; })[0];
                if(checkIfExist($scope.order.main , id).exist){ //if meal exist in the mains order just increase it's quantity
                        //meal.amount +=1;
                        $scope.order.main[checkIfExist($scope.order.main , id).index].amount+=1;
                        $scope.order.mainMeals +=1;
                        $scope.order.total = (parseFloat($scope.order.total) + parseFloat(meal.price)).toFixed(2);
                }else if(checkIfExist($scope.order.other , id).exist){ //if meal exist in the others order just increase it's quantity
                        //meal.amount +=1;
                        $scope.order.other[checkIfExist($scope.order.other , id).index].amount+=1;
                        $scope.order.otherMeals +=1;
                        $scope.order.total = (parseFloat($scope.order.total) + parseFloat(meal.price)).toFixed(2);
                }
                else{ //else add it to the appropriate array and to the order cookie
                        var course = meal.tags.length && meal.tags.filter( function(val,ind,arr){ return arr[ind].match(/course/i);}).length ? meal.tags.filter( function(val,ind,arr){ return arr[ind].match(/course/i); } )[0].substring(8) : 'other';
                        $scope.order.total = (parseFloat($scope.order.total) + parseFloat(meal.price)).toFixed(2);

                        if(course=='main_courses'){
                                $scope.order.main.push(meal);
                                $scope.order.mainMeals +=1;
                                meal.amount +=1;
                        }else{
                                $scope.order.other.push(meal);
                                $scope.order.otherMeals +=1;
                                meal.amount +=1;
                        }
                        if(cookie){
                                $cookies.order =  tmpCookieOrder.match(/_((\d*[a-z]*)+|([a-z]*\d*)+)/i) ? tmpCookieOrder+'_'+meal.id : '_'+meal.id;
                        }

                }
        };
        /*===========================================*/
        //=====  function to check for already existing meal in basket =====
        /*===========================================*/
        var checkIfExist = function(array,id){
                var index = 0;
                var exist = array.filter(function(val,ind){ if(array[ind].id===id){index = ind;} return array[ind].id===id;}).length;
                 if(exist){
                      return {exist : true , index : index};
                }else{
                      return {exist : false};
                 }
        };
        /*===========================================*/
        //=====  populate an order form cookie =====
        /*===========================================*/
        $scope.getOrder = function(){
                if($scope.existingOrder.currentMainOrder.length){
                        var order = $scope.existingOrder.currentMainOrder.split('_');
                        angular.forEach(order , function(val,ind,arr){
                                if(order[ind].trim()!='') {
                                        $scope.addToBasket(order[ind], false);
                                }

                        });
                }
        };
        /*===========================================*/
        /*===========================================*/
        /*===========================================*/
        $scope.addRemoveMeals = function(array , indx , amnt){
                var cookieOrder = $cookies.order;
                var tmpCookie = '';
                if(amnt == -1){
                        if(array == 'main'){
                                //if(indx == $scope.order.main.length){indx-=1;console.log('wrong indx sent '+indx+', decreased with 1 now');}
                                $scope.order.main[indx].amount -= 1;
                                $scope.order.total = (parseFloat($scope.order.total) - parseFloat($scope.order.main[indx].price)).toFixed(2);
                                if($scope.order.main[indx].amount==0){
                                        //remove from cookie
                                        tmpCookie = cookieOrder.replace('_'+$scope.order.main[indx].id ,'');
                                        $cookies.order =  tmpCookie;
                                        //remove from array
                                        $scope.order.main.splice(indx , 1);
                                        setTimeout(function(){$scope.$digest();},0);
                                        //hide basket if nothing in order
                                        if($scope.order.main.length==0 && $scope.order.other.length==0){
                                                $scope.order.confirm = false;
                                                $cookies.order = '';
                                                setTimeout(function(){$scope.$digest();},0);
                                        }

                                }

                        }else{
                                //if(indx == $scope.order.other.length){indx-=1;console.log('wrong indx sent '+indx+', decreased with 1 now');}
                                $scope.order.other[indx].amount -= 1;
                                $scope.order.total = (parseFloat($scope.order.total) - parseFloat($scope.order.other[indx].price)).toFixed(2);
                                if($scope.order.other[indx].amount==0){
                                        //remove from cookie
                                        tmpCookie = cookieOrder.replace('_'+$scope.order.other[indx].id ,'');
                                        $cookies.order =  tmpCookie;
                                        //remove from array
                                        $scope.order.other.splice(indx , 1);
                                        setTimeout(function(){$scope.$digest();},0);
                                        //hide basket if nothing in order
                                        if($scope.order.main.length==0 && $scope.order.other.length==0){
                                                $scope.order.confirm = false;
                                                $cookies.order = '';
                                                setTimeout(function(){$scope.$digest();},0);
                                        }
                                }
                        }

                }else{
                        if(array=='main'){
                                $scope.order.main[indx].amount += 1;
                                $scope.order.total = (parseFloat($scope.order.total) + parseFloat($scope.order.main[indx].price)).toFixed(2);

                        }else{
                                $scope.order.other[indx].amount += 1;
                                $scope.order.total = (parseFloat($scope.order.total) + parseFloat($scope.order.other[indx].price)).toFixed(2);
                        }
                }
                setTimeout(function(){$scope.$digest();},0);
        };
        /*===========================================*/
        /*===========================================*/
        /*===========================================*/
        MenuService.get().success(function(data) {
                $scope.menu = data;
                $scope.menu.meals.forEach(function(val,ind,arr){ arr[ind].amount = 0; }); //add meal count for each meal
                console.log(data);
                if($cookies.order && !$scope.dataAJAXed){  // add items to basket on reload if cookie exists
                        $scope.dataAJAXed = true;
                        $scope.getOrder();
                        //$scope.$emit('loaded');
                }
                $scope.$broadcast('loaded');
        });

  }
]).directive('toggleDescription' ,['$window', '$timeout' , '$log' ,  function($window , $timeout , $log ){
        return {
                controller : 'MainCtrl',
                restrict : "A",
                link : function(scope, iele, iattr){

                        $window.addEventListener('resize' , function(){
                                var ww = document.body.clientWidth || document.documentElement.clientWidth;
                                var listWidth = parseInt(Math.floor(ww/286 ))*286 +2;
                                document.querySelector('.meals').style.width = listWidth+'px';
                        });
                        $window.dispatchEvent(new Event('resize'));

                        var setEventsForSliding = function(){
                                var toggleDesc = document.querySelectorAll('span.showMore img');
                                var trgt = document.querySelectorAll('div.slideDesc');
                                var descriptions = document.querySelectorAll('div.slideDesc .description');
                                Object.getOwnPropertyNames(toggleDesc).forEach(function(val,ind,arr) {
                                        toggleDesc[ind].removeEventListener('click');
                                        toggleDesc[ind].addEventListener('click', function (e) {
                                                var indx = parseInt(e.target.attributes.getNamedItem('data-ind').textContent);
                                                if (trgt[indx].classList) {
                                                        if (trgt[indx].classList.contains('scrollUp')) {
                                                                trgt[indx].classList.remove('scrollUp');
                                                                trgt[indx].style.top = -55+'px';
                                                        } else {
                                                                trgt[indx].classList.add('scrollUp');
                                                                trgt[indx].style.top = 50-trgt[indx].scrollHeight+'px';
                                                        }
                                                } else {
                                                        if (!trgt[indx].className.match(/scrollUp/i)) {
                                                                trgt[indx].className = trgt[indx].className + ' scrollUp';
                                                                trgt[indx].style.top = 50-trgt[indx].scrollHeight+'px';
                                                        } else {
                                                                trgt[indx].className = trgt[indx].className.replace(' scrollUp', '');
                                                                trgt[indx].style.top = -55+'px';
                                                        }
                                                }
                                        })
                                });
                                //remove the viewMore button if the desciption is short
                                Object.getOwnPropertyNames(descriptions).forEach(function(val,ind){
                                        if(descriptions[ind].scrollHeight<50){
                                                toggleDesc[ind].parentElement.style.display = 'none';
                                        }
                                });
                        };

                        scope.$on('loaded' , function(){
                                if(document.querySelectorAll('.slideDesc').length == scope.menu.meals.length){
                                        $log.log('#### DEV #### \nContent for manipulation has been loaded.\n#### DEV ####');
                                        setEventsForSliding();
                                }else{
                                        $timeout(function(){ scope.$emit('loaded'); } , 300);
                                }

                        });


                }
        };
}]);
