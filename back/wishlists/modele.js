const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const wishListsFilePath = 'bdd/wishlists.json';

const readItemsFromFile = (callback) => {
    fs.readFile(wishListsFilePath, (err, data) => {
        if (err) {
            return callback(new Error('Erreur de lecture du fichier des lists.'));
        }
        try {
            const lists = JSON.parse(data);
            callback(null, lists);
        } catch (error) {
            callback(new Error('Erreur de parsing des données des lists.'));
        }
    });
};

const writeItemsToFile = (lists, callback) => {
    fs.writeFile(wishListsFilePath, JSON.stringify(lists, null, 2), (err) => {
        if (err) {
            return callback(new Error('Erreur d\'écriture dans le fichier des lists.'));
        }
        callback(null);
    });
};

const createList = (req, res) => {
    const id = req.user.id;
    let newList = req.body ;
    newList.id = uuidv4()
    newList.idUser = id
    newList.items = []
    if (!newList.name) {
        return res.status(400).json({ message: 'Veuillez fournir un nom à la liste.' });
    }

    readItemsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        lists.push(newItem);

        writeItemsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: 'Item ajouté avec succès', item: newItem });
        });
    });
};

const getLists = (req, res) => {
    readItemsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(lists);
    });
};

const MyLists = (req, res) => {
    readItemsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(lists);
    });
};

const getItemById = (req, res) => { 
    const { id } = req.params;

    readItemsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const item = lists.find(i => i.id === id);
        if (!item) {
            return res.status(404).json({ message: 'Item non trouvé.' });
        }

        res.json(item);
    });
};

const updateItem = (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    readItemsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const itemIndex = lists.findIndex(i => i.id === id);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item non trouvé.' });
        }

        lists[itemIndex] = { ...lists[itemIndex], ...updatedItem };

        writeItemsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ message: 'Item modifié avec succès', item: lists[itemIndex] });
        });
    });
};

const deleteItem = (req, res) => {
    const { id } = req.params;

    readItemsFromFile((err, items) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const newItems = items.filter(i => i.id !== id);

        if (newItems.length === items.length) {
            return res.status(404).json({ message: 'Item non trouvé.' });
        }

        writeItemsToFile(newItems, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ message: 'Item supprimé avec succès' });
        });
    });
};

module.exports = { createItem, getItems, getItemById, updateItem, deleteItem };
