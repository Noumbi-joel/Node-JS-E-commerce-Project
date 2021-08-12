const express = require('express');
const { urlencoded } = require('body-parser');
const path = require('path');

//sequelize
const sequelize = require('../util/database');

//controllers
const { get404 } = require('./controllers/errors')

//routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

//Main middlewares
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(get404);ù

sequelize.sync()
    .then((result) => {console.log(result)})
    .catch((e) => {console.log(e)})

app.listen(3000);