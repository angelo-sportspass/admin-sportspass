(function() {
  'use strict';

  angular
    .module('app')
    .controller('BannersController', BannersController);

  /** @ngInject */
  BannersController.$inject = ['BannerService', 'ProgramService', '$rootScope', '$scope', '$http', '$window', '$state', 'Upload'];
  function BannersController(BannerService, ProgramService, $rootScope, $scope, $http, $window, $state, $stateParams, Upload) {

  	var vm = this;

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

      vm.clubs();
      //@todo remove element from the table
    };

    $scope.saveBanner = function(form) {

    };

    $scope.editBanner = function(form) {

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
    }

    if ($state.params.id) {
       $scope.getClub($state.params.id);
    }

    $scope.getAllProgram();
    vm.banners();

  }

})();
