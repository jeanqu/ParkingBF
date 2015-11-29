angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MesVoitureCtrl', function($scope, voiture) {
  //alert('declaration controlleur');
  $scope.mesVoitures = voiture.query();
})
/*
  $scope.remove = function(chat) {
    chats.remove(chat);
  };*/

.controller('chatDetailCtrl', function($scope, $stateParams, chats) {
  $scope.chat = chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AlertCtrl', function($scope) {
  //Alert controleur
  $scope.settings = {
    enableAlert: true
  };
})

.controller('ConfirmationCtrl', function($scope) {
  //confirmation controleur
  $scope.settings = {
    enableConfirmation: true
  };
})

.controller('chatsCtrl', function($scope, chats, voiture) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  voiture.get();
  $scope.chats = chats.all();
  $scope.remove = function(chat) {
    chats.remove(chat);
  };
})

.controller('chatDetailCtrl', function($scope, $stateParams, chats) {
  $scope.chat = chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('AlertCtrl', function($scope) {
  //Alert controleur
  $scope.settings = {
    enableAlert: true
  };
})

.controller('UserCtrl', function ($scope, $http, $window) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  $scope.message = '';
  $scope.login = function () {
    $http
      .post('http://localhost:5000/tryConnect', {user: $scope.user})
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.message = 'Welcome';
      })
      .error(function (data, status, headers, config) {
        delete $window.sessionStorage.token;
        $scope.message = 'Error: Invalid user or password';
      });
  };
  $scope.signin = function() {
    $http
      .post('http://localhost:5000/signin', {user: $scope.user})
      .success(function (data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        $scope.message = 'Inscription';
      })
      .error(function (data, status, headers, config) {
        delete $window.sessionStorage.token;
        $scope.message = 'Marche pas Marche pas!!';
      });
  }
});
