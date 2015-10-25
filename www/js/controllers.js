angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MesVoitureCtrl', function($scope, voiture) {
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
});
