(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

  /** @ngInject */
  DashboardController.$inject = ['$rootScope', '$scope', '$http', '$window', '$state', '$location', '$stateParams'];
  function DashboardController($rootScope, $scope, $http, $window, $state, $stateParams, $location) {
    var vm = this;

 	  $scope.user = JSON.parse(localStorage.getItem('user'));

    // vm.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  }

})();
