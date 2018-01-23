(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

  /** @ngInject */
  DashboardController.$inject = ['$rootScope', '$scope', '$http', '$window', '$state', '$location', '$stateParams'];
  function DashboardController($rootScope, $scope, $http, $window, $state, $stateParams, $location) {
    var vm = this;

    $scope.totalAccounts      = 0;
    $scope.totalClubMembers   = 0;
    $scope.totalCardsCreated  = 0;
    $scope.totalMembersOnline = 0;
    
 	  $scope.user = JSON.parse(localStorage.getItem('user'));

    // vm.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  }

})();
