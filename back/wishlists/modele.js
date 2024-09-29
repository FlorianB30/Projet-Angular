const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const wishListsFilePath = 'bdd/wishlists.json';


const getMyFriendsIds = (id, callback) => {
    fs.readFile('bdd/users.json', (err, data) => {
        if (err) {
            return callback(new Error('Erreur de lecture du fichier des users.'));
        }
        try {
            const users = JSON.parse(data);
            const me = users.find(user => user.id === id);
            const myFriends = me.friends
            callback(null, myFriends);
        } catch (error) {
            callback(new Error('Erreur de parsing des données des users.'));
        }
    });
}; 

const readListsFromFile = (callback) => {
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

const writeListsToFile = (lists, callback) => {
    fs.writeFile(wishListsFilePath, JSON.stringify(lists, null, 2), (err) => {
        if (err) {
            return callback(new Error('Erreur d\'écriture dans le fichier des lists.'));
        }
        callback(null);
    });
};

const createList = (req, res) => {
    const idUser = req.user.id;
    let newList = req.body ;
    newList.id = uuidv4()
    newList.idUser = idUser
    newList.items = []
    if (!newList.name) {
        return res.status(400).json({ message: 'Veuillez fournir un nom à la liste.' });
    }

    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }

        lists.push(newList);

        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ message: 'Liste ajoutée avec succès', item: newList });
        });
    });
};

const updateList = (req, res) => {
    const idUser = req.user.id;
    const { id } = req.params;
    let newListName = req.body.name;
    let shared = req.body.shared;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === id && list.idUser === idUser);
        if(listIndex === -1){
            return res.status(403).json({ message: 'Vous ne posséder pas cette liste' });
        }
        let targetList = lists[listIndex]
        targetList.name = newListName
        targetList.shared = shared
        lists[listIndex] = targetList
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Liste modifiée avec succès', list: targetList });
        });
    });
};

const deleteList = (req, res) => {
    const idUser = req.user.id;
    const { id } = req.params;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === id && list.idUser === idUser);
        if(listIndex === -1){
            return res.status(403).json({ message: 'Vous ne posséder pas cette liste' });
        }
        lists.splice(listIndex, 1);
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Liste supprimée avec succès'});
        });
    });
};

const deleteAllMyLists = (req, res) => {
    const idUser = req.user.id;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        lists = lists.filter(list => list.idUser !== idUser);
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Vos listes ont supprimées avec succès'});
        });
    });
};

const getLists = (req, res) => {
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(lists);
    });
};

const getMyLists = (req, res) => {
    const idUser = req.user.id;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const myLists = lists.filter(list => list.idUser === idUser);
        res.json(myLists);
    });
};

const getMyFriendsLists = (req, res) => {
    const idUser = req.user.id;

    getMyFriendsIds(idUser, (err, myFriends) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        readListsFromFile((err, lists) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if(!myFriends){
                res.json([]);
            }
            const myFriendsLists = lists.filter(list => myFriends.includes(list.idUser));
            res.json(myFriendsLists);
        });
    });

};

const getListsByUser = (req, res) => {
    const { idUser } = req.params;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const userLists = lists.filter(list => list.idUser === idUser);
        res.json(userLists);
    });
};

const getListById = (req, res) => {
    const { id } = req.params;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const list = lists.find(list => list.id === id);
        res.json(list);
    });
};

const getSharedLists = (req, res) => {
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const sharedLists = lists.filter(list => list.shared === true);
        res.json(sharedLists);
    });
}

const addItemInList = (req, res) => {
    const idUser = req.user.id;
    const { id } = req.params;
    let newItem = req.body;
    newItem.giverId = null
    newItem.id = uuidv4()
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === id && list.idUser === idUser);
        if(listIndex === -1){
            return res.status(403).json({ message: 'Vous ne posséder pas cette liste' });
        }
        let targetList = lists[listIndex]
        targetList.items.push(newItem)
        lists[listIndex] = targetList
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Item ajouté avec succes', newItem });
        });
    });
};

const removeItemFromList = (req, res) => {
    const idUser = req.user.id;
    const { listId, itemId } = req.params;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === listId && list.idUser === idUser);
        if(listIndex === -1){
            return res.status(403).json({ message: 'Vous ne posséder pas cette liste' });
        }
        let targetList = lists[listIndex]
        const itemIndex = targetList.items.findIndex(item => item.id === itemId);
        if(itemIndex === -1){
            return res.status(404).json({ message: 'Cet item n\'est pas dans la liste' });
        }
        targetList.items.splice(itemIndex, 1);
        lists[listIndex] = targetList
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Item supprimé avec succes' });
        });
    });
};

const updateItemFromList = (req, res) => {
    const idUser = req.user.id;
    const { listId, itemId } = req.params;
    let updatedItem = req.body;
    if(updatedItem.price){
        try {
            updatedItem.price = parseFloat(updatedItem.price.toFixed(2))
        } catch (error) {
            return res.status(400).json({ message: 'Prix invalide' });
        }
    }
    delete updatedItem.giverId;
    delete updatedItem.id;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === listId && list.idUser === idUser);
        if(listIndex === -1){
            return res.status(403).json({ message: 'Vous ne posséder pas cette liste' });
        }
        let targetList = lists[listIndex]
        const itemIndex = targetList.items.findIndex(item => item.id === itemId);
        if(itemIndex === -1){
            return res.status(404).json({ message: 'Cet item n\'est pas dans la liste' });
        }
        

        targetList.items[itemIndex] = { ... targetList.items[itemIndex], ...updatedItem };
        lists[listIndex] = targetList
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Item modifié avec succes', updatedItem });
        });
    });
};

const reserveItem = (req, res) => {
    const idUser = req.user.id;
    const { listId, itemId } = req.params;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === listId);
        if(listIndex === -1){
            return res.status(404).json({ message: 'Cette liste n\'existe pas' });
        }
        let targetList = lists[listIndex]
        const itemIndex = targetList.items.findIndex(item => item.id === itemId);
        if(itemIndex === -1){
            return res.status(404).json({ message: 'Cet item n\'est pas dans la liste' });
        }
        if(lists[listIndex].items[itemIndex].giverId !== null){
            return res.status(400).json({ message: 'Quelqu\'un a déja réservé cet item' });
        }
        
        lists[listIndex].items[itemIndex].giverId = idUser
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Item réservé avec succes'});
        });
    });
};

const freeItem = (req, res) => {
    const idUser = req.user.id;
    const { listId, itemId } = req.params;
    readListsFromFile((err, lists) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        const listIndex = lists.findIndex(list => list.id === listId);
        if(listIndex === -1){
            return res.status(404).json({ message: 'Cette liste n\'existe pas' });
        }
        let targetList = lists[listIndex]
        const itemIndex = targetList.items.findIndex(item => item.id === itemId);
        if(itemIndex === -1){
            return res.status(404).json({ message: 'Cet item n\'est pas dans la liste' });
        }
        if(lists[listIndex].items[itemIndex].giverId !== idUser){
            return res.status(400).json({ message: 'Item reservé par quelqu\'un d\'autre' });
        }
        
        lists[listIndex].items[itemIndex].giverId = null
        writeListsToFile(lists, (err) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(200).json({ message: 'Item libéré avec succes'});
        });
    });
};

module.exports = {
    createList,
    updateList,
    deleteList,
    deleteAllMyLists,
    getLists,
    getMyLists,
    getListsByUser,
    getListById,
    addItemInList,
    getSharedLists,
    removeItemFromList,
    updateItemFromList,
    reserveItem,
    freeItem,
    getMyFriendsLists,
    getSharedLists
};
