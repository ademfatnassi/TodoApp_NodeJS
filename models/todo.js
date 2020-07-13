const mongoose = require('mongoose');


const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    addeddate: {
        type: Date,
        default: new Date()
    },
    endeddate: {
        type: Date,
        default: null
    },
    status: {
        type: Boolean,
    },
    userid: {
        type: String,
    }
});

const Todo = mongoose.model('todo', TodoSchema);

module.exports = { Todo }
//
/*
    title
    addeddate:default:new Date()
    endeddate:default:null
    state:true ou false
    userId:
 */