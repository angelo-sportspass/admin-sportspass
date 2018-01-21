(function() {
  'use strict';

  angular
    .module('app')
    .controller('BannersController', BannersController);

  /** @ngInject */
  BannersController.$inject = ['BannerService', 'ProgramService', 'CategoryService', 'RetailerService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', 'Upload', 'sportspass'];
  function BannersController(BannerService, ProgramService, CategoryService, RetailerService, $rootScope, $scope, $http, $window, $state, $stateParams, Upload, sportspass) {

  	var vm = this;
    $scope.category_list = [];
    $scope.selected_list = [];
    $scope.banner_retailer = "";

    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    // Show All Clubs
  	vm.banners = function() {

      BannerService.getAll().then(function(response) {
        $scope.currentPage = 1;
        $scope.pageSize    = 50;

        $scope.bannerList = response.data.banners;
        $scope.count      = response.data.count;
      });

    };

    $scope.getBanner = function(id) {

      BannerService.getOne(id).then(function(response){
        $scope.banners = response.data;
      }, function(response) {
        $scope.go('app.banners.list');
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

      // var blob  = $scope.dataImage($scope.banners.image);
      // var image  = new File([blob], 'banner'+Math.random().toString(36).substring(7)+'.png', {type: "'image/png"});

      var data = {
        image : $scope.file,
        type: banners.type,
        banner_categories: $scope.selected_list,
        banner_retailer: $scope.banner_retailer,
        name: banners.name,
        url: banners.url,
        is_new_tab: (banners.is_new_tab) ? 1: 0,
        is_hot_offer: (banners.is_hot_offer) ? 1: 0,
        is_home_page: (banners.is_home_page) ? 1: 0,
        is_trending_offers: (banners.is_trending_offers)? 1: 0,
        is_trending_experiences: (banners.is_trending_experiences) ? 1: 0,
        is_default: (banners.is_default) ? 1: 0
      };

      $scope.uploadAction(data);

    };

    $scope.updateBanner = function(form, id) {
      
      var banners = angular.copy($scope.banners);

      var data = {
        id : id,
        image : $scope.file,
        type: banners.type,
        banner_categories: $scope.selected_list,
        banner_retailer: $scope.banner_retailer,
        name: banners.name,
        url: banners.url,
        is_new_tab: (banners.is_new_tab) ? 1: 0,
        is_hot_offer: (banners.is_hot_offer) ? 1: 0,
        is_home_page: (banners.is_home_page) ? 1: 0,
        is_trending_offers: (banners.is_trending_offers)? 1: 0,
        is_trending_experiences: (banners.is_trending_experiences) ? 1: 0,
        is_default: (banners.is_default) ? 1: 0,
        status: (banners.status) ? 1: 0
      };

       $scope.uploadAction(data);
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
          $scope.category_list.push({
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

    /**
     * working file upload
     * @function Upload File
     */
    $scope.uploadAction = function (data) {
       console.log(data);
        Upload.upload({
            method: 'POST',
            url: sportspass.baseUrl + '/banner/update-model',
            data: data,
            
        }).then(function (resp) {
            console.log(resp);
            
        }, function (resp) {
            console.log('Error status: ' + resp.status);
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
