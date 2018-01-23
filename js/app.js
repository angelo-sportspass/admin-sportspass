// Default colors
var brandPrimary =  '#20a8d8';
var brandSuccess =  '#4dbd74';
var brandInfo =     '#63c2de';
var brandWarning =  '#f8cb00';
var brandDanger =   '#f86c6b';

var grayDark =      '#2a2c36';
var gray =          '#55595c';
var grayLight =     '#818a91';
var grayLighter =   '#d1d4d7';
var grayLightest =  '#f8f9fa';

angular
.module('app', [
  'ui.router',
  'oc.lazyLoad',
  'ncy-angular-breadcrumb',
  'angular-loading-bar',
  'ui.bootstrap',
  '720kb.datepicker',
  'angularUtils.directives.dirPagination',
  'ngFileUpload',
  'multipleSelect'
])
.config(['cfpLoadingBarProvider', '$httpProvider', function(cfpLoadingBarProvider, $httpProvider) {

  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.latencyThreshold = 1;
  //$qProvider.errorOnUnhandledRejections(false);

  $httpProvider.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
  $httpProvider.defaults.headers.put["Content-Type"] = "application/x-www-form-urlencoded";

  $httpProvider.defaults.transformRequest.unshift(function (data, headersGetter) {
    var key, result = [];

    if (typeof data === "string")
      return data;

    for (key in data) {
      if (data.hasOwnProperty(key))
        result.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return result.join("&");
  });

}])
.run(['$rootScope', '$state', '$stateParams', '$transitions', '$location', function($rootScope, $state, $stateParams, $transitions, $location) {
  $transitions.onSuccess({} ,function(){  
    
      var currentUser = JSON.parse(localStorage.getItem('user'));
      
      if(currentUser) {
          $rootScope.authenticated = true;
          $rootScope.currentUser = currentUser;

          if($location.path() == '/login' || $location.path() == '/register')
              $state.go('app.main');

      } else {

          $rootScope.authenticated = false;

          if($location.path().split('/')[1] != 'login')
              $state.go('appFullWidth.login');

      }

  });
  $rootScope.$state = $state;
  return $rootScope.$stateParams = $stateParams;
}]);
