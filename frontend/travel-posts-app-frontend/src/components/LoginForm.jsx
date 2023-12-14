import { useId, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/const";
import { AuthContext } from "../providers/AuthProvider";
import { formStyle } from "../styles/formsClasses.js";

export const LoginForm = () => {
  //React Hooks
  const emailRef = useId();
  const passwordRef = useId();
  const ref = useRef(null);
  const { formControl, formLabel, formColumn, formRow, formBtnPrim, formContainer} = formStyle

  const { login } = useContext(AuthContext);

  const navigate = useNavigate();

  //Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    //obtain the form fields from formData
    const formData = new FormData(e.target);

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const req = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status !== 200) {
      ref.current.reset();
      return alert("Login error");
    }

    const res = await req.json();

    login(res);

    ref.current.reset();

    navigate("/");
  };

  return (
    <div className={formContainer}>
      <div className={formRow}>
        <div className={formColumn}>
          <h2 className="display-5"> Login </h2>
        </div>
      </div>
      <div className={formRow}>
        <div className={formColumn}>
          <form onSubmit={handleSubmit} ref={ref}>
            <label htmlFor={emailRef} className={formLabel}>
              Email:
            </label>
            <input
              type="email"
              name="email"
              id={emailRef}
              className={formControl}
              placeholder="myEmail@email.com"
              required
            />
            <label htmlFor={passwordRef} className={formLabel}>
              Password:
            </label>
            <input
              type="password"
              name="password"
              id={passwordRef}
              className={formControl}
              placeholder="**********"
              required
            />
            <br />
            <button className={formBtnPrim}> Login </button>
          </form>
        </div>
      </div>
      {/* div row py-3 */}
    </div> //div container
  );
};
