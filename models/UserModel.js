import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref : "Role"
    }
})

const User = mongoose.model("User", UserSchema)

export default User