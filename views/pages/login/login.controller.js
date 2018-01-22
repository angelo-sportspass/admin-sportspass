(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  /** @ngInject */
  LoginController.$inject = ['LoginService', '$rootScope', '$scope', '$http', '$window', '$state'];
  function LoginController(LoginService, $rootScope, $scope, $http, $window, $state) {

  	var vm = this;
  
  	vm.login = function () {
  		
  		var data = {
  			user_name : vm.user_name,
  			password : vm.password
  		};

  		var res = LoginService.login(data).then(function (response) {

          var user = JSON.stringify(response.data);
          localStorage.setItem('user', user);
          console.log(user);
          
          $state.go('app.main');
      });
  	}
  }

})();
