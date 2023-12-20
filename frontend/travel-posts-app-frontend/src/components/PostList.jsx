import { useContext } from "react";
import Post from "./Post";
import { PostsContext } from "../providers/PostsProvider";

const PostList = () => {
  const { allPosts } = useContext(PostsContext);

  if (allPosts == [] ){
    return (
      <h2> There are no posts yet, login a create one</h2>
    )
  }

  if (!allPosts) {
    return (
      <h2> loading......</h2>
    )
  }

  allPosts.map((postP) => {
    console.log(" cada posteo que tiene allpost antes de ir a los post particulares")
    console.log(  postP  );
    console.log( postP._id);
  })

  return (
    <>
      {allPosts.map((post) => {
        return (
          <Post
          key={post._id}
          posteo= {post}
          />
        );
      })}
    </>
  );
};
export default PostList;
