//mongodb+srv://SharkO:qWPipuED7pcujQyD@cluster0.eevb9nh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
//Package qui permet d'éviter le spam des requête au serveur
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// connexion à ma base de données
//`mongodb+srv://leiroz26:${process.env.MDP_BDD}@bddmonvieuxgrimoire.rnsqoxc.mongodb.net/?retryWrites=true&w=majority`
mongoose.connect(`mongodb+srv://SharkO:qWPipuED7pcujQyD@cluster0.n7cz2me.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// fonction pour limiter le nombre de requetes à 10 sur 1 min (évite les attaques DoS)
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 20 requêtes maximum par minute
  message: 'Trop de requêtes effectuées. Réessayer plus tard.'
});

//app.use(limiter);

// Nous mets à disposition le contenu de toutes les requetes qui contiennet du JSON
app.use(express.json());

// Gestion des CORS pour toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use('/api/books', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;