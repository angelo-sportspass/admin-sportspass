(function() {
  'use strict';

  angular
    .module('app')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  CategoryController.$inject = ['$rootScope', '$scope', '$http', '$window', '$state', 'Upload'];
  function CategoryController($rootScope, $scope, $http, $window, $state, $stateParams, Upload) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    // Show All Clubs
  	vm.categories = function() {
      // BannerService.getAll().then(function(response) {

      //   $scope.currentPage = 1;
      //   $scope.pageSize    = 10;

      //   $scope.memberList = response.data.banners;
      //   $scope.count      = response.data.count;
      // });
    };


    vm.categories();

  }

})();
