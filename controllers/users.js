const User = require('../models/user');

const getUsersInfo = (req, res) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => {
    console.log(err);
  });

const getUserId = (req, res) => User.findById(req.params.id)
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    console.log(err);
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => { res.send(user); })
    .catch((err) => {
      console.log(err);
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      console.log(err);
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUsersInfo, getUserId, createUser, updateAvatar, updateUser,
};
