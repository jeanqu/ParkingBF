angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('MesVoitureCtrl', ['$scope', '$window', 'voiture', 'globalVar', 'Main', function($scope, $window, voiture, globalVar, Main) {
  
  $scope.loadingMesVoitures = true;
  $scope.erreurMesVoitures = false;
  $scope.pasDeVoitures = false;
  $scope.newCar = {name: null, matricule: null};

  voiture.getAllMyCarFromToken($window.localStorage.getItem('token'), function(res) {
      if (res.type === false) 
      {
          $scope.loadingMesVoitures = false;
          $scope.erreurMesVoitures = true;
      }
      else if (res.head === globalVar.CAS_ERREUR_NON_CONNECTE)
      {
        $scope.loadingMesVoitures = false;
        Main.logout(globalVar.CAS_ERREUR_NON_CONNECTE);
      }
      else if (res.length === 0)
      {
        $scope.mesVoitures = [];
        $scope.pasDeVoitures = true;
        $scope.loadingMesVoitures = false;
      }
      else
      {
        $scope.mesVoitures = res;
        $scope.loadingMesVoitures = false;
      } 
  }, function() {
      $scope.loadingMesVoitures = false;
      $scope.erreurMesVoitures = true;
  });

  $scope.ajouterVoiture = function() 
  {
    voiture.addACar($scope.newCar, function(res) 
      {
        
      }, function() 
      {
          $scope.loadingMesVoitures = false;
          $scope.erreurMesVoitures = true;
      }
    );
  }
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

.controller('AccountCtrl', ['$rootScope', '$scope', 'Main', 'globalVar', 'translationService',  function($rootScope, $scope, Main, globalVar, translationService) {
  $scope.showLangages = false;
  $scope.listLangages = globalVar.LIST_LANGAGES;
  $scope.chosenLanguage = translationService.getCurrentLangage();
  $scope.settings = {
    enableFriends: true
  };
  $scope.deconnect = function() {
    Main.logout();
  };

  $scope.ShowLangages = function() {
    if ($scope.showLangages === false){
      $scope.showLangages = true;
    }
    else
    {
      $scope.showLangages = false;
    }
  };

  $scope.changeLangage = function(langage) {
    translationService.putLangageInLocalStorage(langage);
    translationService.getTranslation($rootScope, langage);
  };
}])

.controller('AlertCtrl', function($scope) {
  //Alert controleur
  $scope.settings = {
    enableAlert: true
  };
  $scope.iconeSelectionne = 0;
  $scope.selectionerIcone = function(id_icone) {
    $scope.iconeSelectionne = id_icone;
  }
})

.controller('UserCtrl', ['$rootScope', '$scope', '$location', '$window', 'Main', 'globalVar', '$stateParams', 'translationService', function($rootScope, $scope, $location, $window, Main, globalVar, $stateParams, translationService) {
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

  $scope.token = $window.localStorage['token'];

  if (typeof $stateParams.redirection !== 'undefined' && $stateParams.redirection !== null && $stateParams.redirection == globalVar.CAS_ERREUR_NON_CONNECTE)
  {
    $scope.blockRedirection = true;
  }
  else
  {
    $scope.blockRedirection = false;
  }
}]);
