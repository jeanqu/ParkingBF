var pg = require('pg');
var compteLib = require('../lib/compte_class.js');
var global = require('../lib/global_var.js');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";
var jwt = require('jsonwebtoken');

var SECRET = 'OUAFouafouafoauaoufa';

exports.ensureAuthorized = function (req, res, next) {
    console.log('Je rejoins le serveur');
    var bearerToken;
    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        console.log('retourne 403');
        var reponse = new global.reponses(global.CAS_ERREUR_NON_CONNECTE);
        res.send(reponse);
    }
}

exports.checkIfConnected = function (req, res, next) {
	var client = new pg.Client(conString);
  var reponse = new global.reponses();
  
  client.connect(function(err) {
    if(err) {
      reponse.head = 'error';
      reponse.message = 'Erreur serveur';
      return res.send(reponse);
    }

    var requete = "SELECT loggin, mot_de_passe, date_creation_compte, token \
                       FROM compte \
                       WHERE loggin = '" + req.body.user.username + "' \
                       AND mot_de_passe = '" + req.body.user.password + "';";
    var query = client.query(requete, function(err, result) {
        if(err) {
          reponse.head = 'error';
          reponse.message = 'Erreur serveur';
          reponse.token = null;
          return res.send(reponse);
        }
        else if (result.rows[0])
        {
          console.log('Bonne connection');
          reponse.head = 'oui';
          reponse.message = 'Bonne connection!';
          reponse.token = result.rows[0].token;
          return res.send(reponse);
        }
        else {
          reponse.head = 'non';
          reponse.message = 'Mauvais identifiants - Mots de passes';
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
      reponse.head = 'error';
      reponse.message = 'Erreur serveur';
      return res.send(reponse);
    }
    else
    {
      var requete = "SELECT loggin, mot_de_passe, date_creation_compte, token \
                     FROM compte \
                     WHERE loggin = '" + req.body.user.username + "';";

      var query = client.query(requete, function(err, result) {
        if(err) {
          reponse.head = 'error';
          reponse.message = 'Erreur serveur';
          return res.send(reponse);
        }
        else if (result.rows[0])
        {
          reponse.head = 'non';
          reponse.message = 'Votre adresse mail est déjà utilisée';
          return res.send(reponse);
        }
        else
        {
          var requete = "INSERT INTO compte (loggin, mot_de_passe, date_creation_compte, token) \
                       VALUES ('" + nouveauMec.loggin + "', '" + nouveauMec.mot_de_passe + "', now(), NULL); \
                       SELECT lastval() AS new_id;";
          var query = client.query(requete, function(err, result) {
            if (err){
              reponse.head = 'error';
              reponse.message = 'Erreur serveur 1';
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
                  reponse.head = 'error';
                  reponse.message = 'Erreur serveur 2';
                  return res.send(reponse);
                }
                else
                {
                  reponse.head = 'oui';
                  reponse.message = 'membre crée';
                  reponse.token = newToken;
                  return res.send(reponse);
                }
              });
            }
            else{
              reponse.head = 'error';
              reponse.message = 'Erreur création membre';
              return res.send(reponse);
            }
          });
        }
      });
    }
  });
};

