// Modo Estricto
'use strict';

const ListsController = {
  getLists: (req, res) => {
    res.status(200).json({
      message: "Getting Lists"
    });
  },
  createLists: (req, res) => {
    const list = {
      name: req.body.name
    };
    res.status(200).json({
      message: "List Created",
      list
    });
  },
  getListsById: (req, res) => {
    const listId = req.params.listId;
    res.status(200).json({
      listId
    });
  },
  updateLists: (req, res) => {
    const listId = req.params.listId;
    res.status(200).json({
      message: "List Updated!!",
      listId
    });
  },
  deleteLists: (req, res) => {
    const listId = req.params.listId;
    res.status(200).json({
      message: "List Deleted!!",
      listId
    });
  }
};

module.exports = ListsController;
