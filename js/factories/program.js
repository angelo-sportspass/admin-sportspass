(function () {
  'use strict';

  angular
      .module('app')
      .factory('ProgramService', ProgramService);

      ProgramService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function ProgramService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/program/get-programs');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/program/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/program/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/program', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/program/' + id);
         }

      	 return service;
      }
  })();