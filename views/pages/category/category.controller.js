(function() {
  'use strict';

  angular
    .module('app')
    .controller('CategoryController', CategoryController);

  /** @ngInject */
  CategoryController.$inject = ['CategoryService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams'];
  function CategoryController(CategoryService, $rootScope, $scope, $http, $window, $state, $stateParams) {

  	var vm = this;
    // $scope.bannerOptions = ['all_pages', 'home_page', 'shop_in_store', 'shop_experience', 'shop_local'];
    $scope.items = ["One", "Two", "Three"];
    vm.categories = function() {
    
      CategoryService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.categoryList = response.data.categories;
        $scope.count        = response.data.count;
      });
    };

     $scope.getCategory = function(id) {

      CategoryService.getOne(id).then(function(response){
        $scope.category = response.data;
      }, function(response) {
         $state.go('app.category.list');
         console.log(response);
      });

    };

    $scope.editCategory = function(id) {

      $scope.category = {};
      $state.go('app.category.edit', {id: id});
      $scope.getCategory(id);

    };

    $scope.deleteCategory = function (id) {

      CategoryService.delete(id);
      $state.go($state.current, {}, {reload: true});
      vm.categories();
      //@todo remove element from the table
    };

     $scope.saveCategory = function(form) {

      var category = angular.copy($scope.category);

      CategoryService.create(category).then(function(response) {
          console.log(response);
           // $state.go('app.category.list');
           $state.go($state.current, {}, {reload: true});
      }, function(response) {

         console.log(response);
      });
      
    };

    $scope.updateCategory = function(form, id) {

      var category = angular.copy($scope.category);

      CategoryService.update(id, category).then(function(response) {

          $state.go($state.current, {}, {reload: true});
          console.log(response);

      }, function(response) {

         console.log(response);
      });

    };

    $scope.sortableOptions = {
      update: function(e, ui) {
       
      },
      stop: function(e, ui) {
        // this callback has the changed model
        var data = [];
        $scope.categoryList.map(function(i, index){

          data.push({id: i.id, sort_order: index});
          // console.log(i.id + '-' + i.name + '-' + index);
        });
        // console.log(JSON.stringify(data));
        // return false;
        CategoryService.categorySort(JSON.stringify(data)).then(function(response){
          console.log(response);
        });
      }
    };

    if ($state.params.id) {
       $scope.getCategory($state.params.id);
    }


    if ($state.current.url === '') {
      vm.categories();
    }
    
  }

})();
