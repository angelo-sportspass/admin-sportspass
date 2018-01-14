(function () {
  'use strict';

  angular
      .module('app')
      .factory('UserService', UserService);

      UserService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function UserService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function(data){
      	 	return $http.get( sportspass.baseUrl + '/user');
      	 }

      	 return service;
      }
  })();