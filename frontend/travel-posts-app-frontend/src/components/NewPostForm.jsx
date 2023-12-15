import { useContext, useId, useRef,} from "react";
import { formStyle } from "../styles/formsClasses.js";
import { PostsContext } from "../providers/PostsProvider.jsx";
import { useNavigate } from "react-router-dom";

function NewPostForm() {
  const ref = useRef(null);
  const navigate= useNavigate();

  const { addNewPostToList } = useContext(PostsContext);

  const titleRef = useId();
  const descriptionRef = useId();
  const imageURLRef = useId();

  //form style classes object
  const {
    formControl,
    formLabel,
    formColumn,
    formRow,
    formBtnPrim,
    formContainer,
    formLink,
  } = formStyle;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const title = formData.get("title");
    const description= formData.get("description");
    const imageURL= formData.get("imageURL");

    //llamar a la funcion del context .. addNew.... parametros
    //hacer el fetch en el usePosts??
    // o fetch en el reducer?? creo que

    console.log("entra antes del addNewPost");

    await addNewPostToList( title, description, imageURL);

    ref.current.reset();

    navigate("/");


  };

  return (
    <div className={formContainer}>
      <div className={formRow}>
        <p className="display-6"> Create a new travel post</p>
      </div>
      <form onSubmit={handleSubmit} ref={ref}>
        <label htmlFor={titleRef} className={formLabel}>
          Title:
        </label>
        <input
          type="text"
          name="title"
          className={formControl}
          id={titleRef}
          placeholder="post title"
          required
        />
        <label htmlFor={descriptionRef} className={formLabel}>
          Description:
        </label>
        <textarea
          name="description"
          id={descriptionRef}
          className={formControl}
          style={{height: '130px'}}
          placeholder="Introduce the post description here..."
        ></textarea>
        <label htmlFor={titleRef} className={formLabel}>
          ImageURL:
        </label>
        <input type="url" name="imageURL" className={formControl} id={imageURLRef} style={{height: '50px'}} placeholder="Introduce a post image URL here.." required />
        <br />
        <button className={formBtnPrim}> Create Post </button>
      </form>
    </div>
  );
}

export default NewPostForm;
