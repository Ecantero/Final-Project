var express = require('express'),
pug = require('pug'),
path = require('path'),
route = require('./routes/routes.js'),
bodyParser = require('body-parser'),
bcrypt = require('bcrypt-nodejs'),
expressSession = require('express-session'),
cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var allData = mongoose.connect('mongodb://localhost/data');

var myHash;

function makeHash(the_str) {
  bcrypt.hash(the_str, null, null, function(err, hash){
    myHash = hash;
  });
}

var checkAuth = function (req, res, next) {
  if(req.session.user && req.session.user.isAuthenticated){
    next();
  }else{
    res.redirect('/');
  }
}

var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', route.index);

app.get('/home', route.home);

app.get('/create', route.create);

app.get('/edit/:id', route.edit);

app.get('/details/:id', route.details);

app.post('/create', urlencodedParser, route.createPerson, function(req, res){
  makeHash(req.body.pass);
  console.log(myHash);
});

app.post('/edit/:id', urlencodedParser, route.editPerson);

app.get('/delete/:id', route.delete);

app.post('/', urlencodedParser, function(req, res){
  console.log(req.body.username);
  if(req.body.username==allData.username &&req.body.pass==allData.pass){
    req.session.user={
      isAuthenticated: true,
      username: req.body.username
    };
    // res.redirect('/home');
    route.home
  }else{
    // res.redirect('/');
    route.index
  }
  
});


app.listen(3000, function(){
  console.log("Listening On Port", 3000)
});

