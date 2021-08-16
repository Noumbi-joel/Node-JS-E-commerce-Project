const Product = require('../models/product');
//const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/index', {
                prods: products, 
                docTitle: 'Shop', 
                path: '/'
            });
        })
        .catch((err) => console.log(err));
}

exports.getProducts = (req, res, next) => {
    Product.findAll()
        .then((products) => {
            res.render('shop/product-list', {
                prods: products, 
                docTitle: 'All Products', 
                path: '/products'
            });
        })
        .catch((err) => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then((product) => {
        res.render('shop/product-details', {
            path: '/products' ,
            docTitle: product.title, 
            product: product
        })
        .catch((err) => {console.log(err)})
    });
}

exports.getCart = (req, res, next) => {
    req.user
    .getCart()
    .then((cart) => {
        return cart
        .getProducts()
        .then((products) => {
            res.render('shop/cart', {
                docTitle: 'Your Cart', 
                path: '/cart',
                products: products
            });
        })
        .catch((err) => {console.log(err)})
    })
    .catch((err) => {console.log(err)})
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    let newQuantity = 1;
    let fetchedCart;
    req.user
    .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            let product;
            if(products.length > 0) {
                product = products[0];
            }
            if(product){
                oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;   
                return product;
            }
            //new product added
            return Product.findByPk(prodId)
        })
        .then((product) => {
            return fetchedCart.addProduct(product, { 
                through: { quantity: newQuantity }
            })
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {console.log(err)})
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts({ where: { id: prodId } })
        })
        .then((products) => {
            const product = products[0];
            return product.cartItem.destroy();
        })
        .then(() => {
            res.redirect('/cart');
        })
        .catch((err) => {console.log(err)})
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', 
    {docTitle: 'Your Orders', path: '/orders'});
}

exports.postCreateOrder = (req, res, next) => {
    let fetchedCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            return req.user
                .createOrder()
                .then((order) => {
                    return order.addProducts(products.map(product => {
                        product.orderItem = { quantity: product.cartItem.quantity };
                        return product;
                    }));
                })
                .then(() => {
                    return fetchedCart.setProducts(null);
                })
                .then(() => {
                    res.redirect('/orders');
                })
                .catch((err) => {console.log(err)})
        })
        .then((products) => {
            console.log(products)
        })
        .catch((err) => {console.log(err)})
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    {docTitle: 'Checkout', path: '/checkout'});
}