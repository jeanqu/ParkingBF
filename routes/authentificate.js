var pg = require('pg');
var compteLib = require('../lib/compte_class.js');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";
var jwt = require('jsonwebtoken');

var SECRET = 'OUAFouafouafoauaoufa';

exports.checkIfConnected = function (req, res, next) {
	console.log(req.body);
	console.log('coucou gros porc');
  res.send('JE SUIS LA');
};

exports.inscription = function (req, res, next) {
  var client = new pg.Client(conString);

  //TEST

  var newToken = jwt.sign(req.body.user, SECRET);
  var nouveauMec = new compteLib.FromDatas(null, req.body.user.username, req.body.user.password, null, newToken);

  console.log(newToken);

  client.connect(function(err) {
      if(err) {
        return console.error('could not connect to postgres', err);
      }

      var requete = 'INSERT INTO compte (id_compte, loggin, mot_de_passe, date_creation_compte, token) \
                     VALUES (DEFAULT, "' + nouveauMec.loggin + '", "' + nouveauMec.mot_de_passe + '", now(), "' + nouveauMec.token + '");';
      console.log(requete);
      var query = client.query(requete);

      query.on('error', function(error) {
            console.log(error);
        });

      query.on('end', function() {
        res.send(nouveauMec);
      });
    });
  /*
  if (!(req.body.user.username === 'john.doe' && req.body.user.password === 'foobar')) {
    res.send(401, 'Wrong user or password');
    return;
  }

  var profile = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@doe.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
  console.log(token);
  res.json({ token: token });*/
  res.send('JE SUIS LA');
};

