const User = require("../models/user");
const Character = require("../models/character");

module.exports = {
  new: newCharacter,
  create,
  addToUser,
  show,
  index,
  update,
  deleteCharacter,
  updateCharacter,
  // edit,
};

function index(req, res) {
  Character.find({}, function (err, characters) {
    res.render("characters/index", { title: "Characters", characters, user: req.user });
  });
}

function newCharacter(req, res) {
  User.findById(req.params.id, function (err, user) {
    res.render("characters/new", {
      title: "Add Character",
      user,
      user: req.user,
    });
  });
}

function show(req, res) {
  Character.findById(req.params.id, function (err, character) {
    res.render("characters/show", {
      title: "Character",
      character,
      user: req.user,
    });
  });
}

// function edit(req, res) {
//   Character.findById(req.params.id, function (err, character) {
//     res.render("characters/edit", {
//       title: "Character",
//       character,
//       user: req.user,
//     });
//   });
// }


function update(req, res) {
  Character.findByIdAndUpdate(req.body, function (err, character) {
    console.log(character);
    res.redirect(`/users/`);
  });
}

function updateCharacter(req, res) {
  User.findById(req.params.id, function (err, user) {
    const character = new Character(req.body)
    character.user = user
    character.save(function (err) {
      res.redirect(`/users/`);
    });
  });
}

function create(req, res) {
  Character.create(req.body, function (err, character) {
    console.log(character);
    res.redirect(`/users/${user._id}/characters`);
  });
}

function addToUser(req, res) {
  User.findById(req.params.id, function (err, user) {
    const character = new Character(req.body)
    character.user = user
    character.save(function (err) {
      res.redirect(`/users/${user._id}/characters`);
    });
  });
}

function deleteCharacter(req, res) {
  User.findById(req.params.id, function (err, user) {
    const userId = req.user.id;
    Character.findByIdAndDelete(req.params.id, function (err, character) {
      res.redirect(`/users/${userId}/characters`)
    });
  });
}