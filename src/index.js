const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;
const methodOverride = require('method-override');
const route = require('./routes/routes');
const db = require('./config/db/configDB');


// Connect to DB
db.connect();

// Set static file path
app.use(express.static(path.join(__dirname, 'public')));

// Middleware post
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP request logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs',
    helpers: {
        sum: (a, b) => a + b,
        uppercase: (string, num) => {
            let strUpper = string;
            return strUpper.length > num ? strUpper.slice(0, num) + '...' : strUpper;
        },
        formatDate: (deletedAt) => {
            var date = new Date(deletedAt);
            var h = date.getHours();
            var min = date.getMinutes();
            var s = date.getSeconds();
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            return `${h}:${min}:${s} ${d}/${m}/${y}`;
        },
    }
}));
app.set('view engine', 'hbs');

// Set views path
app.set('views', path.join(__dirname, 'resources', 'views'));
console.log(path.join(__dirname, '/resource/views'));

// Set partials path
app.set('partials', path.join(__dirname, 'public', 'img', 'logo.jpeg'));

// Route init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});