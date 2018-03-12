const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Product = require('../../models/product');
const env = require('../../config/.env');


//add new product
router.post('/add', (req, res, next) => {
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

  Product.addProduct(newProduct, (err, user)=> {
     if(err){
       res.json({success: false, msg: 'failed to add product'});
     }else{
       res.json({success: true, msg: 'Product added successfully'});
     }

  });

}); //end of add products

router.get('/', (req, res, next) => {
     Product.getProducts((err, products) => {
       if(err){
         res.json({success:false, msg:'Error getting products'});
       }
       else{
         res.json({success:true, products: products});
       }
     });
});

router.get('/:id', (req,res,next) => {
   let productId = req.params.id;
   Product.getProductById(productId, (err,product) => {
      if(err){
        res.json({success:false, msg:'error getting product'});
      }else{
        res.json({success:true, product:product});
      }
   });

});

module.exports = router;
