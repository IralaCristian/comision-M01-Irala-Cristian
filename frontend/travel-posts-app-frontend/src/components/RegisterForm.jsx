import { useId, useRef } from "react";
import { API_URL } from "../utils/const.js";
import { useNavigate } from "react-router-dom";
import { formStyle } from "../styles/formsClasses.js";
import Navbar from "./Navbar.jsx";

export const RegisterForm = () => {
  //React Hooks
  const ref = useRef(null);
  const navigate = useNavigate();

  //styles classes object
  const {
    formBtnPrim,
    formColumn,
    formContainer,
    formControl,
    formLabel,
    formRow,
  } = formStyle;

  const usernameRef = useId();
  const passwordRef = useId();
  const repeatPasswordRef = useId();
  const emailRef = useId();
  const avatarURLRef = useId();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Obtain user´s fields from formData
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");
    const email = formData.get("email");
    const avatarURL = formData.get("avatarURL");

    //If password and repeatPassword does´n match return an Alert
    if (password !== repeatPassword)
      return alert("Password repetition does not match");

    const user = {
      username,
      password,
      email,
      avatarURL,
    };

    const req = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (req.status !== 201) return alert("User register Error");

    //Reset the form fields with a ref value (null)
    ref.current.reset();

    navigate("/login");
  };

  return (
    <div className={formContainer}>
      <Navbar/>
      <h2> Sign Up </h2>
      <form onSubmit={handleSubmit} ref={ref}>
        <label htmlFor={usernameRef} className={formLabel}>User's name:</label>
        <input
          type="text"
          name="username"
          placeholder="JoeDoe"
          id={usernameRef}
          className={formControl}
        />
        <label htmlFor={passwordRef} className={formLabel}> Password: </label>
        <input
          type="password"
          name="password"
          placeholder="*********"
          id={passwordRef}
          className={formControl}
        />
        <label htmlFor={repeatPasswordRef} className={formLabel}> Repeat password:</label>
        <input
          type="password"
          name="repeatPassword"
          placeholder="*********"
          id={repeatPasswordRef}
          className={formControl}
        />
        <label htmlFor={emailRef} className={formLabel}>e-mail:</label>
        <input
          type="email"
          name="email"
          placeholder="your-email@email.com"
          id={emailRef}
          className={formControl}
        />
        <label htmlFor={avatarURLRef} className={formLabel}> Your avatar URL: </label>
        <input
          type="url"
          name="avatarURL"
          placeholder="http://anImageURL.jpg"
          id={avatarURLRef}
          className={formControl}
        />
        <br />
        <button className={formBtnPrim}>Register</button>
      </form>
    </div>
  );
};
