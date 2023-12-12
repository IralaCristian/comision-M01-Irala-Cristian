import { useId, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../utils/const';
import { AuthContext } from '../providers/AuthProvider';

export const LoginForm = () => {

  //React Hooks
  const emailRef = useId();
  const passwordRef = useId();
  const ref= useRef(null);

  const { login } = useContext(AuthContext);

  const navigate= useNavigate();

  //Submit handler
  const handleSubmit = async (e) =>{
    e.preventDefault();

    //obtain the form fields from formData
    const formData= new FormData(e.target);

    const user= {
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

  }


  return (
    <div>
      <h2> Login </h2>
      <form onSubmit={handleSubmit} ref={ref}>
        <label htmlFor={emailRef}> Email:</label>
        <input type="email" name="email" id={emailRef} placeholder='myEmail@email.com' required/>
        <label htmlFor={passwordRef}> Password: </label>
        <input type="password" name="password" id={passwordRef} placeholder='**********' required/>
        <br />
        <button> Login </button>
      </form>
    </div>
  )
}

