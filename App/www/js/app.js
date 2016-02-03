// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('connection', {
    url: '/connection/:redirection',
    templateUrl: 'templates/connection.html',
    controller: 'UserCtrl'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.mesVoitures', {
      url: '/mesVoitures',
      views: {
        'tab-mesVoitures': {
          templateUrl: 'templates/tab-mesVoitures.html',
          controller: 'MesVoitureCtrl'
        }
      }
    })
  .state('tab.ajoutVehicule', {
      url: '/ajoutVehicule',
      views: {
        'tab-ajoutVehicule': {
          templateUrl: 'templates/tab-ajoutVehicule.html',
          controller: 'MesVoitureCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'chatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.alert', {
    url: '/alert',
    views: {
      'tab-alert': {
        templateUrl: 'templates/tab-alert.html',
        controller: 'AlertCtrl'
      }
    }
  })
   
  .state('tab.confirmation', {
    url: '/confirmation',
    views: {
      'tab-confirmation': {
        templateUrl: 'templates/tab-confirmation.html',
        controller: 'ConfirmationCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/connection/');

})
.config(['$httpProvider', function($httpProvider) { 
  $httpProvider.interceptors.push(['$q', '$location', '$window', function($q, $location, $window) {
      return {
          'request': function (config) {
              config.headers = config.headers || {};
              if ($window.localStorage.getItem('token')) {
                  config.headers.Authorization = 'Bearer ' + $window.localStorage.getItem('token');
              }
              return config;
          },
          'responseError': function(response) {
              if(response.status === 401 || response.status === 403) {
                  $location.path('/signin');
              }
              return $q.reject(response);
          }
      };
  }]);
}])
.run(["$rootScope", "translationService", function ($rootScope, translationService) {
  var langage = null;
  langage = translationService.getCurrentLangage();
  if (langage == null || langage == undefined)
  {
    langage = 'fr';
    translationService.putLangageInLocalStorage(langage);
  }
  translationService.getTranslation($rootScope, langage);
}]);
