(function() {
  'use strict';

  angular
    .module('app')
    .controller('BannersController', BannersController);

  /** @ngInject */
  BannersController.$inject = ['BannerService', 'ProgramService', 'CategoryService', 'RetailerService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function BannersController(BannerService, ProgramService, CategoryService, RetailerService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    $scope.categoryList = [];

    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    // Show All Clubs
  	vm.banners = function() {
      BannerService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.bannerList = response.data.banners;
        $scope.count      = response.data.count;
      });
    };

    $scope.getBanner = function(id) {

      BannerService.getOne(id).then(function(response){

        $scope.banners = response.data;

      }, function(response) {

         console.log(response);
      });
    };

    $scope.editBanner = function(id) {

      $scope.banners = {};
      $state.go('app.banners.edit', {id: id});

      $scope.getBanner(id);

    };

    $scope.deleteBanner = function (id) {

      BannerService.delete(id);
      $state.go($state.current, {}, {reload: true});

      vm.banners();
      //@todo remove element from the table
    };

    $scope.saveBanner = function(form) {
      
      var banners = angular.copy($scope.banners);

      var blob  = $scope.dataImage($scope.banners.image);
      var image  = new File([blob], 'banner'+Math.random().toString(36).substring(7)+'.png', {type: "'image/png"});

      var data = {
        image : image,
        type: banners.type,
        // banner_categories: selectedList,
        banner_retailer: banner_retailer,
        name: banners.name,
        url: banners.url,
        is_new_tab: banners.is_new_tab,
        is_hot_offer: banners.is_hot_offer,
        is_home_page: banners.is_home_page,
        is_trending_offers: banners.is_trending_offers,
        is_trending_experiences: banners.is_trending_experiences,
        is_default: banners.is_default
      };


      BannerService.createBanner(data).then(function(response) {
          console.log(response);
          $state.go('app.banners.list');
      }, function(response) {

         console.log(response);
      });
    };

    $scope.updateBanner = function(form) {

    };

    $scope.dataImage = function(dataURI) {

      var byteString;

      if (dataURI.split(',')[0].indexOf('base64') >= 0)
          byteString = atob(dataURI.split(',')[1]);
      else
          byteString = unescape(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to a typed array
      var ia = new Uint8Array(byteString.length);

      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      return new Blob([ia], {type:mimeString});
    };

    $scope.getAllProgram = function() {
      ProgramService.getAll().then(function(response) {
        $scope.programList = response.data.programs;
      });
    };

    $scope.getAllCategories = function() {
      CategoryService.getAll().then(function(response) {
      
        angular.forEach(response.data.categories, function(value, key){
          $scope.categoryList.push({
            id: value.id,
            name: value.name
          });
        });
        
      });
    };

    $scope.getAllRetailers = function() {
      RetailerService.getAll().then(function(response) {
      
        $scope.retailerList = response.data;
      });
    };

    if ($state.params.id) {
       $scope.getBanner($state.params.id);
    }

    $scope.getAllRetailers();
    $scope.getAllCategories();
    $scope.getAllProgram();

    if ($state.current.url === '') {
      vm.banners();
    }

  }

})();
