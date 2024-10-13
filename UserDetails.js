const  mongoose  = require("mongoose");

const UserDetailSchema = new mongoose.Schema({
    username: {type: 'string', unique: true},
    password: String,
},{
    collection: 'UserInfo'
})

mongoose.model("UserInfo", UserDetailSchema);