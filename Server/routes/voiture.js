var pg = require('pg');
var Q = require('q');
var voitureLib = require('../lib/voiture_class.js');
var global = require('../lib/global_var.js');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";
var authentificate = "authentificate.js";

exports.sendMyCars = function (req, res, next) {
    var client = new pg.Client(conString);
    var mesVoitures = [];
    var reponse = new global.reponses();
    client.connect(function(err) {
      if(err) {
        reponse.head = global.CAS_ERREUR_SERVEUR;
        return res.send(reponse);
      }

      var requete = "SELECT id_vehicule, code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face \
                     FROM vehicule \
                     INNER JOIN compte ON id_compte = vehicule_fk_compte \
                     WHERE token = '" + req.token + "';";
      var query = client.query(requete);

      query.on('error', function(error) {
        reponse.head = global.CAS_ERREUR_SERVEUR;
        return res.send(reponse);
      });

      query.on('row', function(row) {
        mesVoitures.push(new voitureLib.voitureDepuisSQL(row));
      });

      query.on('end', function() {
        reponse.head = global.CAS_REUSSITE;
        reponse.mesVoitures = mesVoitures
        res.send(reponse);
      });
    });

};

exports.addACar = function(req, res, next) {
  var reponse = new global.reponses();
  var client = new pg.Client(conString);
  Q()
  .then(function(){
      var deferred = Q.defer();
      client.connect(deferred.makeNodeResolver());
      console.log(1); 
      return deferred.promise;
  })
  .then(function(){
      /*TODO*/
      var deferred = Q.defer();
      console.log('2eme étape');
      var requete = "SELECT id_vehicule, code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face \
                     FROM vehicule \
                     WHERE code_vehicule = '" + req.body.newCar.matricule + "';";
      console.log('COucou');
      var query = client.query(requete);

      query.on('error', function(error) {
        console.log('Erreur DB');
        reponse.head = global.CAS_ERREUR_SERVEUR;
        deferred.makeNodeResolver();
      });

      query.on('row', function(row) {
        console.log('Une voiture identique trouvée');
        reponse.head = global.CAS_OBJET_DEJA_UTILISE;
        deferred.makeNodeResolver();
      });

      query.on('end', function() {
        console.log('Fin analyse DB');
        deferred.makeNodeResolver();
      });
      console.log(2); 
      return deferred.promise;
  })
  .then(function(){
      var deferred = Q.defer();
      console.log(3);
  });
}