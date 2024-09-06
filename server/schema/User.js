const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    name : String,
    email : {
        type : String,
        unique : true,
    },
    password : String
})

const UserModel = mongoose.model('User',userSchema);// User3 means users3 hai in data base 

module.exports = UserModel;