(function() {
  'use strict';

  angular
    .module('app')
    .controller('DealsController', DealsController);

  /** @ngInject */
  DealsController.$inject = ['$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function DealsController($rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];



  }

})();
