(function () {
  'use strict';

  angular
      .module('app')
      .factory('MemberService', MemberService);

      MemberService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function MemberService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/member/get-members');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/member/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/member/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/member', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/member/' + id);
         }

      	 return service;
      }
  })();