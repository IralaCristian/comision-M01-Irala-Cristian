import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formStyle } from "../styles/formsClasses.js";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../providers/PostsProvider.jsx";
import { API_URL } from "../utils/const.js";

function Post({ postId }) {
  
  const [ post, setPost] = useState(null)
  const { formLink, formPicture, formPicutureImg } = formStyle;
  const { deletePost} = useContext(PostsContext);
  const navigate= useNavigate();

  const handleDelete = async (e) =>{
    e.preventDefault();

      await deletePost(post._id);

      alert("el posteo ha sido eliminado");

      navigate("/");
  };

  useEffect( () => {
    fetch(`${API_URL}/post/${postId}`)
      .then((res) => {
        if (res.status !== 200) return alert("Error getting the post");

        return res.json();
      })
      .then((data) => {
        setPost(data);
      });
  }, [postId]);


  if (!post) return (
    <h2> Loading..... </h2>
  );

  //"row py-3 border border-info"
  return (
    <div className="row py-3 border border-info">
      <div className="col md-3 sm-12">
        <img
          src={post.imageURL}
          className="rounded"
          height="200"
          width="200"
          alt="imagen del post"
        />
      </div>
      <div className="col md-9 sm-12">
        <Link className={formLink} to={`/post/${post._id}`}>
          {post.title}
        </Link>
        <div className="row">
          <p className="display-7">{post.description}</p>
          <p className="display-7">
            <FaComment/> : {`${post.comments.length}`}</p>
          <p className="display-8"> {post.createdAt} </p>
        </div>
        <div className="row">
          <div className="col-3 sm-12">
            <picture className={formPicture}>
              <img
                src={post.author.avatarURL}
                className={formPicutureImg}
                height="80"
                width="80"
                alt="user avatar"
              />
            </picture>
          </div>
          <div className="col-3 sm-12">
            <p> {post.author.username}</p>
          </div>
          <div className="col-6 sm-12">
              <MdDelete onClick={handleDelete}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
