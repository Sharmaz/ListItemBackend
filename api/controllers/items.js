// Modo Estricto
'use strict';

// Dependencias
const Item = require('../models/items');
const List = require('../models/lists');

/* Utilizamos los metodos de mongoose para manipular la base de datos de mongodb
 * find()      Muestra todos los items
 * findById()  Muestra un item por ID
 * update()    Actualiza un campo de un item
 * remove()    Elimina un item
 * Respondemos retornando JSON con el objeto buscado, creado, modificado o eliminado.
 */
const ItemsController = {
  getItems: async (req, res) => {
    const items = await Item.find({}).select('_id name');
    res.status(200).json({items});
  },
  createItems: async (req, res) => {
    const list = await List.findById(req.body.listId)
    const newItem = await new Item({
      list: req.body.listId,
      name: req.body.name
    });
    list.items.push(newItem);
    list.save();
    const item = await newItem.save();
    res.status(201).json(item);
  },
  getItemsById: async (req, res) => {
    const itemId = req.params.itemId;
    const itemResult = await Item.findById(itemId).select('_id name');
    res.status(200).json(itemResult);
  },
  updateItems: async (req, res) => {
    const itemId = req.params.itemId;
    const itemUpdated = await Item.update(
      {_id: itemId}, 
      {$set: {name: req.body.newName}});
    res.status(200).json({
      message: "Item Updated!!",
      itemId,
      name: req.body.newName
    });
  },
  deleteItems: async (req, res) => {
    const itemId = req.params.itemId;
    const itemRemoved = await Item.remove({_id: itemId});
    res.status(200).json({
      message: "List Deleted!!",
      itemId
    });
  }
};

module.exports = ItemsController;
