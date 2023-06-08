import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    googleSSO: {
        type: String,
        required: false
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User"
        }
    ],
    follows: [
        {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "User"
        }
    ],
    myPosts: [
        {
            type: Schema.Types.ObjectId,
            required: false,
            ref: "Post"
        }
    ]
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);
export default User;