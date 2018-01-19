(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProgramController', ProgramController);

  /** @ngInject */
  ProgramController.$inject = ['ProgramService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', '$location'];
  function ProgramController(ProgramService, $rootScope, $scope, $http, $window, $state, $stateParams, $location, $route, $routeParams) {

  	var vm = this;

    // Show All Users
  	vm.programs = function() {
      ProgramService.getAll().then(function(response) {
        $scope.currentPage = 1;
        $scope.pageSize    = 10;
        $scope.programList = response.data.programs;
        $scope.count    = response.data.count;
      });
    };

    $scope.getProgram = function(id) {

      ProgramService.getOne(id).then(function(response){

        $scope.program = response.data;

      }, function(response) {

         console.log(response);
      });
    };

    $scope.editProgram = function(id) {

      $scope.program = {};
      $state.go('app.program.edit', {id: id});

      $scope.getProgram(id);

    };

    $scope.deleteProgram = function (id) {

      ProgramService.delete(id);
      $state.go($state.current, {}, {reload: true});

      vm.programs();
      //@todo remove element from the table
    };

    $scope.saveProgram = function(form) {

      var program = angular.copy($scope.program);

      ProgramService.create(program).then(function(response) {
          console.log(response);
           $state.go('app.program.list');
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateProgram = function(form, id) {

      var program = angular.copy($scope.program);

      ProgramService.update(id, program).then(function(response) {

          $state.go($state.current, {}, {reload: true});
          console.log(response);

      }, function(response) {

         console.log(response);
      });

    };

    if ($state.params.id) {
       $scope.getProgram($state.params.id);
    }

    vm.programs();
  }

})();
