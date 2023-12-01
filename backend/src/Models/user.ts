// 유저 스키마 만들기 
const userMongoose = require("mongoose");

const userSchema = new userMongoose.Schema({
    name: {
        type: String,
        required: [true, "User must type name"],
        unique: true,
    },
    token: {
        type : String,
    },
    online: {
        type: Boolean,
        default: false,
    },
});

module.exports = userMongoose.model("User", userSchema);