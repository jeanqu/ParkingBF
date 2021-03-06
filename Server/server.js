var express = require('express'),
    voiture = require('./routes/voiture'),
    authControler = require('./routes/authentificate'),
    bodyParser = require('body-parser'),
    app = express();

app.all('*', function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/tryConnect', authControler.checkIfConnected);
app.post('/signin', authControler.inscription);

app.post('/voiture', authControler.ensureAuthorized, voiture.sendMyCars);
app.post('/addACar', authControler.ensureAuthorized, voiture.addACar);

app.set('port', process.env.PORT || 5000);

process.on('uncaughtException', function(err) {
    console.log(err);
});
 
app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});