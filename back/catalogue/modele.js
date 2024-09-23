const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const itemsFilePath = 'bdd/items.json';

const readItemsFromFile = (callback) => {
    fs.readFile(itemsFilePath, (err, data) => {
        if (err) {
            return callback(new Error('Erreur de lecture du fichier des items.'));
        }
        try {
            const items = JSON.parse(data);
            callback(null, items);
        } catch (error) {
            callback(new Error('Erreur de parsing des données des items.'));
        }
    });
};

const writeItemsToFile = (items, callback) => {
    fs.writeFile(itemsFilePath, JSON.stringify(items, null, 2), (err) => {
        if (err) {
            return callback(new Error('Erreur d\'écriture dans le fichier des items.'));
        }
        callback(null);
    });
};

const createItem = (req, res) => {
    let newItem = req.body ;
    newItem.id = uuidv4()
    newItem.price = newItem.price.toFixed(2)
    if (!newItem.name || !newItem.description || newItem.price === undefined) {
        return res.status(400).json({ message: 'Veuillez fournir un nom, une description et un prix.' });
    }

    readItemsFromFile((err, items) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        items.push(newItem);

        writeItemsToFile(items, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: 'Item ajouté avec succès', item: newItem });
        });
    });
};

const getItems = (req, res) => {
    readItemsFromFile((err, items) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(items);
    });
};

const getItemById = (req, res) => {
    const { id } = req.params;

    readItemsFromFile((err, items) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const item = items.find(i => i.id === id);
        if (!item) {
            return res.status(404).json({ message: 'Item non trouvé.' });
        }

        res.json(item);
    });
};

const updateItem = (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    updatedItem.price =  parseFloat(updatedItem.price.toFixed(2))
    readItemsFromFile((err, items) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        const itemIndex = items.findIndex(i => i.id === id);
        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item non trouvé.' });
        }

        items[itemIndex] = { ...items[itemIndex], ...updatedItem };

        writeItemsToFile(items, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.json({ message: 'Item modifié avec succès', item: items[itemIndex] });
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
