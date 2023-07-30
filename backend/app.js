const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes');

const handleErrors = require('./middlewares/handleErrors');

// Слушаем 3000 порт
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

app.use(helmet());

app.use(bodyParser.json());

mongoose.connect(DB_URL);

app.use(router);

app.use(errors());

app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен! Порт ${PORT}`);
});
