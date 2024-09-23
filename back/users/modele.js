const fs = require('fs');
const usersFilePath = 'bdd/users.json';

const updateUser = (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    if (req.user.email !== updatedUser.email) {
        return res.status(403).json({ message: 'Vous ne pouvez mettre à jour que vos propres informations.' });
    }

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        users[userIndex] = { ...users[userIndex], ...updatedUser };

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur de mise à jour de l\'utilisateur.' });
            }
            res.json({ message: 'Utilisateur modifié avec succès', user: users[userIndex] });
        });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const userToDelete = users.find(user => user.id === id);

        if (!userToDelete) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        if (req.user.email !== userToDelete.email) {
            return res.status(403).json({ message: 'Vous ne pouvez supprimer que votre propre compte.' });
        }
        const newUsers = users.filter(user => user.id !== id);

        fs.writeFile(usersFilePath, JSON.stringify(newUsers, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur de suppression de l\'utilisateur.' });
            }
            res.json({ message: 'Utilisateur supprimé avec succès' });
        });
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.id === id);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.json(user);
    });
};

const getUserByEmail = (req, res) => {
    const { email } = req.params;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.email === email);

        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }

        res.json(user);
    });
};

const getUsers = (req, res) => {
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        const users = JSON.parse(data);
        res.json(users);
    });
};

module.exports = { updateUser, deleteUser, getUserById, getUserByEmail, getUsers };
