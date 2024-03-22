const bcrypt = require('bcrypt');
// jsonwebtoken: Permet de crée un token crypté et de le vérifier
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

//Crée un compte
exports.signup = (req, res, next) => {
    const { email, password } = req.body;

    // Vérification de l'e-mail valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Veuillez entrer une adresse e-mail valide.' });
    }
    
    // Vérification de la longueur minimale du mot de passe
    if (password.length < 4) {
        return res.status(400).json({ message: 'Le mot de passe doit comporter au moins 4 caractères.' });
    }
    // Vérification chiffre et majuscule
    const passwordRegex = /(?=.*[A-Z])(?=.*\W)/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins un chiffre et une majuscule.' });
    }
    
    User.findOne({ email })
    .then(user => {
        if(user !== null) {
            res.status(401).json({ message: 'Utilisateur déja enregistré ! Veuillez vous connecter !' });
        } else {
            // hachage du mot de passe 10 fois
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
            // Création de la nouvelle instance de User
            const user = new User({
                email: email,
                password: hash,
            });
            // Sauvegarder du nouvelle user dans la BDD
            user.save()
            .then(() => res.status(201).json({ message: 'utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }))
            })
        }
    })
    .catch(error => res.status(500).json({ error }));
};
//Se connecter
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        // Si aucun utilisateur na été trouver ayent la même email
        if(user === null){
            res.status(401).json({message: 'Paire identifiant/ mot de passe incorecte'})
        }else{
            //Compare le mots de passe crypté envoyer et celui dans la base de données
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    res.status(401).json({message: 'Paire identifiant/ mot de passe incorecte'})
                }else{
                // Retourne les information nécéssaire a notre client pour ça page (l'id user et son token);
                    res.status(200).json({
                        userId: user._id,
                        // Prmet de encodée des données
                        token: jwt.sign(
                            { userId: user._id },
                            // Va chercher la Clé d'autorisation dans le fichier sécurisé (.env)
                            process.env.CLE_SECRETE,
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
}