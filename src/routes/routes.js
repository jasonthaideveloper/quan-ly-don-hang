
const productRouter = require('./products-route');
const siteRouter = require('./site');
const billRouter = require('./bill-route');
const meRouter = require('./me-route');

function route(app) {

    
    
    // use path /product call to product-route
    app.use('/products', productRouter);

    app.use('/bill', billRouter);

    app.use('/me', meRouter)

    app.use('/', siteRouter);
}

module.exports = route;
