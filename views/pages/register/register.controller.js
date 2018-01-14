(function() {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  RegisterController.$inject = ['$rootScope', '$scope', '$http', '$window', 'RegisterService'];
  function RegisterController($rootScope, $scope, $http, $window, RegisterService) {

  	var vm = this;
  
  	vm.register = function () {
  		
  		var data = {
  			user_name : vm.user_name,
  			password : vm.password,
        email : vm.email,
        first_name : vm.first_name,
        last_name : vm.last_name
  		};

  		var res = RegisterService.register(data).then(function (response) {
          console.log(response);
      });
  	}
  }

})();
