var express = require('express'),
    voiture = require('./routes/voiture'),
    app = express();
var pg = require('pg');
var conString = "pg://postgres:jeanjean@localhost/maGrosseVoiture";

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.get('/voiture', voiture.sendMyCars);

pg.connect(conString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT current_date;', ['1'], function(err, result) {
    //call `done()` to release the client back to the pool 
    done();
    
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].number);
    //output: 1 
  });
});


app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});