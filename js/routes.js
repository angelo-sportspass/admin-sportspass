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
   * Account State
   * @return Get All Account
   */
  .state('app.account', {
    abstract: true,
    url: '/account',
    defaultChild: 'app.account.list',
    template: '<ui-view></ui-view>',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Account'
    },

    params: {
        subtitle: 'Account'
    }
  })
  .state('app.account.list', {
      url: '',
      templateUrl: 'views/pages/account/account.html',
      controller: 'AccountController',
      controllerAs: 'account',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Account List'
      },
  })
  .state('app.account.create', {
      url: '/create',
      templateUrl: 'views/pages/account/account.create.html',
      controller: 'AccountController',
      controllerAs: 'account',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Account Create'
      },
  })
  .state('app.account.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/account/account.edit.html',
      controller: 'AccountController',
      controllerAs: 'account',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Account Edit'
      },
  })

  /**
   * Banner State
   * @return Get All Banners
   */
  .state('app.banners', {
    abstract: true,
    url: '/banners',
    defaultChild: 'app.banners.list',
    template: '<ui-view></ui-view>',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Banners'
    },

    params: {
        subtitle: 'Banners'
    }
  })
  .state('app.banners.list', {
      url: '',
      templateUrl: 'views/pages/banners/banners.html',
      controller: 'BannersController',
      controllerAs: 'banners',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Banners List'
      },
  })
  .state('app.banners.create', {
      url: '/create',
      templateUrl: 'views/pages/banners/banners.create.html',
      controller: 'BannersController',
      controllerAs: 'banners',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Banners Create'
      },
  })
  .state('app.banners.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/banners/banners.edit.html',
      controller: 'BannersController',
      controllerAs: 'banners',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Banners Edit'
      },
  })
  /**
   * Category State
   * @return Get All Category
   */
  .state('app.category', {
    abstract: true,
    url: '/category',
    defaultChild: 'app.category.list',
    template: '<ui-view></ui-view>',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Category'
    },

    params: {
        subtitle: 'Category'
    }
  })
  .state('app.category.list', {
      url: '',
      templateUrl: 'views/pages/category/category.html',
      controller: 'CategoryController',
      controllerAs: 'category',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Category List'
      },
  })
  .state('app.category.create', {
      url: '/create',
      templateUrl: 'views/pages/category/category.create.html',
      controller: 'CategoryController',
      controllerAs: 'category',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Category Create'
      },
  })
  .state('app.category.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/category/category.edit.html',
      controller: 'CategoryController',
      controllerAs: 'category',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Category Edit'
      },
  })

  /**
   * Clubs State
   * @return Get All Clubs
   */
  .state('app.clubs', {
    abstract: true,
    url: '/clubs',
    defaultChild: 'app.clubs.list',
    template: '<ui-view></ui-view>',
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Dynamic Form',
          files: ['css/dynamic-form.css']
        }]);
      }],
    },
    //page title goes here
    ncyBreadcrumb: {
      label: 'Clubs'
    },

    params: {
        subtitle: 'Clubs'
    }
  })
  .state('app.clubs.list', {
      url: '',
      templateUrl: 'views/pages/clubs/clubs.html',
      controller: 'ClubsController',
      controllerAs: 'clubs',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Clubs List'
      },
  })
  .state('app.clubs.create', {
      url: '/create',
      templateUrl: 'views/pages/clubs/clubs.create.html',
      controller: 'ClubsController',
      controllerAs: 'clubs',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Clubs Create'
      },
  })
  .state('app.clubs.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/clubs/clubs.edit.html',
      controller: 'ClubsController',
      controllerAs: 'clubs',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Clubs Edit'
      },
  })
  /**
   * Deals State
   * @return Get All Deals
   */
  .state('app.deals', {
    abstract: true,
    url: '/deals',
    defaultChild: 'app.deals.list',
    template: '<ui-view></ui-view>',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Deals'
    },

    params: {
        subtitle: 'Deals'
    }
  })
  .state('app.deals.list', {
      url: '',
      templateUrl: 'views/pages/deals/deals.html',
      controller: 'DealsController',
      controllerAs: 'deals',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Deals List'
      },
  })
  .state('app.deals.create', {
      url: '/create',
      templateUrl: 'views/pages/deals/deals.create.html',
      controller: 'DealsController',
      controllerAs: 'deals',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Deals Create'
      },
  })
  .state('app.deals.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/deals/deals.edit.html',
      controller: 'DealsController',
      controllerAs: 'deals',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Deals Edit'
      },
  })

  /**
   * Members State
   * @return Get All Members
   */
  .state('app.members', {
    abstract: true,
    url: '/members',
    defaultChild: 'app.members.list',
    template: '<ui-view></ui-view>',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Members'
    },

    params: {
        subtitle: 'Members'
    }
  })
  .state('app.members.list', {
      url: '',
      templateUrl: 'views/pages/members/members.html',
      controller: 'MembersController',
      controllerAs: 'members',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Members List'
      },
  })
  .state('app.members.create', {
      url: '/create',
      templateUrl: 'views/pages/members/members.create.html',
      controller: 'MembersController',
      controllerAs: 'members',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Members Create'
      },
  })
  .state('app.members.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/members/members.edit.html',
      controller: 'MembersController',
      controllerAs: 'members',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Members Edit'
      },
  })
  /**
   * Program State
   * @return Get All Program
   */
  .state('app.program', {
    abstract: true,
    url: '/program',
    defaultChild: 'app.program.list',
    template: '<ui-view></ui-view>',

    //page title goes here
    ncyBreadcrumb: {
      label: 'Program'
    },

    params: {
        subtitle: 'Programs'
    }
  })
  .state('app.program.list', {
      url: '',
      templateUrl: 'views/pages/program/program.html',
      controller: 'ProgramController',
      controllerAs: 'program',
      //page title goes here
      ncyBreadcrumb: {
          label: 'List',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Program List'
      },
  })
  .state('app.program.create', {
      url: '/create',
      templateUrl: 'views/pages/program/program.create.html',
      controller: 'ProgramController',
      controllerAs: 'program',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Create',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Program Create'
      },
  })
  .state('app.program.edit', {
      url: '/edit/{id}',
      templateUrl: 'views/pages/program/program.edit.html',
      controller: 'ProgramController',
      controllerAs: 'program',
      //page title goes here
      ncyBreadcrumb: {
          label: 'Edit',
      },
      //page subtitle goes here
      params: {
          subtitle: 'Program Edit'
      },
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
