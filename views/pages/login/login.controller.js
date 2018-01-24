(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  /** @ngInject */
  LoginController.$inject = ['LoginService', '$rootScope', '$scope', '$http', '$window', '$state'];
  function LoginController(LoginService, $rootScope, $scope, $http, $window, $state) {

  	var vm = this;

    vm.errorMessage = "";
   
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
      }, function(error) {
          if (error.status == 404) {
            vm.errorMessage = 'User ' + error.statusText + '.';
          } else if (error.status == 403) {
            vm.errorMessage = 'Username / Password invalid.';
          }
      });
  	}
  }

})();
