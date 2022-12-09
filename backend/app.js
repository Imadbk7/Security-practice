const express = require('express');
const app  = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.listen(8080, () => {
    console.log('listening to port 8080')
})


module.exports.app = app;
