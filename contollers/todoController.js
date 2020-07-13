const express = require('express'); //elli 5alina nassen3ou des webservises
const jwt = require('jsonwebtoken');

const { mongoose } = require('./../db/config');
const { Todo } = require('./../models/todo');

const app = express();


app.get('/', (req, res) => {
    res.status(200).send('Welcome to todoController! yé béhi');
});

app.post('/add', (req, res) => {
    let data = req.body;



    let todo = new Todo(
        {
            title: data.title,
            addeddate: data.addeddate,
            endeddate: data.endeddate,
            status: data.status,
            userid: data.userid
        }

    )

    todo.save().then((todoFromdb) => {
        //res.status(200).send(todoFromdb)
        res.status(200).send({ message: "User: Ajout avec succes!" });
    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });//enr dans la db

    //res.status(200).send('Welcome to todoController! add works !');
});

app.put('/update/:id', (req, res) => {
    let data = req.body;
    let id = req.params.id;

    Todo.findByIdAndUpdate(id, { title: data.title }).then((todoFromdb) => {
        res.status(200).send();
    }).catch();

    //console.log(data);
    //res.status(200).send('Welcome to todoController! update works !');
});

app.delete('/delete/:Tid', (req, res) => {
    let Tid = req.params.Tid;

    Todo.findByIdAndDelete({ _id: Tid }).then((todoFromdb) => {
        console.log(todoFromdb);
        res.status(200).send();

    }).catch((error) => {
        res.status(400).send({ "message": "Erreur : " + error });
    });

});

app.get('/all/:id', (req, res) => {

    let id = req.params.id;

    Todo.find({ userid: id }).then((todosFromDB) => {

        let todos = [];
        let dones = [];

        for (let index = 0; index < todosFromDB.length; index++) {
            if (todosFromDB[index].status) {
                todos.push(todosFromDB[index])
            } else {
                dones.push(todosFromDB[index])
            }
        }

        res.status(200).json({ todos, dones })

    }).catch((error) => { res.status(400).send(error) });
});

app.put('/one/:id', (req, res) => {// :id fel URL = var
    let id = req.params.id;
    let data = req.body;

    console.log(id + "<br>" + data._id);

    Todo.findByIdAndUpdate(id, { endeddate: new Date(), status: false }).then((todoFromdb) => {
        console.log(todoFromdb);
        res.status(200).send();
    }).catch();
});

module.exports = app;