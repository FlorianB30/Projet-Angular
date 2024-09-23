const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3005;

// Importer les fonctions du controller
const { register, login, authenticateToken, verify } = require('./auth/modele.js');

app.use(cors());
app.use(bodyParser.json());

app.post('/auth/register', register);  // Route d'enregistrement
app.post('/auth/login', login);        // Route de connexion
app.get('/auth/verify', authenticateToken, verify); // Route de vérification

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
