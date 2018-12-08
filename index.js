var express = require('express'),
  pug = require('pug'),
  path = require('path'),
  route = require('./routes/routes.js'),
  bodyParser = require('body-parser'),
  mongoose = require("mongoose"),
  expressSession = require('express-session'),
  cookieParser = require('cookie-parser');


var app = express();

// app.get('/', function (req, res) {
//   if(req.cookies.beenHereBefore === 'yes') {
//       res.send('You have been here before');
//   } else {
//       res.cookie('beenHereBefore', 'yes');
//       res.send('This is your first time');
//   }
  
// });

// app.get('/clear', function (req, res) {
//   res.clearCookie('beenHereBefore');
//   res.redirect('/');
// });

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
app.post('/create', urlencodedParser, route.createPerson);
app.post('/edit/:id', urlencodedParser, route.editPerson);
app.get('/delete/:id', route.delete);

app.listen(3000, function(){
  console.log("Listening On Port", 3000)
});

app.post('/',urlencodedParser, function(req, res){
  console.log(req.body.username);
  if(req.body.firstName=='Bob' && req.body.lastName=='Whatever' &&req.body.pass=='npm'){
    req.session.user={
      isAuthenticated: true,
      username: req.body.username
    };
    res.redirect('/private');
    res.redirect('/other');
  }else{
    res.redirect('/');
  }
  
});