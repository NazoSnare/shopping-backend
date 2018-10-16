const express = require('express');
const router = express.Router();

const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const Order = require('../../models/order');
const Transaction = require('../../models/transaction');
const env = require('../../config/.env');

//www.domain.com/api/v1/orders

//add new order
router.post('/', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let user = req.user;
  let newOrder = new Order({
    name: req.body.name,
    type: req.body.type,
    data: req.body.data,
    user: user,
    products: req.body.products,
    deliveryAddress: req.body.deliveryAddress || ''
  });

  Order.addOrder(newOrder, (err, order) => {
    if (err) {
      res.json({
        success: false,
        msg: 'failed to access order'
      });
    } else {
      res.json({
        success: true,
        msg: 'Order added successfully',
        order
      });
    }

  });

}); //end of add order

router.get('/user', passport.authenticate('jwt', {
  session: false
}), (req, res, next) => {
  let user = req.user;
  Order.getOrdersByUsername(user.username, (err, orders) => {
    if (err) {
      res.status(500)
        .json({
          success: false,
          msg: 'Error getting orders'
        });

    } else {

      res
        .status(200)
        .json({
          success: true,
          msg: `Successfully getting orders of ${user.username}`,
          orders
        });

    }


  });
});

router.get('/', (req, res, next) => {
  Order.getOrders((err, orders) => {
    if (err) {
      res
        .status(500)
        .json({
          success: false,
          msg: 'Error getting orders'
        });
    } else {
      res
        .status(200)
        .json({
          success: true,
          msg: 'Successfully getting orders',
          orders
        });
    }
  });
});

module.exports = router;