const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Product = new Schema({
    productId: { type: String },
    productName: { type: String },
    productAmount: { type: String },
    productPrice: { type: String },
    productDateIn: { type: String },
    unit: { type: String },
    description: { type: String },
    slug: { type: String, slug: 'productName', unique: true },
    img: { type: String },
}, { timestamps: true });

mongoose.plugin(slug);
Product.plugin(mongooseDelete, { deletedAt : true, overrideMethods: 'all' });

module.exports = mongoose.model('Products', Product);
