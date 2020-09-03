const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.patch('/me', updateUserProfile);

usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
