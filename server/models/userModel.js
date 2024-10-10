import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        default : "users",
    },
    subscription : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses"
    },
], 
},{
    timestamps: true
})

const User = mongoose.model("users", schema)

export default User 