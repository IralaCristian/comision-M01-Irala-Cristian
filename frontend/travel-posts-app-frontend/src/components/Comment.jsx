import React, { useEffect, useState } from 'react';
import { formStyle } from '../styles/formsClasses.js';
import { API_URL } from '../utils/const.js';

function Comment( { commentId, description, commentAuthor, createdAt}) {
    const { formPicture, formPicutureImg} = formStyle

    const [author, setAuthor] = useState(null);

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

  return (
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
        </div>
        <hr />
    </div>
  )
}

export default Comment