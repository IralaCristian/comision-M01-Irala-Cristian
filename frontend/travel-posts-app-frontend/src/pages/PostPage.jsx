import React from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
  const {postId} = useParams();
  return (
    <div>PostPage {postId}</div>
  )
}

export default PostPage