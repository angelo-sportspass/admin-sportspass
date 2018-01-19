angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/login');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: false
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }],
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/pages/dashboard/main.html',
    controller: 'DashboardController',
    controllerAs: 'dashboard',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Dashboard',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([
          {
            serie: true,
            name: 'chart.js',
            files: [
              'bower_components/chart.js/dist/Chart.min.js',
              'bower_components/angular-chart.js/dist/angular-chart.min.js'
            ]
          },
        ]);
      }],
      loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load controllers
        return $ocLazyLoad.load({
          files: ['js/controllers/main.js']
        });
      }]
    }
  })

  /**
   * User State
   * @return 
   */
  .state('app.user', {
    abstract: true,
    url: '/user',
    defaultChild: 'app.user.list',
    template: '<ui-view></ui-view>',
  
    //page title goes here
    ncyBreadcrumb: {
      label: 'Users'
    },

    params: {
        subtitle: 'Products'
    }
  })
  .state('app.user.list', {
      url: '',
      templateUrl: 'views/pages/user/user.html',
      controller: 'UserController',
      controllerAs: 'user',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'User List'
      },
  })
  .state('app.user.create', {
    url: '/create',
    templateUrl: 'views/pages/user/user.create.html',
    controller: 'UserController',
    controllerAs: 'user',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Create'
    },
    
  })
  .state('app.user.edit', {
    url: '/edit/{id}',
    templateUrl: 'views/pages/user/user.edit.html',
    controller: 'UserController',
    controllerAs: 'user',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Edit'
    },
    
  })

  /**
   * Settings State
   * @return 
   */
  .state('app.settings', {
    url: '/settings',
    templateUrl: 'views/pages/settings/settings.html',
    // controller: 'SettingsController',
    // controllerAs: 'settings',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Settings'
    },
    
  })

  // For Full Width
  .state('appFullWidth', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
    }
  })
  .state('appFullWidth.login', {
    url: '/login',
    templateUrl: 'views/pages/login/login.html',
    controller: 'LoginController',
    controllerAs: 'login',
  })
  .state('appFullWidth.register', {
    url: '/register',
    templateUrl: 'views/pages/register/register.html',
    controller: 'RegisterController',
    controllerAs: 'register'
  })
  .state('appFullWidth.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appFullWidth.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
}]);
