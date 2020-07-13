/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./contollers/userController');
const todo = require('./contollers/todoController');
const admin = require('./contollers/adminController');

const app = express();//utlise tous les fonc préd

app.use(bodyParser.json()); //notre app va utliser comme donnée entrant et sortant type json
app.use(cors());//exploiter par d'autre serveur

app.use('/user', user);
app.use('/todo', todo);
app.use('/admin', admin);

app.get('/', function (req, res) {
    res.status(200).send('<h1>Welcome to the server! you re cool now<br> Don\'t be shy .. I\'m kidding u</h2>');
});
app.listen(3000, function () {
    console.log('Server started !');
});