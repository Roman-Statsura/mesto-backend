const usersRouter = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', createNewUser);

usersRouter.patch('/me', updateUserProfile);

usersRouter.patch('/me/avatar', updateUserAvatar);

module.exports = usersRouter;
