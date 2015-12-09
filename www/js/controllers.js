angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MesVoitureCtrl', ['$scope', '$window', 'voiture', function($scope, $window, voiture) {
  voiture.getAllMyCarFromToken($window.localStorage.getItem('token'), function(res) {
      console.log(res);
      if (res.type == false) {
          alert(res.data)    
      }
      else 
      {
        alert('2');
        $scope.mesVoitures = res
      } 
  }, function() {
      alert('Une erreur!');
  })
}])
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
  voiture.get();
  $scope.chats = chats.all();
  $scope.remove = function(chat) {
    chats.remove(chat);
  };
})

.controller('chatDetailCtrl', function($scope, $stateParams, chats) {
  $scope.chat = chats.get($stateParams.chatId);
})

.controller('AccountCtrl', ['$scope', 'Main', function($scope, Main) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.deconnect = function() {
    Main.logout();
  }
}])

.controller('AlertCtrl', function($scope) {
  //Alert controleur
  $scope.settings = {
    enableAlert: true
  };
})

.controller('UserCtrl', ['$rootScope', '$scope', '$location', '$window', 'Main', function($rootScope, $scope, $location, $window, Main) {
  $scope.user = {username: 'john.doe', password: 'foobar'};
  var user = $scope.user;
  $scope.login = function() {
    Main.signin(user, function(res) {
        if (res.type == false) {
            alert(res.data)    
        }
        else if (res.head == "oui") 
        {
          $window.localStorage['token'] = res.token;
          window.location = "#/tab/alert";
        }
        else 
        {
          //window.location = "/";  
          $scope.message = res.message;
        } 
    }, function() {
        $rootScope.error = 'Failed to signin';
    })
};

$scope.signin = function() {
  Main.save(user, function(res) {
      console.log(res);
      if (res.type == false) {
          alert(res.data)
      } 
      else if (res.head == "oui") 
      {
        $localStorage.token = res.token;
        $scope.message = res.message;
      }
      else 
      {
        //window.location = "/";  
        $scope.message = res.message;
      } 
  }, function() {
      $rootScope.error = 'Failed to signup';
    })
  };

  $scope.me = function() {
      Main.me(function(res) {
          $scope.myDetails = res;
      }, function() {
          $rootScope.error = 'Failed to fetch details';
      })
  };

  $scope.logout = function() {
      Main.logout(function() {
          window.location = "/"
      }, function() {
          alert("Failed to logout!");
      });
  };
  $scope.token = $window.localStorage['token'];

}]);
