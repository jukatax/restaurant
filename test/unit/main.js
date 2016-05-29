//'use strict';
describe('Unit test controller and routes: ', function () {
        // load the controller's module
        beforeEach(module('restaurant'));
        //==================================================================================================
        //================================= Controller tests ===============================================
        //==================================================================================================
        //add items in basket
        describe(' main controller - testing + addToBasket function:' , function(){
                var mc, scope, MenuService,location;
                        beforeEach(
                                inject(function($controller , $rootScope , $injector , $httpBackend , _$location_ ){
                                        scope = $rootScope.$new();
                                        mc = $controller('MainCtrl' , { $scope : scope});
                                        location  = _$location_;
                                        $httpBackend.expectGET('data/menu.json').respond(200 , 'main data get');
                                        $httpBackend.expectGET('views/main.html').respond(200 , 'main html');
                                        MenuService = $injector.get('MenuService');


                                })
                        );
                        //set some dummy data to test main object
                        beforeEach(function(){
                                        scope.$apply(function(){
                                                scope.menu = {
                                                        "meals": [
                                                                {
                                                                        "id": "cad2d2e8b16eb668f47b4f2827438951",
                                                                        "name": "Seafood risotto",
                                                                        "description": "This seafood risotto recipe is infused with a number of fresh herbs, imparting remarkable flavour onto the risotto rice base. With scallops, prawns and mussels to make up the risotto but you can use whatever seafood is available and you like. Served with some cheddar rolls or a small avocado salad for a delicious seafood supper.",
                                                                        "price": "9.50",
                                                                        "primaryImageUrl": "http://lh5.ggpht.com/ASTYH5ZbfNpA5MOxUya9MfOXw8910PpbcvkAWeMFbjurfYvbqx1qnfLU091k3UyxGXUYDn_dNOMRsmCIE2ozwRAd",
                                                                        "tags": ["#course:main_courses", "#diet:pescetarian", "seafood"]
                                                                },
                                                                {
                                                                        "id": "6308e806b1233e111081666e82f7aac1",
                                                                        "name": "Penne bacon, green peas",
                                                                        "description": "Caramelized onions lend a slight sweetness to this hearty pasta dish, with Onion, Bacon, and Parmesan",
                                                                        "price": "8.50",
                                                                        "primaryImageUrl": "http://lh4.ggpht.com/xVItGb4gEo_f-q8G0jDTNbguDdS2NzaSz2fqti_a6f3egda7DLbTI0eGqdCgXakqT3TsezDlKDFtdNYWdGJvtw",
                                                                        "tags": ["pasta", "#course:main_courses"]
                                                                },
                                                                {
                                                                        "id": "33415cd067ba0ac61b36516726ffb762",
                                                                        "name": "Spaghetti frutti di mare",
                                                                        "description": "Mussels, shrimp, and squid simmer in a homemade tomato-wine sauce that's served over pasta in this main-dish recipe.",
                                                                        "price": "9.50",
                                                                        "primaryImageUrl": "http://lh5.ggpht.com/KioRENoZdDzKH-EJfQHtsjlSd3MfZT7v0j9XcmGs7l1SgB-_ybCu2m7hrH888n0s-MEFXdSOhzbaW6IWBwe5X5w",
                                                                        "tags": ["pasta", "#course:main_courses", "#diet:pescetarian"]
                                                                },
                                                                {
                                                                        "id": "6c098bd2443ca31180b69c0371390e57",
                                                                        "name": "Fusilli goat cheese and spinach",
                                                                        "description": "Spinach Pesto with Fusilli, Goat Cheese and Peppers. Serve with: Grated Carrot Salad.",
                                                                        "price": "8.50",
                                                                        "primaryImageUrl": "http://lh3.ggpht.com/_VsPUDOT5r9ShxxZUqcG6JDuamdoj5goKt1xsnCmX6lLgbdbgbh69jlMFBIo1P_icX0KQVcExBIcuppeIfYiSSE",
                                                                        "tags": ["pasta", "#course:main_courses", "#diet:vegetarian"]
                                                                },
                                                                {
                                                                        "id": "020d99cc7c0f43a03fa1bac2160041b2",
                                                                        "name": "Roast Mix",
                                                                        "description": "Served with roast duck, crispy pork belly and char siu roast pork with seasonal steamed greens on rice",
                                                                        "price": "8.95",
                                                                        "primaryImageUrl": "http://lh4.ggpht.com/2j4BAcPw-mCPApc2qvUSZpcEH39uFWnX5YnDMDKi0rX_D2YYosvf6SfiWBljTV24n8nYjaVg65PZRoFbeoh8XzA",
                                                                        "tags": ["pork"]
                                                                }
                                                        ]
                                                };
                                                scope.addToBasket('cad2d2e8b16eb668f47b4f2827438951',false); //add risotto
                                                scope.addToBasket('020d99cc7c0f43a03fa1bac2160041b2',false); //add roast mix
                                        });
                                }
                        );
                        it(' MenuService service to be defined' , function(){
                                expect(MenuService.get).toBeDefined();

                        });
                        it(' all functions triggered on click to be defined' , function(){
                                expect(scope.getOrder).toBeDefined();
                                expect(scope.addRemoveMeals).toBeDefined();
                                expect(scope.addToBasket).toBeDefined();
                                expect(scope.order).toBeDefined();
                                expect(scope.order.other).toBeDefined();
                                expect(scope.menu.meals.length).toBe(5);
                        });
                        it(' addToBasket to be  functional' , function(){
                                expect(scope.order.main.length).toBe(1);
                                expect(scope.order.other.length).toBe(1);
                                expect(scope.order.total).toBe('18.45');
                        });
        });

        // remove items from basket
        describe(' main controller - removing items from basket: ' , function(){
                var mc, scope, MenuService,location;
                beforeEach(
                        inject(function($controller , $rootScope , $injector , $httpBackend , _$location_ ){
                                scope = $rootScope.$new();
                                mc = $controller('MainCtrl' , { $scope : scope});
                                location  = _$location_;
                                $httpBackend.expectGET('data/menu.json').respond(200 , 'main data get');
                                $httpBackend.expectGET('views/main.html').respond(200 , 'main html');
                                $httpBackend.expectGET('templates/basket.html').respond(200 , 'basket html');
                                MenuService = $injector.get('MenuService');
                        })
                );
                //set some dummy data to test main object
                beforeEach(function(){
                        scope.$apply(function(){
                                scope.menu = {
                                "meals": [
                                        {
                                                "id": "cad2d2e8b16eb668f47b4f2827438951",
                                                "name": "Seafood risotto",
                                                "description": "This seafood risotto recipe is infused with a number of fresh herbs, imparting remarkable flavour onto the risotto rice base. With scallops, prawns and mussels to make up the risotto but you can use whatever seafood is available and you like. Served with some cheddar rolls or a small avocado salad for a delicious seafood supper.",
                                                "price": "9.50",
                                                "primaryImageUrl": "http://lh5.ggpht.com/ASTYH5ZbfNpA5MOxUya9MfOXw8910PpbcvkAWeMFbjurfYvbqx1qnfLU091k3UyxGXUYDn_dNOMRsmCIE2ozwRAd",
                                                "tags": ["#course:main_courses", "#diet:pescetarian", "seafood"]
                                        },
                                        {
                                                "id": "6308e806b1233e111081666e82f7aac1",
                                                "name": "Penne bacon, green peas",
                                                "description": "Caramelized onions lend a slight sweetness to this hearty pasta dish, with Onion, Bacon, and Parmesan",
                                                "price": "8.50",
                                                "primaryImageUrl": "http://lh4.ggpht.com/xVItGb4gEo_f-q8G0jDTNbguDdS2NzaSz2fqti_a6f3egda7DLbTI0eGqdCgXakqT3TsezDlKDFtdNYWdGJvtw",
                                                "tags": ["pasta", "#course:main_courses"]
                                        },
                                        {
                                                "id": "33415cd067ba0ac61b36516726ffb762",
                                                "name": "Spaghetti frutti di mare",
                                                "description": "Mussels, shrimp, and squid simmer in a homemade tomato-wine sauce that's served over pasta in this main-dish recipe.",
                                                "price": "9.50",
                                                "primaryImageUrl": "http://lh5.ggpht.com/KioRENoZdDzKH-EJfQHtsjlSd3MfZT7v0j9XcmGs7l1SgB-_ybCu2m7hrH888n0s-MEFXdSOhzbaW6IWBwe5X5w",
                                                "tags": ["pasta", "#course:main_courses", "#diet:pescetarian"]
                                        },
                                        {
                                                "id": "6c098bd2443ca31180b69c0371390e57",
                                                "name": "Fusilli goat cheese and spinach",
                                                "description": "Spinach Pesto with Fusilli, Goat Cheese and Peppers. Serve with: Grated Carrot Salad.",
                                                "price": "8.50",
                                                "primaryImageUrl": "http://lh3.ggpht.com/_VsPUDOT5r9ShxxZUqcG6JDuamdoj5goKt1xsnCmX6lLgbdbgbh69jlMFBIo1P_icX0KQVcExBIcuppeIfYiSSE",
                                                "tags": ["pasta", "#course:main_courses", "#diet:vegetarian"]
                                        },
                                        {
                                                "id": "020d99cc7c0f43a03fa1bac2160041b2",
                                                "name": "Roast Mix",
                                                "description": "Served with roast duck, crispy pork belly and char siu roast pork with seasonal steamed greens on rice",
                                                "price": "8.95",
                                                "primaryImageUrl": "http://lh4.ggpht.com/2j4BAcPw-mCPApc2qvUSZpcEH39uFWnX5YnDMDKi0rX_D2YYosvf6SfiWBljTV24n8nYjaVg65PZRoFbeoh8XzA",
                                                "tags": ["pork"]
                                        }
                                ]
                        };
                                scope.addToBasket('cad2d2e8b16eb668f47b4f2827438951',false); //add risotto
                                scope.addToBasket('020d99cc7c0f43a03fa1bac2160041b2',false); //add roast mix
                                scope.addRemoveMeals('main',0,-1); //remove risotto
                                scope.addRemoveMeals('other',0,-1); //remove roast mix
                        });

                });

                it('should have no meals in basket' , function(){
                        setTimeout( function() {
                                expect(scope.order.total).toBe('0.00');
                                expect(scope.order.main.length).toBe(0);
                                expect(scope.order.other.length).toBe(0);
                                expect(scope.order.mainMeals).toBe(0);
                                expect(scope.order.otherMeals).toBe(0);
                        }, 100);
                });
        });


        //==================================================================================================
        //============================================= Testing routes =====================================
        //==================================================================================================
        describe(' test home route' , function(){
                var route, scope, location;
                beforeEach(
                        inject(function(_$location_ , _$rootScope_ , $httpBackend , _$route_){
                                scope = _$rootScope_;
                                route = _$route_;
                                location  = _$location_;
                                $httpBackend.expectGET('views/main.html').respond(200 , 'main html');
                        })
                );

                it(' should be main controller' , function(){
                        location.path('/');
                        scope.$digest();//call the digest loop
                        expect(route.current.controller).toBe('MainCtrl');
                });
                it(' should be main controller if non existing path' , function(){
                        location.path('/invalidPath/adasdads');
                        scope.$digest();//call the digest loop
                        expect(route.current.controller).toBe('MainCtrl');
                });
        });
/*
        describe(' test booking route' , function(){
                var route, scope, location;
                beforeEach(
                        inject(function(_$location_ , _$rootScope_ , $injector , $httpBackend , _$route_){
                                scope = _$rootScope_;
                                route = _$route_;
                                location  = _$location_;
                                $httpBackend.expectGET('views/booking.html').respond(200 , 'booking html');
                        })
                );

              it(' should be booking controller' , function(){
                        location.path('/booking');
                        scope.$digest();//call the digest loop
                        expect(route.current.controller).toBe('BookingController');
                });
        });

        describe(' test booking_v2 route' , function(){
                var route, scope, location;
                beforeEach(
                        inject(function(_$location_ , _$rootScope_ , $injector , $httpBackend , _$route_){
                                scope = _$rootScope_;
                                route = _$route_;
                                location  = _$location_;
                                $httpBackend.expectGET('views/booking_v2.html').respond(200 , 'booking html');
                        })
                );

              it(' should be booking controller' , function(){
                        location.path('/booking2');
                        scope.$digest();//call the digest loop
                        expect(route.current.controller).toBe('BookingController');
                });
        });*/


});