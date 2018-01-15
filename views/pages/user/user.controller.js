(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  /** @ngInject */
  UserController.$inject = ['UserService', '$rootScope', '$scope', '$http', '$window', '$state', '$location'];
  function UserController(UserService, $rootScope, $scope, $http, $window, $state, $stateParams, $location, $route, $routeParams) {

  	var vm = this;

    // Show All Users
  	$scope.users = function() {
      UserService.getAll().then(function(response){
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

      vm.getUser(id);
    };

    $scope.deleteUser = function (id) {

      UserService.delete(id);
      $state.go($state.current, {}, {reload: true});

      $scope.users();
      //@todo remove element from the table
    };

    $scope.saveUser = function(form) {

      var user = angular.copy($scope.user);

      var data = {
        user_name: user.user_name,
        first_name: user.first_name,
        password: user.password,
        email: user.email,
        last_name: user.last_name
      };
      
      UserService.create(data).then(function(response) {
          console.log(response);
          $state.go('/user');
      }, function(response) {

         console.log(response);
      });
    };

    $scope.updateUser = function(form, id) {

      var user = angular.copy($scope.user);

      var data = {
        user_name: user.user_name,
        first_name: user.first_name,
        email: user.email,
        last_name: user.last_name
      };

      UserService.update(id, data).then(function(response) {
          console.log(response);

      }, function(response) {

         console.log(response);
      });

    };

    if ($state.params.id) {
       $scope.getUser($state.params.id);
    }

    $scope.users();

  }

})();
