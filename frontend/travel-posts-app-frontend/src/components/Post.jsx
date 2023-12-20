import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formStyle } from "../styles/formsClasses.js";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { PostsContext } from "../providers/PostsProvider.jsx";
import { API_URL } from "../utils/const.js";
import { AuthContext } from "../providers/AuthProvider.jsx";

function Post( {posteo} ) {


    const id = posteo._id;
    console.log( "id sacado de post._id: " + id);
    console.log(posteo)


    const { _id, title, description, imageURL, author, comments, createdAt } = posteo

  console.log("postId que viene desde el postList key: " + _id);
  //const { getPost } = useContext(PostsContext);
  //const post= (getPost(postId));
  const { auth, userIsLogged } = useContext(AuthContext);

  const { formLink, formPicture, formPicutureImg } = formStyle;
  const { deletePost} = useContext(PostsContext);
  const navigate= useNavigate();
  let deleteHidden= true;

  const handleDelete = async (e) =>{
    e.preventDefault();

      await deletePost(e.target.value);

      alert("el posteo ha sido eliminado");

      navigate("/");
  };

 // useEffect( (postId ) => {
 //   console.log("postId en el useEffect: ");
 //   console.log(postId);
 //   setPost (getPost(postId));
 // }, [postId]);


  if (!posteo) return (
    <h2> Loading..... </h2>
  );


  //"row py-3 border border-info"
  return (
    <div className="row py-3 border border-info">
      <div className="col md-3 sm-12">
        <img
          src={imageURL}
          className="rounded"
          height="200"
          width="200"
          alt="imagen del post"
        />
      </div>
      <div className="col md-9 sm-12">
        <Link className={formLink} to={`/post/${_id}`}>
          {title}
        </Link>
        <div className="row">
          <p className="display-7">{description}</p>
          <p className="display-7">
            <FaComment/> : {`${comments.length}`}</p>
          <p className="display-8"> {createdAt} </p>
        </div>
        <div className="row">
          <div className="col-3 sm-12">
            <picture className={formPicture}>
              <img
                src={author.avatarURL}
                className={formPicutureImg}
                height="80"
                width="80"
                alt="user avatar"
              />
            </picture>
          </div>
          <div className="col-3 sm-12">
            <p> {author.username}</p>
          </div>
          <div className="col-6 sm-12" hidden={deleteHidden}>
              <MdDelete value={_id} onClick={handleDelete}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
