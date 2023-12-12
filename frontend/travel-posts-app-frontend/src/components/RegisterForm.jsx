import { useId, useRef } from "react";

 export const RegisterForm= () => {

  const ref = useRef(null);

  const usernameRef = useId();
  const passwordRef = useId();
  const repeatPasswordRef = useId();
  const emailRef = useId();
  const avatarURLRef = useId();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.target.elements);
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

