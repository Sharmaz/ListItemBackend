// Modo Estricto
'use strict';

const ItemsController = {
  getItems: (req, res) => {
    res.status(200).json({
      message: "Getting Items"
    });
  },
  createItems: (req, res) => {
    res.status(200).json({
      message: "Item Created!!"
    });
  },
  getItemsById: (req, res) => {
    const itemId = req.params;
    res.status(200).json({
      itemId
    });
  },
  updateItems: (req, res) => {
    const itemId = req.params;
    res.status(200).json({
      message: "Item Updated!!",
      itemId
    });
  },
  deleteItems: (req, res) => {
    const itemId = req.params.itemId;
    res.status(200).json({
      message: "Item Deleted!!",
      itemId
    });
  }
};

module.exports = ItemsController;
