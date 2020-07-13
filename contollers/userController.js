const express = require('express');//elli 5alina nassen3ou des webservises
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { mongoose } = require('./../db/config');
const { User } = require('./../models/user');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to userController! you re still cool');
});


app.post('/register', (req, res) => {
    let data = req.body;
    data.password = bcrypt.hashSync(data.password, 10);

    let user = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password
    });

    user.save().then((userFromdb) => {
        //res.status(200).send(userFromdb)
        res.status(200).send({ message: "User: Ajout avec succes!" });
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });//enr dans la db

});
//req:request -> reçoir les données
//res:envoi data
app.post('/login', (req, res) => {
    let data = req.body;

    let email = data.email;
    let password = data.password;

    User.findOne({ email }).then((user) => {

        if (!user) {
            res.status(404).send({ message: "Email incorrect :) !" });
        } else {
            if (!user.status) {
                res.status(404).send({ message: "Compte non activé :) !" });
            }
            else {
                let compare = bcrypt.compareSync(password, user.password);

                if (!compare) {
                    res.status(404).send({ message: "Mot de passe incorrect :) !!" });
                } else {
                    let token = jwt.sign({ id: user._id, role: user.role }, "FormaLab");

                    res.status(200).send({ token });
                }
            }

        }


    }).catch((error) => {
        res.status(400).send(error);
    })
});

module.exports = app;