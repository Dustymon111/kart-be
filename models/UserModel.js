import mongoose from "mongoose";
 
const User = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
});

User.query.allName = function (name){
    return this.find({name : new RegExp (name, "i")})
}
 
export default mongoose.model('Users', User);