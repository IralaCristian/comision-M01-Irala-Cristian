export const postTypes = {
    fill: "FILL",
    delete_post: "DELETE_POST",
    create_post: "CREATE_POST",
    edit_post: "EDIT_POST",
  };
  
  export const postReducer = (state, action) => {
 
    if (action.type === postTypes.create_post) {
      const { title, description, imageURL } = action.payload;
  
      return [
        ...state,
        {
          title,
          description,
          imageURL,
        },
      ];
    }
  
    if (action.type === postTypes.complete) {
      const { taskId } = action.payload;
  
      return state.map((task) => {
        if (task.id !== taskId) return task;
  
        return {
          ...task,
          completed: !task.completed,
        };
      });
    }
  
    if (action.type === postTypes.edit_post) {
      const { postId, title, description, imageURL } = action.payload;
  
      return state.map((post) => {
        if (post._id !== postId) return post;
  
        return {
          ...post,
          title,
          description,
          imageURL,
        };
      });
    }
  
    if (action.type === postTypes.fill) {
      const { posts } = action.payload;
  
      return [...state, ...posts];
    }

    if (action.type === postTypes.delete_post) {
        const { postId } = action.payload;
        const postsWithoutSelectedPost = state.filter((post) => !(post._id.equals(postId)));
        return postsWithoutSelectedPost;
      }
  
    return state;
  };