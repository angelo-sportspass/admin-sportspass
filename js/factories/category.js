(function () {
  'use strict';

  angular
      .module('app')
      .factory('CategoryService', CategoryService);

      CategoryService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function CategoryService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/category/get-categories');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/category/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/category/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/category', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/category/' + id);
         }

         service.categorySort = function(data) {

          // var config = {
          //     method: 'POST',
          //     url: sportspass.baseUrl + '/category/category-sort', // /api/upload
          //     headers: {
          //       'Content-Type': "application/json"
          //     },
          //     data: data
          // };

          // return $http(config);
          return $http.post( sportspass.baseUrl + '/category/category-sort', data);
         }

      	 return service;
      }
  })();