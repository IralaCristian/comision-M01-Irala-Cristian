import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { PostsContext } from '../providers/PostsProvider';
import { API_URL } from '../utils/const';
import Post from '../components/Post';
import CommentList from "../components/CommentList"
import Navbar from '../components/Navbar';

function PostPage() {
  const {postId} = useParams();
  //const { getPost } = useContext(PostsContext);

  const [post, setPost] = useState(null);

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
        <CommentList comments= {post.comments} />  
    </div>
  )
}

export default PostPage