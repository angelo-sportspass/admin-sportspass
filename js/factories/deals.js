(function () {
  'use strict';

  angular
      .module('app')
      .factory('DealsService', DealsService);

      DealsService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function DealsService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/deals/get-deals');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/deals/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/deals/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/deals', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/deals/' + id);
         }

      	 return service;
      }
  })();