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

    $scope.getMember= function(id) {

      MemberService.getOne(id).then(function(response){
        $scope.members = response.data;
      }, function(response) {
         $state.go('app.members.list');
         console.log(response);
      });

    };

    $scope.editMember = function(id) {

      $scope.members = {};
      $state.go('app.members.edit', {id: id});

      $scope.getMember(id);

    };

    $scope.deleteMember = function (id) {

      MemberService.delete(id);
      $state.go($state.current, {}, {reload: true});

      vm.members();
      //@todo remove element from the table
    };

    $scope.saveMember = function(form) {

      var members = angular.copy($scope.members);

      MemberService.create(members).then(function(response) {
          console.log(response);
           $state.go('app.members.list');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateMember = function(form, id) {

      var members = angular.copy($scope.members);

      MemberService.update(id, members).then(function(response) {

          $state.go($state.current, {}, {reload: true});
          console.log(response);

      }, function(response) {

         console.log(response);
      });

    };

    if ($state.params.id) {
       $scope.getMember($state.params.id);
    }

    if ($state.current.url === '') {
      vm.members();
    }
    
  }

})();
