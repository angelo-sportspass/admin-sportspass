(function () {
  'use strict';

  angular
      .module('app')
      .factory('LoginService', LoginService);

      LoginService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function LoginService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.login = function(data){
      	 	return $http.post( sportspass.baseUrl + '/user/login', data);
      	 }

      	 return service;
      }
  })();