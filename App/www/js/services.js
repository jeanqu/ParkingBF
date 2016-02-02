angular.module('starter.services', ['ngResource'])
.factory('voiture', ['$http', function ($http) {
  var baseUrl = "http://localhost:5000";
  return {
    getAllMyCarFromToken: function(data, success, error) {
      $http.post(baseUrl + '/voiture', {token: data}).success(success).error(error);
    }
  }
}])
.factory('globalVar', function() {
  return {
    /*Utilisé */

    /*Non utilisé */
    CAS_ERREUR_NON_CONNECTE : 1,
    CAS_ERREUR_SERVEUR : 2,

    NOMBRE_LOADER_ACTUEL : 0
  }
})
.factory('Main', ['$http', '$window', '$location', 'globalVar', function($http, $window, $location, globalVar){
      var baseUrl = "http://localhost:5000";
      function changeUser(user) {
          angular.extend(currentUser, user);
      }

      function urlBase64Decode(str) {
          var output = str.replace('-', '+').replace('_', '/');
          switch (output.length % 4) {
              case 0:
                  break;
              case 2:
                  output += '==';
                  break;
              case 3:
                  output += '=';
                  break;
              default:
                  throw 'Illegal base64url string!';
          }
          return window.atob(output);
      }

      function getUserFromToken() {
          var token = $window.localStorage.getItem('token');
          var user = {};
          if (typeof token !== 'undefined' && token !== null) {
              var encoded = token.split('.')[1];
              user = JSON.parse(urlBase64Decode(encoded));
          }
          return user;
      }

      var currentUser = getUserFromToken();

      var message_deconnexion = '';

      return {
          save: function(data, success, error) {
            $http.post(baseUrl + '/signin', {user: data}).success(success).error(error)
          },
          signin: function(data, success, error) {
            $http.post(baseUrl + '/tryConnect', {user: data}).success(success).error(error)
          },
          me: function(success, error) {
            $http.get(baseUrl + '/me').success(success).error(error)
          },
          logout: function(redirect, success) {
            token = $window.localStorage.getItem('token');
            changeUser({});
            if (typeof token !== 'undefined' && token !== null) {
              $window.localStorage.removeItem('token');
            }
            if (typeof redirect !== 'undefined' && redirect !== null && redirect == globalVar.CAS_ERREUR_NON_CONNECTE)
              window.location = "#/connection/" + globalVar.CAS_ERREUR_NON_CONNECTE;
            else
              window.location = "#/connection/"
          }
      };
  }
]);

