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
                     WHERE token = $1;";
      var query = client.query(requete, [req.token]);

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
    //Tests sur les inputs
    var deferred = Q.defer();
    console.log('le type est : ' + typeof req.body.newCar.name);
    if (!req.body.newCar)
    {
      reponse.head = global.CAS_ACTION_NOT_ACHIVED;
      reponse.head_bis = global.INACHEVE_REQUEST_CHEATED;
      console.log('Tricherie 1!');
      deferred.reject(reponse);
    }
    else if ((!req.body.newCar.name) || (!req.body.newCar.matricule))
    {
      reponse.head = global.CAS_ACTION_NOT_ACHIVED;
      reponse.head_bis = global.INACHEVE_REQUEST_CHEATED;
      console.log('Tricherie 2!');
      deferred.reject(reponse);
    }
    else if((typeof req.body.newCar.matricule !== 'string') || (typeof req.body.newCar.name !== 'string'))
    {
      reponse.head = global.CAS_ACTION_NOT_ACHIVED;
      reponse.head_bis = global.INACHEVE_REQUEST_CHEATED;
      console.log('Tricherie 3!');
      deferred.reject(reponse);
    }
    else if((req.body.newCar.matricule.length < global.VEHICULE_MATRICULE_MIN_LENGTH) || (req.body.newCar.matricule.length > global.VEHICULE_MATRICULE_MAX_LENGTH) || (req.body.newCar.name.length < global.VEHICULE_NAME_MIN_LENGTH) || (req.body.newCar.name.length > global.VEHICULE_NAME_MAX_LENGTH))
    {
      reponse.head = global.CAS_ACTION_NOT_ACHIVED;
      reponse.head_bis = global.INACHEVE_REQUEST_CHEATED;
      console.log('Tricherie 4!');
      deferred.reject(reponse);
    }
    else
    {
      deferred.resolve();
    }
    return deferred.promise;
  })
  .then(function(){
      var deferred = Q.defer();
      client.connect(deferred.makeNodeResolver());
      console.log(1); 
      return deferred.promise;
  })
  .then(function(){
      //Vérification sur le matricule, s'il n'existe pas déjà
      //TODO: Ce cas est plus compliqué, à re travailler
      var member_finded = false;
      var deferred = Q.defer();
      console.log('2eme étape');
      var requete = "SELECT id_vehicule, code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face \
                     FROM vehicule \
                     WHERE code_vehicule = $1;";
      var query = client.query(requete, [req.body.newCar.matricule]);

      query.on('error', function(error) {
        console.log('Erreur DB');
        reponse.head = global.CAS_ERREUR_SERVEUR;
        deferred.reject(reponse);
      });

      query.on('row', function(row) {
        console.log('Une voiture identique trouvée');
        reponse.head = global.CAS_ACTION_NOT_ACHIVED;
        reponse.head_bis = global.INACHEVE_OBJET_DEJA_UTILISE;
        console.log(global.CAS_OBJET_DEJA_UTILISE);
        member_finded = true;
      });

      query.on('end', function() {
        if (member_finded === true)
        {
          deferred.reject(reponse);
        }
        else
        {
          deferred.resolve();
        }
      });
      console.log(2); 
      return deferred.promise;
  })
  .then(function(){
      console.log('3eme étape');
      var deferred = Q.defer();
      var requete = "INSERT INTO vehicule (code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face) \
                     VALUES ($1, $2, now(), $3, $4, $5) \
                     RETURNING id_vehicule;";
      var query = client.query(requete, [req.body.newCar.matricule, req.body.newCar.name, req.IdIdentifiants, global.STATE_VEHICULE_VALIDE, "http://images.caradisiac.com/logos-ref/modele/modele--citroen-berlingo-multispace/S7-modele--citroen-berlingo-multispace.jpg"]);
      
      query.on('error', function(error) {
        console.log('Erreur DB ici');
        reponse.head = global.CAS_ERREUR_SERVEUR;
        deferred.reject(reponse);
      });

      query.on('row', function(row) {
        console.log('L id numero ' + row.id_vehicule + ' a été ajouté');
        console.log(reponse);
        reponse.head = global.CAS_REUSSITE;
        reponse.message.IdNewCar = row.id_vehicule;
        deferred.resolve();
      });

      query.on('end', function(){

      });
      return deferred.promise;
  })
  .then(function(){
    console.log('Dans la fin!');
    return res.send(reponse);
  })
  .catch(function(reponse){
    console.log('Dans le catch: ');
    console.log(reponse);
    return res.send(reponse);
  });
}