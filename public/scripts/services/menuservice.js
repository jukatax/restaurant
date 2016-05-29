'use strict';

/**
 * @ngdoc service
 * @name restaurant.Menuservice
 * @description
 * # MenuService
 * Service in the restaurant.
 */
angular.module('restaurant')
	.factory('MenuService', ['$http', function ($http) {
		var service = {
			get: get
		};

		return service;

		function get () {
			return $http.get('data/menu.json');
		}
	}]);

