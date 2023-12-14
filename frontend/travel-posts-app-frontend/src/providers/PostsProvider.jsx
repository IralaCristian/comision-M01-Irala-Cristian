import { createContext } from "react";
import { usePost } from "../hooks/usePosts.js";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const {
    allPosts,
    deletePost,
    addNewPostToList,
    updatePost,
  } = usePost();

  return (
    <PostsContext.Provider
      value={{
        allPosts,
        deletePost,
        addNewPostToList,
        updatePost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};