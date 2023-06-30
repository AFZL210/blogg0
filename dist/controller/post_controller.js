"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editPost = exports.likePost = exports.deletePost = exports.newPost = exports.getPost = exports.getAllPosts = void 0;
const PostModel_1 = __importDefault(require("../db/models/PostModel"));
const UserModel_1 = __importDefault(require("../db/models/UserModel"));
const createError_1 = require("../utils/createError");
const mongoose_1 = __importDefault(require("mongoose"));
const getAllPosts = async (req, res, next) => {
    const tag = req.query.tag;
    let posts;
    if (tag === "none")
        posts = await PostModel_1.default.find({}).populate('author likedBy');
    else
        posts = await PostModel_1.default.find({ tags: { "$in": [tag] } });
    return res.status(200).json(posts);
};
exports.getAllPosts = getAllPosts;
const getPost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const post = await PostModel_1.default.findById(postId).populate('author likedBy');
        return res.status(200).json(post);
    }
    catch (e) {
        return next((0, createError_1.createError)(400, "error getting post"));
    }
};
exports.getPost = getPost;
const newPost = async (req, res, next) => {
    const postData = { ...req.body, likes: 0 };
    const userId = req.params.userId;
    try {
        const newPost = await PostModel_1.default.create({ ...postData, author: userId });
        (await newPost).save();
        await UserModel_1.default.findByIdAndUpdate(userId, { $push: { myPosts: newPost._id } }, { new: false });
        return next((0, createError_1.createError)(200, "created post successfully!"));
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error creating new post"));
    }
};
exports.newPost = newPost;
const deletePost = async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.params.userId;
    try {
        await PostModel_1.default.findByIdAndDelete(postId);
        await UserModel_1.default.findByIdAndUpdate(userId, { $push: { myPosts: postId } }, { new: false });
        return res.status(200).json({ msg: "deleted post" });
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error deleting post"));
    }
};
exports.deletePost = deletePost;
const likePost = async (req, res, next) => {
    const postId = req.params.postId;
    const post = await PostModel_1.default.findOne({ _id: postId });
    let likedBy = post?.likedBy;
    const userId = new mongoose_1.default.Types.ObjectId(req.params.userId);
    if (!post)
        return res.status(404).send("post not found");
    try {
        const isLiked = post.likedBy.includes(userId);
        if (!isLiked) {
            likedBy?.push(userId);
            await PostModel_1.default.findByIdAndUpdate(postId, { $inc: { likes: 1 }, $push: { likedBy: userId } }, { new: false });
            res.send('liked post');
        }
        else {
            likedBy = likedBy?.filter(e => e !== userId);
            await PostModel_1.default.findByIdAndUpdate(postId, { $inc: { likes: -1 }, $pull: { likedBy: userId } }, { new: false });
            res.send("unliked post");
        }
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error liking post"));
    }
};
exports.likePost = likePost;
const editPost = async (req, res, next) => {
    const postId = req.params.postId;
    try {
        const postData = req.body;
        await PostModel_1.default.findByIdAndUpdate(postId, postData);
        return res.status(200).json({ msg: "updated post" });
    }
    catch (e) {
        return next((0, createError_1.createError)(403, "error editing post"));
    }
};
exports.editPost = editPost;
