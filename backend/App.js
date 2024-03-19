const express = require('express');
const app = express();
const mongoose = require('mongoose');
const booksRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config();
const rateLimit = require('express-rate-limit');

mongoose.connect(`mongodb+srv://SharkO:qWPipuED7pcujQyD@cluster0.n7cz2me.mongodb.net/données-serveur?retryWrites=true&w=majority&appName=Cluster0`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: 'Trop de requêtes effectuées. Réessayer plus tard.'
});

app.use(limiter);

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;