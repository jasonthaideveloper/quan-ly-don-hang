const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bill = new Schema({
    productId: { type: String },
    productName: { type: String },
    productAmount: { type: String },
    productPrice: { type: String },
    productDateIn: { type: String },
    productDateOut: { type: String },
    createdAt: { type: Date, default: Date.now},
    updateAt: { type: Date, default: Date.now},
});

module.exports = mongoose.model('Bill', Bill);
