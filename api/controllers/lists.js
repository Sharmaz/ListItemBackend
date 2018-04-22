// Modo Estricto
'use strict';

// Dependencias
const List = require('../models/lists');

/* Utilizamos los metodos de mongoose para manipular la base de datos de mongodb
 * find()      Muestra todas las listas
 * findById()  Muestra una lista por ID
 * update()    Actualiza un campo de la lista
 * remove()    Elimina una lista
 * Validamos si existe la lista por ID antes de obtener, modificar o eliminar.
 * Respondemos retornando JSON con el objeto buscado, creado, modificado o eliminado.
 */
const ListsController = {
  getLists: async (req, res) => {

    /* Mostramos todas las listas seleccionando el ID y el Nombre
     * Con populate() hacemos algo similar a un join en SQL, en este caso con los Items
     * Dentro del populate seleccionamoes el ID y Nombre del Item
     */
    const lists = await List.find({}).select('_id name').populate('items', '_id name');
    res.status(200).json({lists});
  },
  createLists: async (req, res) => {
    const newlist = await new List(req.body);

    // Guardamos la lista en la base de datos con save()
    const list = await newlist.save();

    // Respondemos con los datos ID y name de la lista creada
    res.status(201).json({
      message: 'Created List!!',
      createList: {
        _id: list._id,
        name: list.name
      }
    });
  },
  getListsById: async (req, res) => {

    /* Asignación por destructuring, es lo mismo que:
     * const listId = req.params.listId;
     */
    const { listId } = req.params;
    const listResult = await List.findById(listId).select('_id name');
    
    // Si no existe la lista por ID, mandamos error 404
    if (!listResult) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    }
    
    // Mandamos como respuesta el resultado de la busqueda y selección
    else {
      res.status(200).json(listResult);
    }
  },
  updateLists: async (req, res) => {
    const { listId } = req.params;
    const listResult = await List.findById(listId);
    
    // Si no existe la lista por ID mandamos error 404
    if (!listResult) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    }
    else {
      
      // Actualizamos la lista pasandole a update() el ID, le decimos que cambie name
      const listUpdated = await List.update(
        {_id: listId}, 
        {$set: {name: req.body.newName}});
      
      // Respondemos con los datos de la lista actualizada
      res.status(200).json({
        message: 'List Updated!!',
        listId,
        name: req.body.newName
      });
    }
  },
  deleteLists: async (req, res) => {
    const { listId } = req.params;
    const listResult = await List.findById(listId);
    
    // Si no existe la lista por ID mandamos error 404
    if (!listResult) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    } 
    else {
      
      // Eliminamos la lista con remove()
      const listRemoved = await List.remove({_id: listId});
      res.status(200).json({
        message: 'List Deleted!!',
        listId
      });
    }
  }
};

module.exports = ListsController;
