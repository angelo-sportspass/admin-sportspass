(function() {
  'use strict';

  angular
    .module('app')
    .controller('AccountController', AccountController);

  /** @ngInject */
  AccountController.$inject = ['AccountService', 'ProgramService', '$rootScope', '$scope', '$http', '$window', '$state', '$location'];
  function AccountController(AccountService, ProgramService, $rootScope, $scope, $http, $window, $state, $stateParams, $location, $route, $routeParams) {

  	var vm = this;

    // Show All Account
  	$scope.account = function() {
      AccountService.getAll().then(function(response) {
        $scope.accountList = response.data.accounts;
        $scope.count    = response.data.count;
      });
    };

    $scope.getAccount = function(id) {

      AccountService.getOne(id).then(function(response){

        $scope.account = response.data;

        console.log($scope.account);

      }, function(response) {

         console.log(response);
      });
    };

    $scope.editAccount = function(id) {

      $scope.account = {};
      $state.go('app.account.edit', {id: id});

      $scope.getAccount(id);

    };

    $scope.deleteAccount = function (id) {

      AccountService.delete(id);
      $state.go($state.current, {}, {reload: true});

      $scope.account();
      //@todo remove element from the table
    };

    
    $scope.saveAccount = function(form) {

      var account = angular.copy($scope.account);

      AccountService.create(account).then(function(response) {
          console.log(response);
          $state.go('/account');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateAccount = function(form, id) {

      var account = angular.copy($scope.account);

      AccountService.update(id, account).then(function(response) {
          console.log(response);

      }, function(response) {

         console.log(response);
      });

    };

    $scope.getAllProgram = function() {
      ProgramService.getAll().then(function(response) {
        $scope.programList = response.data.programs;
      });
    }

    if ($state.params.id) {
       $scope.getAccount($state.params.id);
    }

    $scope.getAllProgram();
    $scope.account();
  }

})();
