var pg = require('pg');
var compteLib = require('../lib/compte_class.js');
var Q = require('q');
var global = require('../lib/global_var.js');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";
var jwt = require('jsonwebtoken');

var SECRET = 'OUAFouafouafoauaoufa';

exports.ensureAuthorized = function (req, res, next) {
  var client = new pg.Client(conString);
  var bearerToken;
  var bearerHeader = req.headers['authorization'];
  var reponse = new global.reponses();
  var member_finded = false;
  Q()
  .then(function(){
    var deferred = Q.defer();
    if (typeof bearerHeader !== 'undefined') {
      var bearer = bearerHeader.split(" ");
      bearerToken = bearer[1];
      req.token = bearerToken;
      deferred.resolve();
    }
    else
    {
      reponse.head = global.CAS_ERREUR_NON_CONNECTE;
      deferred.reject(reponse);
    }
    return deferred.promise;
  })
  .then(function(){
    var deferred = Q.defer();
    client.connect();
    var requete = "SELECT id_compte \
                   FROM compte \
                   WHERE token = $1;";
    var query = client.query(requete, [req.token]);

    query.on('error', function(error) {
      console.log('Erreur DB auth');
      reponse.head = global.CAS_ERREUR_SERVEUR;
      deferred.reject(reponse);
    });

    query.on('row', function(row) {
      req.IdIdentifiants = row.id_compte;
      member_finded = true;
      deferred.resolve();
    });

    query.on('end', function() {
      if (member_finded === true)
      {
        deferred.resolve();
      }
      else
      {
        console.log('Mauvais Id');
        reponse.head = global.CAS_ERREUR_NON_CONNECTE;
        deferred.reject(reponse);
      }
    });
    console.log(2); 
    return deferred.promise;

  })
  .then(function(){
    next();
  })
  .catch(function(reponse){
    console.log('Déconnecté!');
    console.log(reponse);
    return res.send(reponse);
  });
};

exports.checkIfConnected = function (req, res, next) {
	var client = new pg.Client(conString);
  var reponse = new global.reponses();
  
  client.connect(function(err) {
    if(err) {
      reponse.head = global.CAS_ERREUR_SERVEUR;
      return res.send(reponse);
    }

    var requete = "SELECT loggin, mot_de_passe, date_creation_compte, token \
                       FROM compte \
                       WHERE loggin = '" + req.body.user.username + "' \
                       AND mot_de_passe = '" + req.body.user.password + "';";
    var query = client.query(requete, function(err, result) {
        if(err) {
          reponse.head = global.CAS_ERREUR_SERVEUR;
          reponse.token = null;
          return res.send(reponse);
        }
        else if (result.rows[0])
        {
          console.log('Bonne connection');
          reponse.head = global.CAS_REUSSITE;
          reponse.token = result.rows[0].token;
          return res.send(reponse);
        }
        else {
          reponse.head = global.CAS_ERREUR_NON_CONNECTE;
          reponse.token = null;
          return res.send(reponse);
        }
    });
  }); 
};

exports.inscription = function (req, res, next) {
  var client = new pg.Client(conString);
  var reponse = new global.reponses();
  console.log(req.body.user);
  var nouveauMec = new compteLib.FromDatas(null, req.body.user.username, req.body.user.password, null, null);

  client.connect(function(err) {
    if(err) {
      reponse.head = global.CAS_ERREUR_SERVEUR;
      return res.send(reponse);
    }
    else
    {
      var requete = "SELECT loggin, mot_de_passe, date_creation_compte, token \
                     FROM compte \
                     WHERE loggin = '" + req.body.user.username + "';";

      var query = client.query(requete, function(err, result) {
        if(err) {
          reponse.head = global.CAS_ERREUR_SERVEUR;
          return res.send(reponse);
        }
        else if (result.rows[0])
        {
          reponse.head = global.CAS_COMPTE_DEJA_UTILISE;
          return res.send(reponse);
        }
        else
        {
          var requete = "INSERT INTO compte (loggin, mot_de_passe, date_creation_compte, token) \
                       VALUES ('" + nouveauMec.loggin + "', '" + nouveauMec.mot_de_passe + "', now(), NULL); \
                       SELECT lastval() AS new_id;";
          var query = client.query(requete, function(err, result) {
            if (err){
              reponse.head = global.CAS_ERREUR_SERVEUR;
              return res.send(reponse);
            }
            else if (result.rows[0])
            {
              nouveauMec.id = result.rows[0].new_id;
              console.log('nouvelle id: ' + nouveauMec.id);

              //Création nouveau token
              var newToken = jwt.sign(nouveauMec, SECRET);
              var requete = "UPDATE compte \
                             SET token = '" + newToken + "' \
                             WHERE id_compte = " + nouveauMec.id + ";";

              console.log(requete);
              var query = client.query(requete, function(err, result) {
                if (err){
                  reponse.head = global.CAS_ERREUR_SERVEUR;
                  return res.send(reponse);
                }
                else
                {
                  reponse.head = global.CAS_REUSSITE;
                  reponse.token = newToken;
                  return res.send(reponse);
                }
              });
            }
            else{
              reponse.head = global.CAS_ERREUR_SERVEUR;
              return res.send(reponse);
            }
          });
        }
      });
    }
  });
};

