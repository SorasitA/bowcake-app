import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email:{type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
}, {
    timestamps:true // to record timestamp of when record is create or last updated
}
);


const User = mongoose.model("User", userSchema);
export default User;