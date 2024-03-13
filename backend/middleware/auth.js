const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Vérifie si le token JWT est présent dans l'en-tête Authorization de la requête
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            // Si le token est manquant, renvoie une réponse d'erreur 401 Unauthorized
            return res.status(401).json({ message: 'Token non fourni. Authentification requise.' });
        }
        
        // Décode le token JWT avec la clé secrète
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId

        // Extrait l'ID de l'utilisateur du token décodé et l'ajoute à l'objet de requête pour une utilisation ultérieure dans les contrôleurs de route
        req.auth = {
            userId: userId
        };

        // Appelle la fonction next() pour passer au middleware ou au contrôleur de route suivant
        next();
    } catch (error) {
        // Si une erreur se produit lors de la vérification du token JWT, renvoie une réponse d'erreur 401 Unauthorized avec un message d'erreur approprié
        return res.status(401).json({ message: 'Token invalide. Authentification échouée.' });
    }
}