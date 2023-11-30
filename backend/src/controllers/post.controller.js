import { PostModel } from "../models/post.model.js";
import { CommentModel } from "../models/comment.model.js";

/*------------------------------------------------------------
 Post controllers:
 -createPost
 -listAllPosts
 -listUserPosts
 -getPost
 -updatePost
 -deletePost
--------------------------------------------------------------*/

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
            author: authorId,
            imageURL,
        });

        //guardamos el post creado
        await post.save();

        return res.status(201).json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
        
    }

}

//Obtengo todos los posts independientemente del usuario
export const ctrlListAllPosts = async (req, res) => {

    try {
        const posts= await PostModel.find()
            .populate('author', ['username', 'avatarURL'])
            .populate('comments', ['description', 'author']);

        res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
}

//Obtiene los posts de un usuario en particular
export const ctrlListUserPosts = async (req, res) => {
    const userId= req.user._id;

    try {
        const posts= await PostModel.find({auhtor: userId})
            .populate('author', ['username', 'avatarURL'])
            .populate('comments', ['description', 'author']);

        res.status(200).json(posts);   
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }

}

// Obtengo un post mediante su id
export const ctrlGetPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post= await PostModel.findOne({ _id: postId})
            .populate('author', ['username', 'avatarURL'])
            .populate('comments');
        if (!post) {
            return res.status(404).json({ error: 'Post not found.'});
        }

        res.status(200).json(post);

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }

}

// Actualiza un post
export const ctrlUpdatePost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await PostModel.findOne({ _id: postId});
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      post.set(req.body);
  
      await post.save();
  
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

//elimina un post y sus comentarios
export const ctrlDeletePost = async (req, res) => {
    const { postId } = req.params;

    try {
      const post = await PostModel.findOne({_id: postId});
  
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      await CommentModel.deleteMany({ _id: { $in: post.comments } });
  
      await PostModel.findOneAndDelete({_id: postId });
  
      return res.status(200).json(post);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}