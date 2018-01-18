(function () {
  'use strict';

  angular
      .module('app')
      .factory('BannerService', BannerService);

      BannerService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function BannerService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/banner/get-banners');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/banner/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/banner/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/banner', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/banner/' + id);
         }

      	 return service;
      }
  })();