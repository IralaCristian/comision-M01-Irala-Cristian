import { createContext } from "react";
import { usePost } from "../hooks/usePosts.js";

export const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  const {
    allPosts,
    deletePost,
    addNewPostToList,
    updatePost,
    getPost,
  } = usePost();

  return (
    <PostsContext.Provider
      value={{
        allPosts,
        deletePost,
        addNewPostToList,
        updatePost,
        getPost,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};