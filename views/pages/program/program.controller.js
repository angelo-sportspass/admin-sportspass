(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProgramController', ProgramController);

  /** @ngInject */
  ProgramController.$inject = ['ProgramService', '$rootScope', '$scope', '$http', '$window', '$state', '$location'];
  function ProgramController(ProgramService, $rootScope, $scope, $http, $window, $state, $stateParams, $location, $route, $routeParams) {

  	var vm = this;

    // Show All Users
  	$scope.programs = function() {
      ProgramService.getAll().then(function(response) {
        $scope.programList = response.data.programs;
        $scope.count    = response.data.count;
      });
    };

    $scope.programs();
  }

})();
