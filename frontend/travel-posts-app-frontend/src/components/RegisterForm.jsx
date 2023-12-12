import { useId, useRef } from "react";
import { API_URL } from "../utils/const.js";
import { useNavigate } from "react-router-dom";

 export const RegisterForm= () => {

  //React Hooks
  const ref = useRef(null);
  const navigate = useNavigate();

  const usernameRef = useId();
  const passwordRef = useId();
  const repeatPasswordRef = useId();
  const emailRef = useId();
  const avatarURLRef = useId();

  
  const handleSubmit =  async (e) => {
    e.preventDefault();

    //Obtain user´s fields from formData
    const formData = new FormData( e.target);

    const username= formData.get("username");
    const password= formData.get("password");
    const repeatPassword= formData.get("repeatPassword");
    const email= formData.get("email");
    const avatarURL= formData.get("avatarURL");

    //If password and repeatPassword does´n match return an Alert
    if ( password !== repeatPassword) return alert("Password repetition does not match");
    
    const user= {
      username,
      password,
      email,
      avatarURL,
    };

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      },
    });

    if (req.status !== 201) return alert("User register Error");
    ref.current.reset();

    navigate("/login");
  
  }

  return (
    <div>
      <h2> Sign Up </h2>
      <form onSubmit={handleSubmit} ref={ref}>
        <label htmlFor={usernameRef}>User's name:</label>
        <input
          type="text"
          name="username"
          placeholder="Natalia Natalia"
          id={usernameRef}
        />
        <label htmlFor={passwordRef}> Password: </label>
        <input
          type="password"
          name="password"
          placeholder="*********"
          id={passwordRef}
        />
        <label htmlFor={repeatPasswordRef}> Repeat password:</label>
        <input
          type="password"
          name="repeatPassword"
          placeholder="*********"
          id={repeatPasswordRef}
        />
        <label htmlFor={emailRef}>e-mail:</label>
        <input
          type="email"
          name="email"
          placeholder="your-email@email.com"
          id={emailRef}
        />
        <label htmlFor={avatarURLRef}> Your avatar URL: </label>
        <input
          type="url"
          name="avatarURL"
          placeholder="http://anImageURL.jpg"
          id={avatarURLRef}
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

