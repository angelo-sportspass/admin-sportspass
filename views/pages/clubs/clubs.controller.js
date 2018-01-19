(function() {
  'use strict';

  angular
    .module('app')
    .controller('ClubsController', ClubsController);

  /** @ngInject */
  ClubsController.$inject = ['ClubsService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function ClubsController(ClubsService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;

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

      }, function(response) {

         console.log(response);
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

      var blobLogo  = $scope.dataImage($scope.clubs.logo);
      var blobBi    = $scope.dataImage($scope.clubs.banner_image);
      var blobFci   = $scope.dataImage($scope.clubs.front_card_image);
      var blobEhi   = $scope.dataImage($scope.clubs.email_header_image);

      var logo  = new File([blobLogo], 'logo.png', {type: "'image/png"});
      var banner_image  = new File([blobBi], 'banner_image.png', {type: "'image/png"});
      var front_card_image  = new File([blobFci], 'front_card_image.png', {type: "'image/png"});
      var email_header_image  = new File([blobEhi], 'email_header_image.png', {type: "'image/png"});

      var data = {
        logo : logo,
        banner_image: banner_image,
        front_card_image: front_card_image,
        email_header_image: email_header_image,
        name: clubs.name,
        club_prefix: clubs.club_prefix,
        link: clubs.link,
        is_barcode: clubs.is_barcode,
        expiry : clubs.expiry,
        sport_name: clubs.sport_name,
        officer: clubs.officer,
        officer_position: clubs.officer
      };

      ClubsService.createClub(data).then(function(response) {
          console.log(response);
          $state.go('app.clubs.list');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateClub = function(form, id) {

      var clubs = angular.copy($scope.clubs);

      var blobLogo  = $scope.dataImage($scope.clubs.logo);
      var blobBi    = $scope.dataImage($scope.clubs.banner_image);
      var blobFci   = $scope.dataImage($scope.clubs.front_card_image);
      var blobEhi   = $scope.dataImage($scope.clubs.email_header_image);

      var logo  = new File([blobLogo], 'logo.png', {type: "'image/png"});
      var banner_image  = new File([blobBi], 'banner_image.png', {type: "'image/png"});
      var front_card_image  = new File([blobFci], 'front_card_image.png', {type: "'image/png"});
      var email_header_image  = new File([blobEhi], 'email_header_image.png', {type: "'image/png"});

      var data = {
        logo : logo,
        banner_image: banner_image,
        front_card_image: front_card_image,
        email_header_image: email_header_image,
        name: clubs.name,
        club_prefix: clubs.club_prefix,
        link: clubs.link,
        is_barcode: clubs.is_barcode,
        expiry : clubs.expiry,
        sport_name: clubs.sport_name,
        officer: clubs.officer,
        officer_position: clubs.officer
      };

      ClubsService.updateClub(id, data).then(function(response) {

        state.go($state.current, {}, {reload: true});
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


    // Bug in Club Checkbox
    // $scope.optionBarcode = function() {
    //   var barcode = angular.element( document.querySelector( '#is_barcode' ) );

    //   if (barcode.is(':checked')) {
        
    //     barcode.attr('ng-model', 'clubs.is_barcode');
    //   } else {

    //     barcode.removeAttr('ng-model');
    //   }

    // }

    if ($state.params.id) {
       $scope.getClub($state.params.id);
    }

    if ($state.current.url === '') {
      vm.clubs();
    }
    //$scope.optionBarcode();
  }

})();
