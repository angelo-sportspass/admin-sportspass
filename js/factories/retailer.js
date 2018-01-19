(function () {
  'use strict';

  angular
      .module('app')
      .factory('RetailerService', RetailerService);

      RetailerService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function RetailerService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/retailer');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/retailer/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/retailer/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/retailer', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/retailer/' + id);
         }

      	 return service;
      }
  })();