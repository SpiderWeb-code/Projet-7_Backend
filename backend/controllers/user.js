const bcrypt = require('bcrypt');
// jsonwebtoken: Permet de crée un token crypté et de le vérifier
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Crée un compte
exports.signup = (req, res, next) => {
    console.log("Signup function called");
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
            console.error("Une erreur s'est produite :", error);
            res.status(400).json({ error: "Une erreur s'est produite lors du traitement de la demande." });
        });
    })
    .catch(error => {
        console.error("Error hashing password:", error);
        res.status(500).json({ error });
    });
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
                            'RANDOM_TOKEN_SECRET',
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