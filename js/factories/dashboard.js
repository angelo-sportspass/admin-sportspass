(function () {
  'use strict';

  angular
      .module('app')
      .factory('DashboardService', DashboardService);

      DashboardService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function DashboardService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

         
      	 return service;
      }
  })();