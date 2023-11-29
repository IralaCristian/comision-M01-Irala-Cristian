import { PostModel } from "../models/post.model.js";
import { CommentModel } from "../models/comment.model.js";

/*
 Post controllers:
 -createPost
 -listPosts
 -getPost
 -updatePost
 -deletePost
*/

//Create a Post

export const ctrlCreatePost = async (req, res) => {
    //id del usuario creador que viene desde el req
    const authorId= req.user._id;
    
    try {
        //desestructuramos las propiedades del post
        const {title, description, imageURL } = req.body;

        //instanciamos un post con el modelo, la fecha se setea por default
        const post= new PostModel({
            title,
            description,
            imageURL,
            author: authorId,
        });

        //guardamos el post creado
        await post.save();

        return res.status(201).json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
        
    }

}

export const ctrlListPosts = async (req, res) => {

}

export const ctrlGetPost = async (req, res) => {

}

export const ctrlUpdatePost = async (req, res) => {

}

export const ctrlDeletePost = async (req, res) => {

}