const express = require('express');
const router = express.Router();

const { getProducts, getProduct ,getIndex, getCart, postCart, getCheckout, getOrders } = require('../controllers/shop');

//handling routes with controllers
router.get('/', getIndex);

router.get('/products', getProducts);

router.get('/products/:productId', getProduct);

router.get('/cart', getCart);

router.post('/cart', postCart);

router.get('/orders', getOrders);

router.get('/checkout', getCheckout);

module.exports = router;