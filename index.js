var express = require('express'),
pug = require('pug'),
path = require('path'),
route = require('./routes/routes.js'),
bodyParser = require('body-parser'),
bcrypt = require('bcrypt-nodejs'),
cookieParser = require('cookie-parser'),
expressSession = require('express-session');

var app = express();

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var allData = mongoose.connect('mongodb://localhost/data');

var myHash;

// app.use(cookieParser('This is my passphrase'));

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

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname + '/public')));

var urlencodedParser = bodyParser.urlencoded({
  extended: true
})

app.get('/', route.index, function (req, res) {
  if(req.cookies.beenHereBefore === 'yes') {
    res.send('You have been here before');
  } else {
    res.cookie('beenHereBefore', 'yes');
    res.send('This is your first time');
  }

});

app.get('/home', checkAuth, route.home);

app.get('/create', route.create);

app.get('/edit/:id', checkAuth, route.edit);

app.get('/details/:id', checkAuth, route.details);

app.post('/create', urlencodedParser, route.createPerson, function(req, res){
  makeHash(req.body.pass);
  console.log(myHash);
});

app.post('/edit/:id', urlencodedParser, route.editPerson, function(req, res){
  makeHash(req.body.pass);
  console.log(myHash);
});

app.get('/delete/:id', checkAuth, route.delete);

app.get('/clear', function (req, res) {
  res.clearCookie('beenHereBefore');
  res.redirect('/');
});

app.post('/', urlencodedParser, function(req, res){
  console.log(req.body.username);
  if(req.body.username==allData.users.find({name: req.body.username}) &&req.body.pass==allData.users.find({name: req.body.pass})){
    req.session.user={
      isAuthenticated: true,
      username: req.body.username
    };
    route.home;
  }else{
    route.index
  }
  
});


app.listen(3000, function(){
  console.log("Listening On Port", 3000)
});

