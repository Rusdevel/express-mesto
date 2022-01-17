const express = require('express');

const router = express.Router(); // создали роутер
const {
  getUsersInfo, getUserId, createUser, updateAvatar, updateUser,
} = require('../controllers/users');

router.get('/users', getUsersInfo);
router.get('/users/:id', getUserId);
router.post('/users', createUser);
router.patch('/me/avatar', updateAvatar);
router.patch('/me', updateUser);
module.exports = router;
