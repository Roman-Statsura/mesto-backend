const usersRouter = require('express').Router();
const path = require('path');
const fs = require('fs');

const usersPath = path.join(__dirname, '../data/users.json');

usersRouter.get('/', (req, res) => {
  let users;
  try {
    const readUsersPath = fs.readFileSync(usersPath);
    users = JSON.parse(readUsersPath);
  } catch (err) {
    /* eslint no-console: ["error", { allow: ["error"] }] */
    console.error('Что-то определенно сломалось');
    res.status(500).send({ message: 'Что-то определенно сломалось' });
  }
  if (!users) {
    res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
  } else {
    res.send(users);
  }
});

function getUser(id, users) {
  /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
  return users.find((el) => el._id === id);
}

usersRouter.get('/:id', (req, res) => {
  let users;
  try {
    const readUsersPath = fs.readFileSync(usersPath);
    users = JSON.parse(readUsersPath);
  } catch (err) {
    /* eslint no-console: ["error", { allow: ["error"] }] */
    console.error('Что-то определенно сломалось');
    res.status(500).send({ message: 'Что-то определенно сломалось' });
  }
  if (getUser(req.params.id, users)) {
    res.send(getUser(req.params.id, users));
  } else {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
  }
});

module.exports = usersRouter;
