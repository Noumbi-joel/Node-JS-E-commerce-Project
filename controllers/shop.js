const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(([rows, fieldData]) => {
            res.render(
                'shop/index', 
            {
                prods: rows, 
                docTitle: 'Shop', 
                path: '/'
            });
        })
        .catch((err) => {
            console.log(err);
        })
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll()
    .then(([rows, fieldData]) => {
        res.render(
            'shop/product-list', 
        {
            prods: rows, 
            docTitle: 'All Products', 
            path: '/products'
        });
    })
    .catch((err) => {
        console.log(err);
    })
} 

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(([product]) => {
        res.render(
            'shop/product-details', 
        {
            path: '/products' ,
            docTitle: product.title, 
            product: product[0]
        });
    });
}

exports.getCart = (req, res, next) => {
    Cart.getCart((cart) => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for(let product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);    
                if(cartProductData){
                    cartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                docTitle: 'Your Cart', 
                path: '/cart',
                products: cartProducts
            });
        });
    });
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addToCart(prodId, product.price);
    })
    res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', 
    {docTitle: 'Your Orders', path: '/orders'});
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', 
    {docTitle: 'Checkout', path: '/checkout'});
}