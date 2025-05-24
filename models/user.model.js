import mongoose from "mongoose";

const userSechame = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 4 },
    registerDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSechame);
export default User;