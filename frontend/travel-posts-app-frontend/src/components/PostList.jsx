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

  return (
    <>
      {allPosts.map((post) => {
        return (
          <Post
            postId={ post._id}
          />
        );
      })}
    </>
  );
};
export default PostList;
