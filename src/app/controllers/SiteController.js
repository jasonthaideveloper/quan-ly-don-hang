const Product = require('../models/ProductsModel');
const { multipleMongooseToObject } = require('../../ultil/mongoose');


class SiteController {

    // [GET] /
    general(req, res, next) {

        Product.find({})
            .then(products => {
                res.render('general', {
                    products: multipleMongooseToObject(products)
                });
            })
            .catch(next);
    }

    // [GET] /statistic
    statistic(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('statistic', {
                    products: multipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
}

module.exports = new SiteController;