const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email : {type: "string" , required : true},
    refresh_token: {type: "string" , required : true},
    token_id: {type: "string" , required : true}  
  });

const User = new mongoose.model('User', userSchema);

module.exports=User