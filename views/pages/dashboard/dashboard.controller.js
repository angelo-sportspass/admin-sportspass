(function() {
  'use strict';

  angular
    .module('app')
    .controller('DashboardController', DashboardController)

  /** @ngInject */
  function DashboardController($rootScope) {
    var vm = this;

 	console.log($rootScope.$state);
    // vm.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  }

})();
