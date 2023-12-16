import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { PostsContext } from '../providers/PostsProvider';
import { API_URL } from '../utils/const';
import Post from '../components/Post';
import CommentList from "../components/CommentList"
import Navbar from '../components/Navbar';
import { AuthContext } from '../providers/AuthProvider';
import { formStyle } from '../styles/formsClasses.js';

function PostPage() {
  const {postId} = useParams();
  //const { getPost } = useContext(PostsContext);

  const [post, setPost] = useState(null);

  const {formLink} = formStyle;

  const { auth, userIsLogged } = useContext(AuthContext);

  let createHidden = true;
  if (userIsLogged()) {
    createHidden = false;
  }

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

  if (!post) return <h2>Loading........</h2>

  return (
    <>
    <div className='container' name="main_container">
      <Navbar/>
        <Post
            postId={post._id}
            title={post.title}
            description={post.description}
            imageURL={post.imageURL}
            author={post.author}
            comments={post.comments}
            createdAt={post.createdAt}
          /> 
          <div className='row' hidden={createHidden}>
            <Link className="display-6" to={`/comment/new/${postId}`} >Comentar </Link>
          </div>
        <CommentList comments= {post.comments} />  
    </div>
    </>
  )
}

export default PostPage