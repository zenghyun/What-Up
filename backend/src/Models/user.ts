// 유저 스키마 만들기 
import mongoose from "../app";

const userSchema = new mongoose.Schema({
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

module.exports = mongoose.model("User", userSchema);