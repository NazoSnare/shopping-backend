
const express =require('express');
const router = express.Router ();

const Product = require('../models/product');

// www.domain.com/api/v1
router.get('/', (req, res, next) => {
  let products = [];
  Product.getProducts((err, products) => {
    if(err){
      throw err;
    }
    else{
      res.render('admin.hbs', {
        products:products
      });
    }
  });

});

router.post('/products', (req, res, next) => {
  let newProduct = new Product({
    name: req.body.name,
    price: req.body.price
  });

    if(newProduct.price < 112){
      newProduct.discount = 0;
    }
    else if(newProduct.price <= 115){
      newProduct.discount = 0.25;
    }
    else{
      newProduct.discount = 0.50;
    }

    newProduct.totalAmount = newProduct.price - (newProduct.price * newProduct.discount);

    Product.addProduct(newProduct, (err, product)=> {
       if(err){
       return false;
       }else{
         res.redirect('http://localhost:3000/admin');
       }

    });

});



module.exports = router;
