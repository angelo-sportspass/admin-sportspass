(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  /** @ngInject */
  UserController.$inject = ['UserService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', '$location'];
  function UserController(UserService, $rootScope, $scope, $http, $window, $state, $stateParams, $location, $route, $routeParams) {

  	var vm = this;

    // Show All Users
  	vm.users = function() {
      UserService.getAll().then(function(response){
        $scope.currentPage = 1;
        $scope.pageSize    = 10;
        $scope.userList = response.data.users;
        $scope.count    = response.data.count;
      });
    };

    $scope.getUser = function(id) {
      UserService.getOne(id).then(function(response){

        $scope.user = response.data;

      }, function(response) {

         console.log(response);
      });
    };

    $scope.editUser = function(id) {

      $scope.user = {};
      $state.go('app.user.edit', {id: id});

      $scope.getUser(id);
    };

    $scope.deleteUser = function (id) {

      UserService.delete(id);
      $state.go($state.current, {}, {reload: true});
      
      vm.users();
      //@todo remove element from the table
    };

    $scope.saveUser = function(form) {

      var user = angular.copy($scope.user);
      
      UserService.create(user).then(function(response) {
          
          $state.go('app.user.list');

      }, function(response) {

         console.log(response);
      });
    };

    $scope.updateUser = function(form, id) {

      var user = angular.copy($scope.user);

      UserService.update(id, user).then(function(response) {
        $state.go($state.current, {}, {reload: true});
        console.log(response);
      }, function(response) {

         console.log(response);
      });

    };

    if ($state.params.id) {
       $scope.getUser($state.params.id);
    }

    vm.users();

  }

})();
