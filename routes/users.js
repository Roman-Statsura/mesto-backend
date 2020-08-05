const usersRouter = require('express').Router();
const { getAllUsers, getUserById, createNewUser } = require('../controllers/users');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:id', getUserById);

usersRouter.post('/', createNewUser);

module.exports = usersRouter;
