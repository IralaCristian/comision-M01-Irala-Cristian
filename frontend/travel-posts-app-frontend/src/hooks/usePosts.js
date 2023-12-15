import { useContext, useEffect, useReducer } from "react";
import { postReducer, postTypes } from "../reducers/posts-reducers.js";
import { API_URL } from "../utils/const.js";
import { AuthContext } from "../providers/AuthProvider.jsx";

export const usePost = () => {
  // creamos el estado y las funciones para modificarlo con useReducer
  const [allPosts, dispatch] = useReducer(postReducer, []);

  const { auth } = useContext(AuthContext);

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
  const deletePost = (postId) => {
    dispatch({
      type: postTypes.delete_post,
      payload: {
        postId,
      },
    });
  };

  // añadimos una nueva tarea a la lista
  const addNewPostToList = async (title, description, imageURL) => {

    const newPost= {
      title,
      description,
      imageURL,
    }

    try {
      const req= await fetch(`${API_URL}/post`, {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json",
          "authorization": auth.token,
        }
      });

      dispatch({
        type: postTypes.create_post,
        payload: {
          title,
          description,
          imageURL,
        },
      });
      
    } catch (error) {
      console.log(error);
    }

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
