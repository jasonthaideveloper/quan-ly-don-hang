const Product = require('../models/ProductsModel');
const { multipleMongooseToObject, mongooseToOject } = require('../../ultil/mongoose');

class ProductController {

    // [GET] /product
    getProduct(req, res, next) {
        Promise.all([Product.find({}), Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('products', {
                    deletedCount,
                    products: multipleMongooseToObject(products)
                })
            )
            .catch(next);
    }

    // [GET] /me/storage/products
    storageProducts(req, res, next) {
        Product.findDeleted({})
            .then(products => {
                res.render('products/storageProducts', {
                    products: multipleMongooseToObject(products)
                });
            })
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

    getDeletedProductDetail(req, res, next) {
        Promise.all([Product.findDeleted({}), Product.findOne({ slug: req.params.slug })])
            .then(([products]) => {
                products.forEach(element => {
                    if (element.slug == req.params.slug) {
                        res.render('details/productDeletedDetail', {
                            product: mongooseToOject(element)
                        })
                        console.log(element);
                    }
                });
            })
            .catch(next);
    }

    // [GET] /products/create (render UI)
    createProduct(req, res, next) {
        res.render('products/createProduct');
    }


    // [POST] /products/store
    storeProduct(req, res, next) {
        const product = new Product(req.body);
        product.save()
            .then(() => res.redirect('/products'))
            .catch(error => {

            })

    }

    // [GET] /products/edit
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => res.render('products/editProduct', {
                product: mongooseToOject(product)
            }))
            .catch(error => {

            })
    }

    // [PUT] /products/:id
    update(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/products'))
            .catch(next);
    }

    // [PATH] /products/:id/restore
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /products/:id
    delete(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [DELETE] /products/:id/force
    forceDestroy(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /products/handle-form-action
    handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Product.delete({ _id: { $in: req.body.productIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ message: 'Action is invalid' });
        }
    }
}

module.exports = new ProductController;