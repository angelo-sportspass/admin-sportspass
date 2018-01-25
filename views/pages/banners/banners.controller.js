(function() {
  'use strict';

  angular
    .module('app')
    .controller('BannersController', BannersController);

  /** @ngInject */
  BannersController.$inject = ['BannerService', 'ProgramService', 'CategoryService', 'RetailerService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', 'Upload', 'sportspass', 'aws'];
  function BannersController(BannerService, ProgramService, CategoryService, RetailerService, $rootScope, $scope, $http, $window, $state, $stateParams, Upload, sportspass, aws) {

  	var vm      = this;
    $scope.user = JSON.parse(localStorage.getItem('user'));
     
    $scope.category_list = [];
    $scope.category_selected = "";
    $scope.selected_list = [];
    $scope.banner_retailer = "";
    $scope.isChanged = 0;
    $scope.file = "";
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    // Show All Clubs
  	vm.banners = function() {

      BannerService.getAll().then(function(response) {
        $scope.currentPage = 1;
        $scope.pageSize    = 20;

        $scope.bannerList = response.data.banners;
        $scope.count      = response.data.count;
      });

    };

    $scope.getBanner = function(id) {

      BannerService.getOne(id).then(function(response){
        $scope.banners = response.data;

        if ($scope.banners) {

          BannerService.getBannerCategories(id).then(function(response) {
            if (response.data.bannerCategories) {
               $scope.selected_list = response.data.bannerCategories;
            }
           
          });

          BannerService.getBannerRetailer(id).then(function(response) {

              if (response.data.bannerRetailer) {
                $scope.banner_retailer = response.data.bannerRetailer.id;
              }
              
          });

          $scope.file = $scope.banners.image;

        }
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
      
      var arry = [];

      angular.forEach($scope.selected_list, function(value, key){
        arry.push(value.id);
      });

      var banners = angular.copy($scope.banners);
      var  image  = $scope.upload($scope.file, 'create');
    
      var data = {
        image : image,
        type: banners.type,
        banner_categories: arry,
        banner_retailer: ($scope.banner_retailer === null) ? '' : $scope.banner_retailer,
        name: banners.name,
        url: banners.url,
        is_new_tab: (banners.is_new_tab) ? 1: 0,
        is_hot_offer: (banners.is_hot_offer) ? 1: 0,
        is_home_page: (banners.is_home_page) ? 1: 0,
        is_trending_offers: (banners.is_trending_offers)? 1: 0,
        is_trending_experiences: (banners.is_trending_experiences) ? 1: 0,
        is_default: (banners.is_default) ? 1: 0
      };

      BannerService.create(data).then(function(response) {
          $state.go('app.banners.list');
          console.log(response);
      }, function(response) {
         console.log(response);
      });

    };

    $scope.updateBanner = function(form, id) {
      
      var data = [];
      var arry = [];
      var image = null;

      if ($scope.selected_list) {
        angular.forEach($scope.selected_list, function(value, key){
          arry.push(value.id);
        });
      }

      var banners = angular.copy($scope.banners);

      image = $scope.upload($scope.file, 'update');

      data = {
        image: image,
        type: banners.type,
        banner_categories: arry,
        banner_retailer: ($scope.banner_retailer === null) ? '' : $scope.banner_retailer,
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

      if ($scope.isChanged == 0) {
        delete data['image'];
      }

      BannerService.update(id, data).then(function(response) {
         $state.go('app.banners.edit', {id: id});
         console.log(response);
      }, function(response) {
          alert('Error, editing data.');
         $state.go('app.banners.edit', {id: id});
      });
       
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
        $scope.retailerList = response.data.retailers;
      });
    };

    $scope.changeImage = function(element) {
      $scope.isChanged = 1;
      var elem = angular.element(document.querySelector(".pre.banner-image-wrapper"));
      elem.remove();
    };

    $scope.upload = function(file, type) {

      $scope.awsImageLink = "";

      AWS.config.update({ accessKeyId: $scope.user.aws.access_key, secretAccessKey: $scope.user.aws.secrete_key });
      AWS.config.region = $scope.user.aws.region;

      var bucket = new AWS.S3({ params: { Bucket: $scope.user.aws.bucket } });

      if(file) {
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = $scope.uniqueString() + '-' + file.name;

        var params = { Key: 'Staging/' + uniqueFileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {

          if(err) {
            console.log(error);
          }
        });

        return (file) ? $scope.awsImageLink = aws.s3StagingLink + '/' + uniqueFileName : '';
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    };

    $scope.uniqueString = function() {
      var text     = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 8; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

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
