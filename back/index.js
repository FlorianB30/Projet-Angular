const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); 
const cors = require('cors');
const app = express();
const PORT = 3005;
const SECRET_KEY = "MySecretKeyFromEnv";

app.use(cors());
app.use(bodyParser.json());
app.post('/register', (req, res) => {
    const newUser = req.body;
    if (!newUser.email || !newUser.password || !newUser.name) {
        return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur, un email et un mot de passe.' });
    }

    fs.readFile('users.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        const users = JSON.parse(data);

        const existingUser = users.find(user => user.email === newUser.email);
        if (existingUser) {
            return res.status(409).json({ message: 'Cet utilisateur existe déjà.' });
        }

        const userWithId = { id: uuidv4(), ...newUser };

        users.push(userWithId);

        fs.writeFile('users.json', JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur d\'écriture dans le fichier' });
            }
            res.status(201).json({ message: 'Utilisateur ajouté avec succès', user: userWithId });
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    fs.readFile('users.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        const users = JSON.parse(data);
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        const token = jwt.sign({ name: user.name, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ token });
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
