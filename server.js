const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Импортируем роуты
const profileRoutes = require('./routes/profileRoutes');
const commentRoutes = require('./routes/commentRoutes');
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');
const wallPostRoutes = require('./routes/wallPostsRoutes');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Импортируем базу данных и запускаем подключение
const database = require('./database/db');
database();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Подключаем роуты
app.use('/energy', profileRoutes);
app.use('/energy', commentRoutes);
app.use('/energy', postRoutes);
app.use('/energy', wallPostRoutes);
app.use('/energy', authRoutes);

// Для продакшн среды, предполагаем, что frontend собирается в папку 'client/build'
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 6000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('Server is running on PORT ' + PORT);
});
