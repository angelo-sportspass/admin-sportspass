(function() {
  'use strict';

  angular
    .module('app')
    .controller('RetailerController', RetailerController);

  /** @ngInject */
  RetailerController.$inject = ['RetailerService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function RetailerController(RetailerService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
   
    vm.retailers = function() {
    
      RetailerService.getAll().then(function(response) {

        // $scope.currentPage = 1;
        // $scope.pageSize    = 10;
        console.log(response);
        $scope.retailersList = response.data.retailers;
        $scope.count        = response.data.count;
      });
    };

     $scope.getRetailer = function(id) {

      RetailerService.getOne(id).then(function(response){
        $scope.retailer = response.data;
      }, function(response) {
         $state.go('app.retailer.list');
         console.log(response);
      });

    };

    $scope.editRetailer = function(id) {

      $scope.retailer = {};
      $state.go('app.retailer.edit', {id: id});
      $scope.getRetailer(id);

    };

    $scope.deleteRetailer = function (id) {

      RetailerService.delete(id);
      $scope.retailersList = {};
      $state.go($state.current, {}, {reload: true});
      vm.retailers();
      //@todo remove element from the table
    };

     $scope.saveRetailer = function(form) {

      var retailer = angular.copy($scope.retailer);

      RetailerService.create(retailer).then(function(response) {
          console.log(response);
        
           $state.go($state.current, {}, {reload: true});
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateRetailer = function(form, id) {

      var retailer = angular.copy($scope.retailer);

      RetailerService.update(id, retailer).then(function(response) {

          $state.go($state.current, {}, {reload: true});
          console.log(response);

      }, function(response) {

         console.log(response);
      });

    };

    if ($state.params.id) {
       $scope.getRetailer($state.params.id);
    }

    if ($state.current.url === '') {
      vm.retailers();
    }
    
  }

})();
