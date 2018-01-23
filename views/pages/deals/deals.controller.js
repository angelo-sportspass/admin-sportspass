(function() {
  'use strict';

  angular
    .module('app')
    .controller('DealsController', DealsController);

  /** @ngInject */
  DealsController.$inject = ['DealsService', '$rootScope', '$scope', '$http', '$window', '$state', '$stateParams', 'Upload', 'sportspass', 'aws'];
  function DealsController(DealsService, $rootScope, $scope, $http, $window, $state, $stateParams, Upload, sportspass, aws) {

  	var vm = this;
    $scope.isDealsImageChange = 0;

    $scope.user = JSON.parse(localStorage.getItem('user'));

    vm.deals = function() {
      DealsService.getAll().then(function(response) {

        $scope.currentPage = 1;
        $scope.pageSize    = 10;

        $scope.dealList = response.data.deals;
        $scope.count    = response.data.count;
      });
    };

    $scope.getDeals = function(id) {

      DealsService.getOne(id).then(function(response){
        $scope.deals = response.data;
        $scope.file  = $scope.deals.image;
      }, function(response) {
         $state.go('app.deals.list');
         console.log(response);
      });

    };

    $scope.editDeals = function(id) {

      $scope.deals = {};
      $state.go('app.deals.edit', {id: id});
      $scope.getDeals(id);

    };

    $scope.deleteDeals = function (id) {

      DealsService.delete(id);
      $state.go($state.current, {}, {reload: true});
      vm.deals();
      //@todo remove element from the table
    };

    $scope.saveDeals = function(form) {
      
      var deals = angular.copy($scope.deals);
      var file  = $scope.upload($scope.file, 'create');

      var data = {
        image : file,
        name: deals.name,
        description: deals.description,
        days: deals.days,
        hours: deals.hours,
        minutes: deals.minutes,
        button_title: deals.button_title
      };

      DealsService.create(data).then(function(response) {
          console.log(response);
          $state.go('app.deals.list');
      }, function(response) {
         console.log(response);
      });

    };

    $scope.updateDeals = function(form, id) {

      var deals = angular.copy($scope.deals);

      if ($scope.isDealsImageChange == 1) {
        var file  = $scope.upload($scope.file, 'create');
      }
    
      var data = {
        image : file,
        name: deals.name,
        description: deals.description,
        days: deals.days,
        hours: deals.hours,
        minutes: deals.minutes,
        button_title: deals.button_title
      };

      if ($scope.isDealsImageChange == 0) {
        delete data['image'];
      }

      DealsService.update(id, data).then(function(response) {
          console.log(response);
          $state.go('app.deals.list');
      }, function(response) {
         console.log(response);
      });

    };

    $scope.upload = function(file, type) {

      $scope.awsImageLink = "";

      AWS.config.update({ accessKeyId: $scope.user.aws.access_key, secretAccessKey: $scope.user.aws.secrete_key });
      AWS.config.region = $scope.user.aws.region;

      var bucket = new AWS.S3({ params: { Bucket: $scope.user.aws.bucket } });

      if(file) {
        // Prepend Unique String To Prevent Overwrites
        var uniqueFileName = $scope.uniqueString() + '-' + file.name;

        var params = { Key: 'Staging/' + uniqueFileName, ContentType: file.type, Body: file, ServerSideEncryption: 'AES256' };

        bucket.putObject(params, function(err, data) {

          if(err) {
            console.log(error);
          }
        });

        return (file) ? $scope.awsImageLink = aws.s3StagingLink + '/' + uniqueFileName : '';
      }
      else {
        // No File Selected
        toastr.error('Please select a file to upload');
      }
    };

    $scope.uniqueString = function() {
      var text     = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for( var i=0; i < 8; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    $scope.dealsImage = function() {
      $scope.isDealsImageChange = 1;
    }
   
    if ($state.params.id) {
       $scope.getDeals($state.params.id);
    }

    if ($state.current.url === '') {
      vm.deals();
    }

  }

})();
