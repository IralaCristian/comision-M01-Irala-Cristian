import { useEffect, useReducer } from "react";
import { postReducer, postTypes } from "../reducers/posts-reducers.js";
import { API_URL } from "../utils/const.js";




export const usePost = () => {
  // creamos el estado y las funciones para modificarlo con useReducer
  const [allPosts, dispatch] = useReducer(postReducer, []);

  // rellenamos las tareas con la información de la api del backend
  useEffect(() => {
    fetch(`${API_URL}/post/`)
      .then((res) => res.json())
      .then((data) => {
        const posts = data;

        dispatch({
          type: postTypes.fill,
          payload: {
            posts,
          },
        });
      });
  }, []);


  // eliminamos un post
  const deletePost = ( postId) => {
    dispatch({ type: postTypes.delete_post,
        payload: {
            postId,
        } });
  };

  // añadimos una nueva tarea a la lista
  const addNewPostToList = (title, description, imageURL) => {
    dispatch({
      type: postTypes.create_post,
      payload: {
        title,
        description,
        imageURL,
      },
    });
  };

  // cambiamos el título de una tarea
  const updatePost = (postId, title, description, imageURL) => {
    dispatch({
      type: postTypes.edit_post,
      payload: {
        postId,
        title,
        description,
        imageURL,
      },
    });
  };

  return {
    allPosts,
    deletePost,
    addNewPostToList,
    updatePost,
  };
};