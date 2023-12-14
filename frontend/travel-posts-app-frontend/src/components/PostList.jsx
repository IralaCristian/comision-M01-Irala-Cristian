import { useContext } from "react";
import Post from "./Post";
import { PostsContext } from "../providers/PostsProvider";

const PostList = () => {
  const { allPosts } = useContext(PostsContext);

  return (
    <>
      {allPosts.map((post) => {
        return (
          <Post
            postId={post._id}
            title={post.title}
            description={post.description}
            imageURL={post.imageURL}
            author={post.author}
            comments={post.comments}
            createdAt={post.createdAt}
          />
        );
      })}
    </>
  );
};
export default PostList;
