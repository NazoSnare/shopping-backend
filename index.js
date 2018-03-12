'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const hbs = require('hbs');
const env = require('./config/.env');
const apiRouter = require('./routes/v1');
const adminRouter = require('./routes/admin');

let port = env.PORT;

app.use(morgan("short"));
app.use (cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//initialize passport module for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


//set static folder for assets used in admin page
//set templates
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));



//connect database using mongoose
mongoose.connect(env.database);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', () => {
  console.log('db connected succesfully')
});

app.use('/api/v1', apiRouter);
app.use('/admin', adminRouter);

app.get('/', (req,res,next) => {
  res.redirect('http://localhost:3000/admin');
});
app.listen(port, () =>{
  console.log(`Server is listening on http://localhost:${port}`)
});
