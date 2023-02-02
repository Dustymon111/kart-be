import mongoose from 'mongoose'
import User from './UserModel.js'
import Role from './RoleModel.js';
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User
db.role = Role

db.ROLES = ["user"];

export default db;