
import React, { useContext, useId, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../providers/AuthProvider';
import { formStyle } from '../styles/formsClasses.js';
import { API_URL } from '../utils/const';
import Navbar from './Navbar.jsx';

function EditCommentForm() {

    const {postId} = useParams();
    const { auth } = useContext(AuthContext);
    const ref = useRef(null);
    const { formBtnPrim, formContainer, formControl, formLabel, formRow} = formStyle;
    const descriptionRef = useId();
    const navigate= useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const description = formData.get("description");

        const comment ={
            description,
        }

        const req = await fetch(`${API_URL}/comment/${postId}`, {
            method: "PATCH",
            body: JSON.stringify(comment),
            headers: {
              "Content-Type": "application/json",
              "authorization": auth.token,
            },
          });
      
          if (req.status !== 200) return alert("update comment error");
      
          //Reset the form fields with a ref value (null)
          ref.current.reset();

          alert("The comment was updated");
      
          navigate(`/post/${postId}`);

    }

  return (
    <div className={formContainer}>
    <Navbar/>
    <div className={formRow}>
      <p className="display-6"> Edit this comment</p>
    </div>
    <form onSubmit={handleSubmit} ref={ref}>
      <label htmlFor={descriptionRef} className={formLabel}>
        Your Comment:
      </label>
      <textarea
        name="description"
        id={descriptionRef}
        className={formControl}
        style={{height: '130px'}}
        placeholder="Introduce the updated comment here..."
        required
      ></textarea>
      <br />
      <button className={formBtnPrim}> Comment </button>
    </form>
  </div>

  )
}
export default EditCommentForm