(function() {
  'use strict';

  angular
    .module('app')
    .controller('MembersController', MembersController);

  /** @ngInject */
  MembersController.$inject = ['$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function MembersController($rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    

  }

})();
