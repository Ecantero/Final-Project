var express = require('express'),
pug = require('pug'),
path = require('path'),
route = require('./routes/routes.js'),
bodyParser = require('body-parser'),
bcrypt = require('bcrypt-nodejs');
expressSession = require('express-session'),
cookieParser = require('cookie-parser');

var app = express();
var allData = route;

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', route.index);
app.get('/create', route.create);
app.get('/edit/:id', route.edit);
app.get('/details/:id', route.details);
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);

app.listen(3000, function(){
  console.log("Listening On Port", 3000)
});

