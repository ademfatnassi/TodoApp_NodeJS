const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoapp', { useNewUrlParser: true, useCreateIndex: true });

module.exports = { mongoose };