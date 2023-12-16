import React, { useContext, useEffect, useState } from 'react';
import { formStyle } from '../styles/formsClasses.js';
import { API_URL } from '../utils/const.js';
import { AuthContext } from '../providers/AuthProvider.jsx';
import { Link, useNavigate } from 'react-router-dom';

function Comment( { commentId, description, commentAuthor, createdAt}) {
    const { formPicture, formPicutureImg} = formStyle
    const navigate = useNavigate();

    const [author, setAuthor] = useState(null);

    const { auth, userIsLogged } = useContext(AuthContext)

    let editHidden = true;

    const handleDeleteComment = async (e) => {
        e.preventDefault();

        const req = await fetch(`${API_URL}/comment/${commentId}`, {
            method: "DELETE",
            headers: {
              "authorization": auth.token,
            },
          });

          alert("this comment was deleted");

          navigate("/");
    }

    const handleEditComment = (e) => {
        e.preventDefault();

        navigate(`/comment/edit/${commentId}`);
    }


    useEffect( () => {
        fetch(`${API_URL}/auth/${commentAuthor}`)
          .then((res) => {
            if (res.status !== 200) return alert("Error getting the user");
    
            return res.json();
          })
          .then((data) => {
            setAuthor(data);
          });
      }, [commentAuthor]);

      if( !author) return (<h2> Loading .....</h2>)

      console.log((userIsLogged() && (auth.user._id == author._id)))

      if (userIsLogged() && (auth.user._id == author._id)) {
        editHidden = false;
      }


  return (
    <>
    <div className='row py-2'>
        <div className="col md-3 sm-5">
            <picture className={formPicture}>
                <img className={formPicutureImg} height="80" width="80" src={author.avatarURL} alt="X Author Image.." />
            </picture>
            <p className='display-8'> {author.username} </p>
        </div>
        <div className="col md-9 sm-7">
            <section className='container bordered border-info'>
                <p className='display-7'> {description} </p>
            </section>
            <div className='row' hidden={editHidden}> 
                <Link onClick={handleDeleteComment}> Delete comment </Link>
                <Link onClick={handleEditComment}> Edit comment </Link>
            </div>
        </div>
        <hr />
    </div>
    </>
  )
}

export default Comment