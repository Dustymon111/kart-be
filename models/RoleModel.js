import mongoose from "mongoose"

const Schema = mongoose.Schema

const RoleSchema = Schema({
    name: {
        type: String
    }
})

const Role = mongoose.model("Role", RoleSchema)

export default Role