
const express =require('express');
const router = express.Router ();
//import users router
const usersRouter = require('./v1/users');
const productsRouter = require('./v1/products');
const transactionsRouter = require('./v1/transactions');

// www.domain.com/api/v1
router.get('/', (req, res, next) => {
  res.send('API');
});

// www.domain.com/api/v1/users
router.use('/users', usersRouter);
//end of routing to users

// www.domain.com/api/v1/products
router.use('/products', productsRouter);
//end of routing to products

// www.domain.com/api/v1/products
router.use('/transactions', transactionsRouter);
//end of routing to products

// www.domain.com/api/v2/users will go to v2 folders' routes


module.exports = router;
