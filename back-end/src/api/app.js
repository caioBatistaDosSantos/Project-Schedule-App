const express = require('express');
const cors = require('cors'); 
const router = require('../routes/index');
const error = require('../middlewares/ErrorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);
app.use(error);

module.exports = app;