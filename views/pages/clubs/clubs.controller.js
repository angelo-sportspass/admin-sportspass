(function() {
  'use strict';

  angular
    .module('app')
    .controller('ClubsController', ClubsController);

  /** @ngInject */
  ClubsController.$inject = ['ClubsService', '$rootScope', '$scope', '$http', '$window', '$state', '$location'];
  function ClubsController(ClubsService, $rootScope, $scope, $http, $window, $state, $stateParams, $location, $route, $routeParams) {

  	var vm = this;

    // Show All Clubs
  	vm.clubs = function() {
      ClubsService.getAll().then(function(response) {
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
      var blob  = $scope.dataImage($scope.clubs.logo);
      var file  = new File([blob], 'fileName.jpeg', {type: "'image/jpeg"});
      
      var data = {
        logo : angular.fromJson(file),
        name: clubs.name,
        club_prefix: clubs.club_prefix,
        link: clubs.link,
        is_barcode: clubs.is_barcode,
        expiry : clubs.expiry
      };
      // console.log(data);
      // return false;
      //var clubs = angular.copy($scope.clubs);

      ClubsService.create(data).then(function(response) {
          console.log(response);
          $state.go('app.clubs.list');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateClub = function(form, id) {

      var clubs = angular.copy($scope.clubs);

      ClubsService.update(id, clubs).then(function(response) {

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

    vm.clubs();
    //$scope.optionBarcode();
  }

})();
