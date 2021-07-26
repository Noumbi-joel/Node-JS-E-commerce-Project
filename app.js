const express = require('express');
const { urlencoded } = require('body-parser');
const path = require('path');

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

app.use(get404);

app.listen(3000);