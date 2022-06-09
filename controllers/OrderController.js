var OrderModel = require("../models/OrderModel.js");

/**
 * OrderController.js
 *
 * @description :: Server-side logic for managing Orders.
 */
module.exports = {
  /**
   * OrderController.list()
   */
  list: function (req, res) {
    OrderModel.find(function (err, Orders) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Order.",
          error: err,
        });
      }

      return res.json(Orders);
    });
  },

  /**
   * OrderController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    OrderModel.findOne({ _id: id }, function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Order.",
          error: err,
        });
      }

      if (!Order) {
        return res.status(404).json({
          message: "No such Order",
        });
      }

      return res.json(Order);
    });
  },

  /**
   * OrderController.create()
   */
  create: async function (req, res,next) {
    var Order = new OrderModel({
      sum: req.body.sum,
      date: req.body.date,
      user: req.body.user,
      items: req.body.items,
    });
    try {
      await Order.save(Order);
      res.send(Order);
    } catch (e) {
      next(e);
    }
  },

  /**
   * OrderController.update()
   */
  update: function (req, res) {
    var id = req.params.id;

    OrderModel.findOne({ _id: id }, function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Order",
          error: err,
        });
      }

      if (!Order) {
        return res.status(404).json({
          message: "No such Order",
        });
      }

      Order.sum = req.body.sum ? req.body.sum : Order.sum;
      Order.date = req.body.date ? req.body.date : Order.date;
      Order.user = req.body.user ? req.body.user : Order.user;
      Order.items = req.body.items ? req.body.items : Order.items;

      Order.save(function (err, Order) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Order.",
            error: err,
          });
        }

        return res.json(Order);
      });
    });
  },

  /**
   * OrderController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    OrderModel.findByIdAndRemove(id, function (err, Order) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Order.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
