(function () {
  'use strict';

  angular
      .module('app')
      .factory('UserService', UserService);

      UserService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function UserService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/user/get-users');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/user/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/user/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/user', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/user/' + id);
         }

      	 return service;
      }
  })();