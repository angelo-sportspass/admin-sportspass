(function () {
  'use strict';

  angular
      .module('app')
      .factory('AccountService', AccountService);

      AccountService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function AccountService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/account/get-accounts');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/account/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/account/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/account', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/account/' + id);
         }

      	 return service;
      }
  })();