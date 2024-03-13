const express = require('express');
const mongoose = require('mongoose');

const app = express();
const http = require('http');

// Connexion à MongoDB
mongoose.connect('mongodb+srv://SharkO:qWPipuED7pcujQyD@cluster0.n7cz2me.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connexion à MongoDB réussie !');
    // Indique que la connexion à MongoDB a réussi
    app.set('mongoConnected', true);
})
.catch((error) => {
    console.log('Connexion à MongoDB échouée !', error);
    // Indique que la connexion à MongoDB a échoué
    app.set('mongoConnected', false);
});

// Reste du code pour la configuration du serveur...

const normalizePort = val => {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return null;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);