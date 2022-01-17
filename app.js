const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '61e4906685129e50e1d4e994', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use('/', usersRoute);
app.use('/', cardsRoute);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'ресурс не найден.' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
