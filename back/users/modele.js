const fs = require('fs');
const usersFilePath = 'bdd/users.json';

const updateUser = (req, res) => {
    const id = req.user.id;
    let updatedUser = { ...req.body };
    delete updatedUser.password;
    delete updatedUser.friends;
    updatedUser.id = id
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

const addFriend = (req, res) => {
    const id = req.user.id;
    let friendEmail = req.body.email;
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        const friendIndex = users.findIndex(user => user.email === friendEmail);
        if (friendIndex === -1) {
            return res.status(404).json({ message: 'Ami non trouvé.' });
        }
        const friendId = users[friendIndex].id
        let user = users[userIndex];
        if (!user.friends) {
            user.friends = [];
        }
        if (user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'Cet utilisateur est déjà votre ami.' });
        }

        user.friends.push(friendId);

        users[userIndex] = user;

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur de mise à jour de l\'utilisateur.' });
            }
            res.json({ message: 'Utilisateur modifié avec succès', user: users[userIndex] });
        });
    });
};

const removeFriend = (req, res) => {
    const id = req.user.id;
    let friendEmail = req.body.email;
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        const friendIndex = users.findIndex(user => user.email === friendEmail);
        if (friendIndex === -1) {
            return res.status(404).json({ message: 'Ami non trouvé.' });
        }
        const friendId = users[friendIndex].id
        let user = users[userIndex];
        if (!user.friends) {
            return res.status(400).json({ message: "Vous n'avez pas d'ami." });
        }

        index = user.friends.findIndex(fid => fid === friendId)
        if (index === -1) {
            return res.status(400).json({ message: "Cet utilisateur n'est pas votre ami." });
        }
        user.friends.splice(index, 1);
    
        users[userIndex] = user;

        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur de mise à jour de l\'utilisateur.' });
            }
            res.json({ message: 'Utilisateur modifié avec succès', user: users[userIndex] });
        });
    });
};

const deleteUser = (req, res) => {
    const id = req.user.id;
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        let users = JSON.parse(data);
        const userToDelete = users.find(user => user.id === id);

        if (!userToDelete) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
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

const getFriends = (req, res) => {
    const id = req.user.id;

    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Erreur de lecture du fichier' });
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.id === id);
        
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé.' });
        }
        const friendsIds = user.friends
        const friends = users.filter(user => friendsIds.includes(user.id));
        res.json(friends);
    });
};

module.exports = { updateUser, deleteUser, getUserById, getUserByEmail, getUsers, addFriend, removeFriend, getFriends };
