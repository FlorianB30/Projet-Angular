const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

const { register, login, authenticateToken, verify } = require('./auth/modele');
const { updateUser, deleteUser, getUsers, getUserById, getUserByEmail, addFriend, removeFriend, getFriends } = require('./users/modele');
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('./catalogue/modele');
const { createList, updateList, deleteList, deleteAllMyLists, getLists, getMyLists, getListsByUser, getListById, addItemInList, removeItemFromList, updateItemFromList, reserveItem, freeItem, getMyFriendsLists } = require('./wishlists/modele');
app.use(cors());
app.use(bodyParser.json());

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/verify', authenticateToken, verify);

app.get('/users', getUsers);
app.get('/users/friends', authenticateToken, getFriends);
app.get('/users/:id', getUserById);
app.get('/users/email/:email', getUserByEmail);
app.put('/users', authenticateToken, updateUser);
app.put('/users/friend/add', authenticateToken, addFriend);
app.put('/users/friend/remove', authenticateToken, removeFriend);
app.delete('/users', authenticateToken, deleteUser);

app.post('/list', authenticateToken, createList);
app.get('/list/:id', getListById);
app.post('/list/:id', authenticateToken, addItemInList);
app.delete('/list/:id', authenticateToken, deleteList);
app.put('/list/:id', authenticateToken, updateList);
app.put('/list/:listId/:itemId', authenticateToken, updateItemFromList);
app.delete('/list/:listId/:itemId', authenticateToken, removeItemFromList);
app.put('/list/reserve/:listId/:itemId', authenticateToken, reserveItem);
app.put('/list/free/:listId/:itemId', authenticateToken, freeItem);


app.delete('/lists', authenticateToken, deleteAllMyLists);
app.get('/lists', getLists);
app.get('/lists/my', authenticateToken, getMyLists);
app.get('/lists/friends', authenticateToken, getMyFriendsLists);
app.get('/lists/:idUser', getListsByUser);

app.get('/catalogue', getItems);
app.get('/catalogue/:id', getItemById);
app.post('/catalogue', createItem);
app.put('/catalogue/:id', updateItem);
app.delete('/catalogue/:id', deleteItem);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
