//mongodb+srv://SharkO:qWPipuED7pcujQyD@cluster0.eevb9nh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//--------------------------------------------------------------------------------------------------------------------------------------------------------------

//Crée la connection avec ma "Base de données" MongoDB
mongoose.connect('mongodb+srv://SharkO:qWPipuED7pcujQyD@cluster0.n7cz2me.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//-------------------------------------------------------------------------------------------------------------------------------------------------------------

//Header d'access (pemet a notre Application d'accéder à l'API sans aucun probléme)
app.use((req, res, next) => {
   //'Celui qui a le droit de rejoindre notre API c'est','Tous le monde'
   res.setHeader('Access-Control-Allow-Origin', '*');
   //Autorisation d'utiliser certain HEADER sur notre en-tête
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   //Autorisation d'utiliser certain METHODES DE REQUÊTES sur notre en-tête
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
 });

 //-------------------------------------------------------------------------------------------------------------------------------------------------------------
//Permet de décuplé le lien de la route pour le debut de chaqu'une de nos routes sur notre fichier stuff.js (prérmet d'éviter de récrire '/api/stuff' sur chaqu'une des routes)
app.use('/api', stuffRoutes);
app.use('/api/auth', userRoutes);
//-------------------------------------------------------------------------------------------------------------------------------------------------------------
//Exportation de notra Application au fichier server
module.exports = app;