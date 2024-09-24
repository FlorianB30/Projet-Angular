const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

const { register, login, authenticateToken, verify } = require('./auth/modele');
const { updateUser, deleteUser, getUsers, getUserById, getUserByEmail } = require('./users/modele');
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('./catalogue/modele');

app.use(cors());
app.use(bodyParser.json());

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/verify', authenticateToken, verify);

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.get('/users/email/:email', getUserByEmail);
app.put('/users', authenticateToken, updateUser);
app.delete('/users', authenticateToken, deleteUser);

app.get('/catalogue', getItems);
app.get('/catalogue/:id', getItemById);
app.post('/catalogue', createItem);
app.put('/catalogue/:id', updateItem);
app.delete('/catalogue/:id', deleteItem);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
