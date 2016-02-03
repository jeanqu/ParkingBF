var pg = require('pg');
var voitureLib = require('../lib/voiture_class.js');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";
var authentificate = "authentificate.js";

exports.sendMyCars = function (req, res, next) {
    var client = new pg.Client(conString);
    var mesVoitures = [];
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }

      var requete = "SELECT id_vehicule, code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face \
                     FROM vehicule \
                     INNER JOIN compte ON id_compte = vehicule_fk_compte \
                     WHERE token = '" + req.token + "';";
      console.log(requete);
      var query = client.query(requete);

      query.on('row', function(row) {
        mesVoitures.push(new voitureLib.voitureDepuisSQL(row));
      });

      query.on('end', function() {
        res.send(mesVoitures);
      });
    });

};

exports.addACar = function(req, res, next) {
  console.log('J\' ajoute une voiture');
}