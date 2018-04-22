// Modo Estricto
'use strict';

// Dependencias
const List = require('../models/lists');
const debug = require('debug')('listitem:controllers-list')

/* Utilizamos los metodos de mongoose para manipular la base de datos de mongodb
 * find()      Muestra todas las listas
 * findById()  Muestra una lista por ID
 * update()    Actualiza un campo de la lista
 * remove()    Elimina una lista
 * Respondemos retornando JSON con el objeto buscado, creado, modificado o eliminado.
 */
const ListsController = {
  getLists: async (req, res) => {
    const lists = await List.find({});
    debug(lists);
    res.status(200).json({lists});
  },
  createLists: async (req, res) => {
    const newlist = await new List(req.body);
    const list = await newlist.save();
    res.status(201).json(list);
  },
  getListsById: async (req, res) => {
    const listId = req.params.listId;
    const listResult = await List.findById(listId);
    res.status(200).json(listResult);
  },
  updateLists: async (req, res) => {
    const listId = req.params.listId;
    const listUpdated = await List.update(
      {_id: listId}, 
      {$set: {name: req.body.newName}});
    res.status(200).json({
      message: "List Updated!!",
      listId,
      name: req.body.newName
    });
  },
  deleteLists: async (req, res) => {
    const listId = req.params.listId;
    const listRemoved = await List.remove({_id: listId});
    res.status(200).json({
      message: "List Deleted!!",
      listId
    });
  }
};

module.exports = ListsController;
