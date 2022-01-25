const User = require('../models/user');

const getUsersInfo = (req, res) => User.find({})
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => {
    console.log(err);
  });

const getUserId = (req, res) => User.findById(req.params.userId)
  .orFail(new Error('NotFound'))
  .then((user) => {
    res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(400).send({
        message: 'Переданы некорректные данные',
      });
    } else if (err.name === 'NotFound') {
      res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
    } else {
      res.status(500).send({ message: err.message });
    }
  });

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({
          message: 'Переданы некорректные данные',
        });
      } else if (err.name === 'NotFound') {
        res.status(404).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotFound'))
    .then((user) => { res.status(200).send(user); })
    .catch((err) => {
      if (err.name === 'NotFound') {
        res.status(404).send({
          message: 'Пользователь с указанным _id не найден',
        });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
};

module.exports = {
  getUsersInfo, getUserId, createUser, updateAvatar, updateUser,
};
