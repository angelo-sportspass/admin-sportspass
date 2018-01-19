(function() {
  'use strict';

  angular
    .module('app')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  CategoryController.$inject = ['CategoryService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function CategoryController(CategoryService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    vm.categories = function() {
      CategoryService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.categoryList = response.data.categories;
        $scope.count        = response.data.count;
      });
    };

    if ($state.current.url === '') {
      vm.categories();
    }
    
  }

})();
