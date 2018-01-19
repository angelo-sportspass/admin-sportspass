(function() {
  'use strict';

  angular
    .module('app')
    .controller('MembersController', MembersController);

  /** @ngInject */
  MembersController.$inject = ['MemberService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function MembersController(MemberService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    
    vm.members = function() {
      MemberService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 100;

        $scope.memberList = response.data.members;
        $scope.count      = response.data.count;
      });
    };


    if ($state.current.url === '') {
      vm.members();
    }
    
  }

})();
