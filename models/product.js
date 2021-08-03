const path = require('path');
const fs = require('fs');
const rootDir = require('../util/path');

//Model
const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            return cb([]);
        }
        cb(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl =imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile((products) => {
            if(this.id){
                const existingProductIndex = products.findIndex(p => p.id === this.id);
                const updatedProduct = [...products];
                updatedProduct[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProduct), err => {
                    console.log(err);
                });
            }else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), err => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find((prod) => prod.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const updatedProducts = products.filter((prod) => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if(!err) {
                    Cart.deleteProduct(id)
                }
            });
        });
    }
}