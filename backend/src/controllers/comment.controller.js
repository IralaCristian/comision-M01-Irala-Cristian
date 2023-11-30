import { CommentModel } from "../models/comment.model.js";
import { UserModel } from "../models/user.model.js";
import { PostModel } from "../models/post.model.js";
import { ObjectId } from "mongoose";

const isCommentAuthor = async (userId) => {

}

/*-----------------------------------------------------------
Comments Controllers:
-createComment
-getComment
-listComments
-updateComment
-deleteComment
------------------------------------------------------------*/

//Create a comment
export const ctrlCreateComment = async (req, res) => {
    const { postId } = req.params;
    const userId = req.user._id;

    const { description } = req.body;

    try {
        const comment = await CommentModel({
            author: userId,
            description,
        });

        await comment.save();

        await PostModel.findOneAndUpdate(
            { _id: postId },
            { $push: { comments: comment._id } }
        );

        res.status(201).json(comment);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

//Get a comment by id
export const ctrlGetComment = async (req, res) => {
    const { commentId } = req.params;

    try {

        const comment = await CommentModel.findOne({ _id: commentId })
            .populate('author', ['username', 'avatarURL'],);

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found.' });
        }

        res.status(200).json(comment);

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

//Update a comment by comment id
export const ctrlUpdateComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;

    try {
        const comment = await CommentModel.findOne({ _id: commentId });

        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }
        if (!(comment.author.equals(userId))) {
            return res.status(403).json({ error: 'Loged user is not the comment author' })
        }

        comment.set(req.body);

        await comment.save();

        return res.status(200).json(comment);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

export const ctrlDeleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;

    try {

        const comment= await CommentModel.findOne({_id: commentId});

        if(!comment){
            return res.status(404).json({ error: 'Comment not found' });
        }

        if (!(comment.author.equals(userId))) {
            return res.status(403).json({ error: 'Loged user is not the comment author' })
        }

        await CommentModel.findOneAndDelete({ _id: commentId });

        res.status(200).json();
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Couldn't delete music" });
    }
};