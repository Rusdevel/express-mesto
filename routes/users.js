const express = require('express');

const router = express.Router(); // создали роутер
const {
  getUsersInfo, getUserId, createUser, updateAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsersInfo);
router.get('/users/:userId', getUserId);
router.post('/users', createUser);
router.patch('/users/me/avatar', updateAvatar);
router.patch('/users/me', updateUser);
module.exports = router;
