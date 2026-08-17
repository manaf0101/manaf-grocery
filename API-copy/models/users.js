const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const usersSchema = new Schema({
    userName : {
        type : String ,
         required : true
        }  
})

module.exports =  mongoose.model('users' , usersSchema )