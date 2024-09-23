const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

const { register, login, authenticateToken, verify, updateUser, deleteUser } = require('./auth/modele');
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('./catalogue/modele');

app.use(cors());
app.use(bodyParser.json());

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/verify', authenticateToken, verify);
app.put('/auth/users/:id', updateUser);
app.delete('/auth/users/:id', deleteUser);

app.get('/catalogue', getItems);
app.get('/catalogue/:id', getItemById);
app.post('/catalogue', createItem);
app.put('/catalogue/:id', updateItem);
app.delete('/catalogue/:id', deleteItem);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
