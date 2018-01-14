(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserController', UserController);

  /** @ngInject */
  UserController.$inject = ['UserService', '$rootScope', '$scope', '$http', '$window', '$state'];
  function UserController(UserService, $rootScope, $scope, $http, $window, $state) {

  	var vm = this;
  
  	vm.users = UserService.getAll();

    console.log(vm.users);
  }

})();
