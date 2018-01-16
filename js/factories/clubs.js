(function () {
  'use strict';

  angular
      .module('app')
      .factory('ClubsService', ClubsService);

      ClubsService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function ClubsService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/club/get-clubs');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/club/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/club/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/club', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/club/' + id);
         }

      	 return service;
      }
  })();