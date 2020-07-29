const usersRouter = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

const usersPath = path.join(__dirname, '../data/users.json');

usersRouter.get('/', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      if (!users) {
        res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
      } else {
        res.send(users);
      }
    })
    .catch((err) => {
    /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error(err.message);
      console.error('Что-то определенно сломалось');
      res.status(500).send({ message: 'Что-то определенно сломалось' });
    });
});

function getUser(id, users) {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  return users.find((el) => el._id === id);
}

usersRouter.get('/:id', (req, res) => {
  fsPromises.readFile(usersPath, { encoding: 'utf8' })
    .then((data) => {
      const users = JSON.parse(data);
      const seachedUser = getUser(req.params.id, users);
      if (seachedUser) {
        res.send(seachedUser);
      } else {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => {
    /* eslint no-console: ["error", { allow: ["error"] }] */
      console.error(err.message);
      console.error('Что-то определенно сломалось');
      res.status(500).send({ message: 'Что-то определенно сломалось' });
    });
});

module.exports = usersRouter;
