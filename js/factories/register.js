(function () {
  'use strict';

  angular
      .module('app')
      .factory('RegisterService', RegisterService);

      RegisterService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function RegisterService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.register = function(data){
      	 	return $http.post( sportspass.baseUrl + '/user', data);
      	 }

      	 return service;
      }
  })();