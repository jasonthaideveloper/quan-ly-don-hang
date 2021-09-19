const Product = require('../models/ProductsModel');
const { multipleMongooseToObject, mongooseToOject } = require('../../ultil/mongoose');

class MeController {
    // [GET] /me/stored/products
    storedProducts(req, res, next) {
        Promise.all([Product.find({}), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) => 
                res.render('me/stored-products', {
                    deletedCount,
                    products: multipleMongooseToObject(products)
                })
            )
            .catch(next);
    }

    // [GET] /product/:slug
    getProductDetail(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('details/productDetail', {
                    product: mongooseToOject(product),
                });
            })
            .catch(next)
    }

    // [GET] /products/edit
    edit(req, res, next) {
        res.render('products/editProduct');
    }

    // [GET] /me/storage/products
    storageProducts(req, res, next) {
        Product.findDeleted({})
        .then(products => {
            res.render('me/storage-products', {
                products: multipleMongooseToObject(products)
            });
        })
        .catch(next);
    }

    // [PATH] /products/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id }, req.body)
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /products/:id
    delete(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
}

module.exports = new MeController;