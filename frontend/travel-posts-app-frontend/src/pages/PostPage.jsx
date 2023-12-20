import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PostsContext } from '../providers/PostsProvider';
import { API_URL } from '../utils/const';
import Post from '../components/Post';
import CommentList from "../components/CommentList"
import Navbar from '../components/Navbar';
import { AuthContext } from '../providers/AuthProvider';

function PostPage() {
  const {postId} = useParams();
  console.log(" postId que viene del useparams cuando llamo a la page PostPage:" + postId);
  const { userIsLogged} = useContext(AuthContext);
  //const { getPost } = useContext(PostsContext);

  const [post, setPost] = useState(null);
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
            posteo= {post}
          />
          <div className='row' hidden={createHidden}>
            <Link className="display-6" to={`/comment/new/${post._id}`} >Comentar </Link>
          </div>
        <CommentList comments= {post.comments} />  
    </div>
    </>
  )
}

export default PostPage