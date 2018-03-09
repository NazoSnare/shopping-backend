
const express =require('express');
const router = express.Router ();
//import users router
const usersRouter = require('./v1/users');

// www.domain.com/api/v1
router.get('/', (req, res, next) => {
  res.send('API');
});

// www.domain.com/api/v1/users
router.use('/users', usersRouter);
//end of routing to users

// www.domain.com/api/v2/users will go to v2 folders' routes


module.exports = router;
