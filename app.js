const express = require('express');
const { urlencoded } = require('body-parser');
const path = require('path');

//routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();

//Main middlewares
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);

app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', {docTitle: 'Page Not Found'});
})

app.listen(3000);