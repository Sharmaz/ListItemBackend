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
 * Validamos si existe la lista o el item por ID antes de obtener, crear, modificar o eliminar.
 * Respondemos retornando JSON con el objeto buscado, creado, modificado o eliminado.
 */
const ItemsController = {
  getItems: async (req, res) => {
    
    // Mostramos todos los items seleccionando el ID y el Nombre
    const items = await Item.find({}).select('_id name');
    res.status(200).json({items});
  },
  createItems: async (req, res) => {
    const list = await List.findById(req.body.listId);
    const newItem = await new Item({
      list: req.body.listId,
      name: req.body.name
    });
    
    // Si no existe la lista mandamos Error 404
    if (!list) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    }
    else {

      // Si existe la lista agregamos el item nuevo al arreglo de items de la lista
      list.items.push(newItem);
      
      // Guardamos la lista con los cambios en la base de datos
      list.save();
      
      // Guardamos el item nuevo en la base de datos
      const item = await newItem.save();

      // Respondemos con los datos ID y nombre del nuevo item
      res.status(201).json({
        message: 'Item Created!!',
          _id: item._id,
          name: item.name
      });
    }
  },
  getItemsById: async (req, res) => {
    
    /* Asignación por destructuring, es lo mismo que:
     * const itemId = req.params.itemId;
     */
    const { itemId } = req.params;
    const itemResult = await Item.findById(itemId).select('_id name');
    
    // Si no existe el item con cierto ID mandamos Error 404
    if (!itemResult) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    }
    else {
      
      // Respondemos con el resultado del item
      res.status(200).json(itemResult);
    }
  },
  updateItems: async (req, res) => {
    const { itemId } = req.params;
    const itemResult = await Item.findById(itemId);
    
    // Si no existe el item con cierto ID mandamos Error 404
    if (!itemResult) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    }
    else {

      // Actualizamos el item pasandole a update() el ID, le decimos que cambie name
      const itemUpdated = await Item.update(
        {_id: itemId}, 
        {$set: {name: req.body.newName}});
      
      // Respondemos con los datos del item actualizado
      res.status(200).json({
        message: 'Item Updated!!',
        itemId,
        name: req.body.newName
      });
    }
  },
  deleteItems: async (req, res) => {
    const { itemId } = req.params;
    const itemResult = await Item.findById(itemId);
    
    // Si no existe el item con cierto ID, mandamos Error 404
    if (!itemResult) {
      res.status(404).json({
        message: 'Not entry found provided by that ID'
      });
    }
    else {

      // Si existe el item, lo eliminamos por ID con remove()
      const itemRemoved = await Item.remove({_id: itemId});
      res.status(200).json({
        message: 'List Deleted!!',
        itemId
      });
    }
  }
};

module.exports = ItemsController;
