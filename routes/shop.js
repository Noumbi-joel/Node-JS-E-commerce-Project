const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const adminData = require('../routes/admin');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', {prods: products, docTitle: 'shop', path: '/'});
});

module.exports = router;