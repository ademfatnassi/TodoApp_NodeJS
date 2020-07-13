const express = require('express');
const bcrypt = require('bcrypt');
const { mongoose } = require('./../db/config');
const { User } = require('./../models/user');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Welcome to adminController! yé béhi');
});

app.get('/gestion-user', (req, res) => {
    User.find().then((usersFromDB) => {

        let users = [];

        for (let index = 0; index < usersFromDB.length; index++) {
            users.push(usersFromDB[index]);
        }

        res.status(200).json({ users })

    }).catch((error) => { res.status(400).send(error) });
});

app.get('/activate/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, { status: true }).then((userFromdb) => {
        console.log(userFromdb);
        res.status(200).send();
    }).catch();
});

app.get('/desactivate/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndUpdate(id, { status: false }).then((userFromdb) => {
        console.log(userFromdb);
        res.status(200).send();
    }).catch();
});

app.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    User.findByIdAndDelete({ _id: id }).then((userFromdb) => {
        console.log(userFromdb);
        res.status(200).send();
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });
});

app.put('/update', (req, res) => {
    let data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);

    User.findOneAndUpdate(data._id, {
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        password: data.password,
        role: data.role,
        status: data.status
    }).then((userFromdb) => {
        console.log(userFromdb);
        res.status(200).send();
    }).catch();
});

module.exports = app;