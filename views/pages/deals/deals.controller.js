(function() {
  'use strict';

  angular
    .module('app')
    .controller('DealsController', DealsController);

  /** @ngInject */
  DealsController.$inject = ['DealsService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function DealsController(DealsService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    vm.deals = function() {
      DealsService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.dealList = response.data.deals;
        $scope.count    = response.data.count;
      });
    };

    if ($state.current.url === '') {
      vm.deals();
    }

  }

})();
