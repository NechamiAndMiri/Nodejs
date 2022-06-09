var ProductModel = require('../models/ProductModel.js');
var logger = require('../log');
const dotnev = require('dotenv')

dotnev.config()
/**
 * ProductController.js
 *
 * @description :: Server-side logic for managing Products.
 */
module.exports = {

    /**
     * ProductController.list()
     */
    list: async function (req, res, next) {

        let products
        try {
            if (req.query.category != null) {
                const cId = req.query.category
                products = await ProductModel.find({ category: cId })
            }
            else {
                if (process.env.NNODE_ENV == 'development') {
                    logger.error('to mongo')
                    logger.info('on get all products');
                }
                products = await ProductModel.find();
            }

            res.send(products)
        }
        catch (e) {
            next(e);
        }
    },

    create: async function (req, res, next) {
        const Product = new ProductModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            ImgName: req.body.ImgName
        });
        try {
            await Product.save(Product);
            res.send("Product added")
        }
        catch (e) {
            next(e);
        }
    },



















    /**
     * ProductController.show()
     */
    // show: function (req, res) {
    //     var id = req.params.id;

    //     ProductModel.findOne({_id: id}, function (err, Product) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: 'Error when getting Product.',
    //                 error: err
    //             });
    //         }

    //         if (!Product) {
    //             return res.status(404).json({
    //                 message: 'No such Product'
    //             });
    //         }

    //         return res.json(Product);
    //     });
    // },

    /**
     * ProductController.create()
     */


    //     Product.save(function (err, Product) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: 'Error when creating Product',
    //                 error: err
    //             });
    //         }

    //         return res.status(201).json(Product);
    //     });
    //

    /**
     * ProductController.update()
     */
    // update: function (req, res) {
    //     var id = req.params.id;

    //     ProductModel.findOne({_id: id}, function (err, Product) {
    //         if (err) {
    //             return res.status(500).json({
    //                 message: 'Error when getting Product',
    //                 error: err
    //             });
    //         }

    //         if (!Product) {
    //             return res.status(404).json({
    //                 message: 'No such Product'
    //             });
    //         }

    //         Product.name = req.body.name ? req.body.name : Product.name;
    // 		Product.description = req.body.description ? req.body.description : Product.description;
    // 		Product.price = req.body.price ? req.body.price : Product.price;
    // 		Product.category = req.body.category ? req.body.category : Product.category;
    // 		Product.ImgName = req.body.ImgName ? req.body.ImgName : Product.ImgName;

    //         Product.save(function (err, Product) {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: 'Error when updating Product.',
    //                     error: err
    //                 });
    //             }

    //             return res.json(Product);
    //         });
    //     });
    // },

    /**
     * ProductController.remove()
     */
    //     remove: function (req, res) {
    //         var id = req.params.id;

    //         ProductModel.findByIdAndRemove(id, function (err, Product) {
    //             if (err) {
    //                 return res.status(500).json({
    //                     message: 'Error when deleting the Product.',
    //                     error: err
    //                 });
    //             }

    //             return res.status(204).json();
    //         });
    //     }
};
