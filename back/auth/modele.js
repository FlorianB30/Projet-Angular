const fs = require('fs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid'); 
const SECRET_KEY = "MySecretKeyFromEnv";

const register = (req, res) => {
    const newUser = req.body;
    if (!newUser.email || !newUser.password || !newUser.name) {
        return res.status(400).json({ message: 'Veuillez fournir un nom d\'utilisateur, un email et un mot de passe.' });
    }

    fs.readFile('bdd/users.json', (err, data) => {
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

        fs.writeFile('bdd/users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur d\'écriture dans le fichier' });
            }
            res.status(201).json({ message: 'Utilisateur ajouté avec succès', user: userWithId });
        });
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    fs.readFile('bdd/users.json', (err, data) => {
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
};

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const verify = (req, res) => {
    res.json({ valid: true, user: req.user });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    fs.readFile('bdd/users.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        users[userIndex] = { ...users[userIndex], ...updatedUser };

        fs.writeFile('bdd/users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur de mise à jour de l\'utilisateur.' });
            }
            res.json({ message: 'Utilisateur modifié avec succès', user: users[userIndex] });
        });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    fs.readFile('bdd/users.json', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const newUsers = users.filter(user => user.id !== id);

        if (users.length === newUsers.length) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        fs.writeFile('bdd/users.json', JSON.stringify(newUsers, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur de suppression de l\'utilisateur.' });
            }
            res.json({ message: 'Utilisateur supprimé avec succès' });
        });
    });
};

module.exports = { register, login, authenticateToken, verify, updateUser, deleteUser };
