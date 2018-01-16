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
  	$scope.clubs = function() {
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

      $scope.clubs();
      //@todo remove element from the table
    };

    $scope.saveClub = function(form) {

      var clubs = angular.copy($scope.clubs);

      ClubsService.create(clubs).then(function(response) {
          console.log(response);
          $state.go('/clubs');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateClub = function(form, id) {

      var clubs = angular.copy($scope.clubs);

      console.log(clubs.is_barcode);
      return false;

      ClubsService.update(id, clubs).then(function(response) {
          console.log(response);

      }, function(response) {

         console.log(response);
      });

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

    $scope.clubs();
    //$scope.optionBarcode();
  }

})();
