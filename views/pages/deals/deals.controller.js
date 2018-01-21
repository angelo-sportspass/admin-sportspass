(function() {
  'use strict';

  angular
    .module('app')
    .controller('DealsController', DealsController);

  /** @ngInject */
  DealsController.$inject = ['DealsService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', 'Upload', 'sportspass'];
  function DealsController(DealsService, $rootScope, $scope, $http, $window, $state, $stateParams, Upload, sportspass) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];

    vm.deals = function() {
      DealsService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.dealList = response.data.deals;
        $scope.count    = response.data.count;
      });
    };

    $scope.getDeals = function(id) {

      DealsService.getOne(id).then(function(response){
        $scope.deals = response.data;
      }, function(response) {
         $state.go('app.deals.list');
         console.log(response);
      });

    };

    $scope.editDeals = function(id) {

      $scope.deals = {};
      $state.go('app.deals.edit', {id: id});
      $scope.getDeals(id);

    };

    $scope.deleteDeals = function (id) {

      DealsService.delete(id);
      $state.go($state.current, {}, {reload: true});
      vm.deals();
      //@todo remove element from the table
    };

    $scope.saveDeals = function(form) {
      
      var deals = angular.copy($scope.deals);

      var data = {
        image : $scope.file,
        name: deals.name,
        description: deals.description,
        days: deals.days,
        hours: deals.hours,
        minutes: deals.minutes,
        button_title: deals.button_title
      };

      $scope.uploadAction(data);

    };

    /**
     * working file upload
     * @function Upload File
     */
    $scope.uploadAction = function (data) {
       console.log(data);
        Upload.upload({
            url: sportspass.baseUrl + '/deals',
            data: data,
            
        }).then(function (resp) {
            console.log(resp);
            
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        });
    };

    if ($state.params.id) {
       $scope.getDeals($state.params.id);
    }

    if ($state.current.url === '') {
      vm.deals();
    }

  }

})();
