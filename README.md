# mesto-backend

### Version 
"0.0.6"

## Backend для сервиса Mesto, где люди могут делиться фотографиями своих любимых мест.

## Установка
Перед началом работы проверьте наличие установленного node.js и npm

### Склонируйте Mesto

https://github.com/Roman-Statsura/mesto-backend.git

### Установите зависимости

npm install

### Запуск сервера

npm run start 
запускает сервер на http://localhost:3000, где 3000 - порт по умолчанию

npm run dev 
запускает сервер на http://localhost:3000 с хот релоудом

### Функционал

Node.js приложение подключается к серверу Mongo по адресу mongodb://localhost:27017/mestodb;

созданы схема и модель пользователя с полями name, about и avatar, поля корректно валидируются;

созданы схема и модель карточки с полями name, link, owner, likes и createdAt, поля корректно валидируются;

запрос на GET /users возвращает всех пользователей из базы;

запрос GET /users/:userId возвращает конкретного пользователя;

запрос POST /users создаёт пользователя;

запрос GET /cards возвращает все карточки всех пользователей;

запрос POST /cards создаёт карточку;

если в любом из запросов что-то идёт не так, сервер возвращает ответ с ошибкой и соответствующим ей статусом;

в контроллере createUser почта и хеш пароля записываются в базу;

есть контроллер login, он проверяет, полученные в теле запроса почту и пароль;

если почта и пароль верные, контроллер login создаёт JWT, в пейлоуд которого записано свойство _id с идентификатором пользователя; срок жизни токена — 7 дней;

если почта и пароль верные, контроллер login возвращает созданный токен в ответе;

если почта и пароль не верные, контроллер login возвращает ошибку 401;

в app.js есть обработчики POST-запросов на роуты /signin и /signup;

есть файл middlewares/auth.js, в нём мидлвэр для проверки JWT;

при правильном JWT авторизационный мидлвэр добавляет в объект запроса пейлоуд и пропускает запрос дальше;

при неправильном JWT авторизационный мидвэр возвращает ошибку 401;

все роуты, кроме /signin и /signup, защищены авторизацией;

пользователь не может удалить карточку, которую он не создавал;

API не возвращает хеш пароля.
