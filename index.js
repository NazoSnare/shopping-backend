'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const env = require('./config/.env');

let port = env.PORT;

app.use(morgan("short"));
app.use (cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*',(req,res) =>{
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () =>{
  console.log(`Server is listening on http://localhost:${port}`)
});
