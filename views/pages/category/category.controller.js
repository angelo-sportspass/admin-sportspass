(function() {
  'use strict';

  angular
    .module('app')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  CategoryController.$inject = ['$rootScope', '$scope', '$http', '$window', '$state'];
  function CategoryController($rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];


  }

})();
