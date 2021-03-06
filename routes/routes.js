var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var personSchema = mongoose.Schema({
  username: String,
  age: String,
  email: String,
  password: String,
  Q1: String,
  Q2: String,
  Q3: String
});


var Person = mongoose.model('People_Collection', personSchema);

exports.index = function (req, res) {
  Person.find(function (err, person) {
    if (err) return console.error(err);
    // if (req.body.username == Person.find({ 'name': new RegExp(req.body.username) }, function (err, docs) {
    //   cb(docs);
    // }) && req.body.pass == Person.find({ 'name': new RegExp(req.body.pass) }, function (err, docs) {
    //   cb(docs);
    // })) {
    //   req.session.user = {
    //     isAuthenticated: true,
    //     username: req.body.username
    //   };
    //   res.redirect('home');
    // } else {
    //   res.redirect('/');
    // }
    res.render('index', {
      title: 'Login',
      people: person
    });
  });
};
 var sampleData = [15,92,47,63];


exports.home = function (req, res) {
  res.render('home', {
    title: 'Home Page',
    'data': sampleData
  });
};

exports.create = function (req, res) {
  res.render('create', {
      title: 'Add Person'
  });
};

exports.createPerson = function (req, res) {
  var person = new Person({
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    password: req.body.pass,
    Q1: req.body.Q1,
    Q2: req.body.Q2,
    Q3: req.body.Q3
  });
  person.save(function (err, person) {
    if (err) return console.error(err);
    console.log(req.body.username + ' added');
  });
  res.redirect('/');
};

exports.edit = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.render('edit', {
      title: 'Edit Person',
      person: person
    });
  });
};

exports.editPerson = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    Person.username = req.body.username,
    Person.age = req.body.age,
    Person.email = req.body.email,
    Person.password = req.body.password
    person.save(function (err, person) {
      if (err) return console.error(err);
      console.log(req.body.name + ' updated');
    });
  });
  res.redirect('/');

};

exports.delete = function (req, res) {
  Person.findByIdAndRemove(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.redirect('/');
  });
};

exports.details = function (req, res) {
  Person.findById(req.params.id, function (err, person) {
    if (err) return console.error(err);
    res.render('details', {
      title: person.username + "'s Details",
      person: person
    });
  });
};
