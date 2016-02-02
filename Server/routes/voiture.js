var pg = require('pg');
var voitureLib = require('../lib/voiture_class.js');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";
var authentificate = "authentificate.js";

var mesVoitures = [];

exports.sendMyCars = function (req, res, next) {
    console.log('Je suis dans les voitures');
    var client = new pg.Client(conString);
    client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }
      console.log('Le token est :' + req.token); 

      var requete = 'SELECT id_vehicule, code_vehicule, nom_vehicule, date_creation_vehicule, vehicule_fk_compte, vehicule_fk_etat, face \
                                FROM vehicule'
      var query = client.query(requete);

      query.on('row', function(row) {
        mesVoitures.push(new voitureLib.voitureDepuisSQL(row));
      });

      query.on('end', function() {
        res.send(mesVoitures);
      });
    });

};