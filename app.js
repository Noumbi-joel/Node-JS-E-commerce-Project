const express = require('express');
const { urlencoded } = require('body-parser');
const path = require('path');

//port
const PORT = 3000;

//Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

//sequelize
const sequelize = require('./util/database');

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

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {console.log(err)});
});

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(get404);

//Relations between tables
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product); //User(id) -> Product
User.hasOne(Cart); //User(id) -> Cart
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem }); //Cart(id) -> Product
Product.belongsToMany(Cart, { through: CartItem }); //Product(id) -> Cart
Order.belongsTo(User); 
User.hasMany(Order); //User(id) -> Order
Order.belongsToMany(Product, { through: OrderItem }); //Order(id) <- -> Product(id)

sequelize
    .sync(/* { force: true } */) 
        .then((result) => {
            return User.findByPk(1);
        })
        .then((user) => {
            if(!user) {
                return User.create({name: 'Joel',email: 'joel@example.com'})
            }
            return user;
        })
        .then((user) => {
            return user.createCart();
        })
        .then((cart) => {
            app.listen(PORT);
        })
        .catch((e) => {
            console.log(e)
        });
