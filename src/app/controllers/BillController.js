const Product = require('../models/ProductsModel');
const { multipleMongooseToObject } = require('../../ultil/mongoose');

class BillController {

    // [GET] /product
    getBill(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('bill', {
                    products: multipleMongooseToObject(products)
                });
            })
            .catch(next);

        // res.render('product');
    }
}

module.exports = new BillController;