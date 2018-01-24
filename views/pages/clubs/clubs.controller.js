(function() {
  'use strict';

  angular
    .module('app')
    .controller('ClubsController', ClubsController);

  /** @ngInject */
  ClubsController.$inject = ['ClubsService', 'BannerService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', 'aws'];
  function ClubsController(ClubsService, BannerService, $rootScope, $scope, $http, $window, $state, $stateParams, aws) {

  	var vm = this;

    $scope.newField = {};
    $scope.fields = [ ];

    $scope.imgbanner = [];
    $scope.clubBanners = "";

    $scope.filelogo   = '';
    $scope.filebanner = '';
    $scope.filefront  = '';
    $scope.fileemail  = '';

    $scope.isLogoChange = 0;
    $scope.isBannerChange = 0;
    $scope.isFrontChange = 0;
    $scope.isEmailChange = 0;

    $scope.preFormFields = {};

    $scope.user = JSON.parse(localStorage.getItem('user'));

    // Show All Clubs
  	vm.clubs = function() {
      ClubsService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.clubList = response.data.clubs;
        $scope.count    = response.data.count;
      });
    };

    $scope.getClub = function(id) {

      ClubsService.getOne(id).then(function(response){

        $scope.clubs = response.data;

        $scope.filelogo   = $scope.clubs.logo;
        $scope.filebanner = $scope.clubs.banner_image;
        $scope.filefront  = $scope.clubs.front_card_image;
        $scope.fileemail  = $scope.clubs.email_header_image;


        $scope.fields = JSON.parse($scope.clubs.form);

      }, function(response) {
         console.log(response);
      });

      ClubsService.getClubBanners(id).then(function(response){
        $scope.clubBanners = response.data.clubBanners;
      });
    };

    $scope.editClub = function(id) {

      $scope.clubs = {};
      $state.go('app.clubs.edit', {id: id});

      $scope.getClub(id);

    };

    $scope.deleteClub = function (id) {

      ClubsService.delete(id);
      $state.go($state.current, {}, {reload: true});

      vm.clubs();
      //@todo remove element from the table
    };

    $scope.saveClub = function(form) {

      var clubs = angular.copy($scope.clubs);

      var filelogo   = $scope.upload($scope.filelogo, 'create');
      var filebanner = $scope.upload($scope.filebanner, 'create');
      var filefront  = $scope.upload($scope.filefront, 'create');
      var fileemail  = $scope.upload($scope.fileemail, 'create');

      var data = {
        logo : filelogo,
        banner_image: filebanner,
        front_card_image: filefront,
        email_header_image: fileemail,
        club_banners: $scope.imgbanner,
        name: clubs.name,
        club_prefix: clubs.club_prefix,
        link: clubs.link,
        is_barcode: clubs.is_barcode,
        expiry : clubs.expiry,
        sport_name: clubs.sport_name,
        officer: clubs.officer,
        officer_position: clubs.officer,
        form: JSON.stringify($scope.fields)
      };

      ClubsService.create(data).then(function(response) {
          console.log(response);
          $state.go('app.clubs.list');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateClub = function(form, id) {

      var clubs = angular.copy($scope.clubs);

      angular.forEach($scope.clubBanners, function(value, key) {
        $scope.imgbanner.push(value.id);
      });

      if ($scope.isLogoChange == 1) {
        var filelogo   = $scope.upload($scope.filelogo, 'create');
      }
      
      if ($scope.isBannerChange == 1) {
        var filebanner = $scope.upload($scope.filebanner, 'create');
      }

      if ($scope.isFrontChange == 1) {
        var filefront  = $scope.upload($scope.filefront, 'create');
      }
      
      if ($scope.isEmailChange == 1) {
        var fileemail  = $scope.upload($scope.fileemail, 'create');
      }
      
      var data = {
        logo : filelogo,
        banner_image: filebanner,
        front_card_image: filefront,
        email_header_image: fileemail,
        name: clubs.name,
        club_banners: $scope.imgbanner,
        club_prefix: clubs.club_prefix,
        link: clubs.link,
        is_barcode: clubs.is_barcode,
        expiry : clubs.expiry,
        sport_name: clubs.sport_name,
        officer: clubs.officer,
        officer_position: clubs.officer,
        form: JSON.stringify($scope.fields)
      };

      if ($scope.isLogoChange == 0) {
        delete data['logo'];
      }
      
      if ($scope.isBannerChange == 0) {
        delete data['banner_image'];
      }

      if ($scope.isFrontChange == 0) {
        delete data['front_card_image'];
      }
      
      if ($scope.isEmailChange == 0) {
        delete data['email_header_image'];
      }

      ClubsService.update(id, data).then(function(response) {

        $state.go($state.current, {}, {reload: true});
        console.log(response);

      }, function(response) {

         console.log(response);
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

    vm.getAllBannersFiltered = function() {
      BannerService.getBannerFilter().then(function(response){
        $scope.bannerList = response.data.banners;
        $scope.count      = response.data.count;
      });
    }

    vm.getAllBanners = function() {
      BannerService.getAll().then(function(response){
        $scope.bannerList = response.data.banners;
        $scope.count      = response.data.count;
      });
    }

    $scope.uniqueString = function() {
      var text     = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 8; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    $scope.logochange = function() {
      $scope.isLogoChange = 1;
    }

    $scope.bannerchange = function() {
      $scope.isBannerChange = 1;
    }

    $scope.frontchange = function() {
      $scope.isFrontChange = 1;
    }

    $scope.emailchange = function() {
      $scope.isEmailChange = 1;
    }

     if ($state.params.id) {
       $scope.getClub($state.params.id);
       vm.getAllBannersFiltered();
    } else {
      vm.getAllBanners();
    }

    /******** Dynamic Form ****/
    $scope.editing = false;
    $scope.tokenize = function(slug1, slug2) {
      var result = slug1;
      result = result.replace(/[^-a-zA-Z0-9,&\s]+/ig, '');
      result = result.replace(/-/gi, "_");
      result = result.replace(/\s/gi, "-");
      if (slug2) {
        result += '-' + $scope.token(slug2);
      }
      return result;
    };

    $scope.saveField = function() {
      console.log("entered save");
      if ($scope.newField.type == 'checkboxes') {
        $scope.newField.value = {};
      }
      if ($scope.editing !== false) {
        $scope.fields[$scope.editing] = $scope.newField;
        $scope.editing = false;
      } else {
        $scope.fields.push($scope.newField);
      }
      $scope.newField = {
        order : 0
      };
    };
    $scope.editField = function(field) {
      $scope.editing = $scope.fields.indexOf(field);
      $scope.newField = field;
    };
    $scope.splice = function(field, fields) {
      fields.splice(fields.indexOf(field), 1);
    };
    $scope.addOption = function() {
      if ($scope.newField.options === undefined) {
        $scope.newField.options = [];
      }
      $scope.newField.options.push({
        order : 0
      });
    };
    $scope.typeSwitch = function(type) {
      /*if (angular.Array.indexOf(['checkboxes','select','radio'], type) === -1)
        return type;*/
      if (type == 'checkboxes')
        return 'multiple';
      if (type == 'select')
        return 'multiple';
      if (type == 'radio')
        return 'multiple';

      return type;
    }

    if ($state.current.url === '') {
      vm.clubs();
    }
    //$scope.optionBarcode();
  }

})();
