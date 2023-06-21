import { Request, Response, NextFunction } from "express";
import Post from "../db/models/Post";
import { createError } from "../utils/createError";
import { PostType } from "../utils/typeDefs";

export const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const tag = req.query.tag;
    let posts;

    if (tag === "none") posts = await Post.find({});
    else posts = await Post.find({ tags: { "$in": [tag] } });

    return res.status(200).json(posts);
}

export const newPost = async (req: Request, res: Response, next: NextFunction) => {
    const postData: PostType = { ...req.body, likes: 0 };

    try {
        const newPost = Post.create(postData);
        (await newPost).save();
        return next(createError(200, "created post successfully!"))
    } catch (e) {
        console.log(e)
        return next(createError(403, "error creating new post"));
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId;

    try {
        await Post.findByIdAndDelete(postId);
        return res.status(200).json({ msg: "deleted post" });
    } catch (e) {
        return next(createError(403, "error deleting post"));
    }
}