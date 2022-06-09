var UserModel = require("../models/UserModel.js");
const { ObjectId } = require("mongodb");

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**`
   * .
   * UserController.show()
   */
  //login
  login: async function (req, res,next) {
    const { email, password } = req.query;
    try {
      const User = await UserModel.findOne({
        email: email,
        password: password,
      });
      res.send(User);
    } catch (e) {
      next(e);
    }
  },


  show: async function (req, res,next) {
    const id = req.params.id;
    try {
      const User = await UserModel.findById({ _id: id }).populate('orders');
      res.send(User);
    } catch (e) {
      next(e);
    }
  },

  /**
   * UserController.create()
   */
  create: async function (req, res,next) {
    const User = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,

    });
    try {
      await User.save(User);
      res.send(User);
    } catch (e) {
      next(e);
    }
  },

  /**
   * UserController.update()
   */
  update: async function (req, res,next) {
    var id = req.params.id;
    try{
          const User = await UserModel.findById(ObjectId(id));

    User.name = req.body.name ? req.body.name : User.name;
    User.email = req.body.email ? req.body.email : User.email;
    User.password = req.body.password ? req.body.password : User.password;
    User.adress = req.body.adress ? req.body.adress : User.adress;

    await UserModel.updateOne({ _id: id }, User);
    }
  
    catch (e) {
        next(e);
      }
  },

  /**
   * UserController.remove()
   */
  remove: async function (req, res,next) {
    var id = req.params.id;
    try{
        await UserModel.findByIdAndRemove(id);

    }
    catch (e) {
        next(e);
      }
  },
};
