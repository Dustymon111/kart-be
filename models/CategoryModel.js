import mongoose from "mongoose"

const Schema = mongoose.Schema

const CategorySchema = Schema({
    _id: Number,
    name: String
})

const Category = mongoose.model("category", CategorySchema)

export default Category