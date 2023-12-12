import { useId } from 'react'

export const LoginForm = () => {
  const emailRef = useId();
  const passwordRef = useId();


  return (
    <div>
      <h2> Login </h2>
      <form>
        <label htmlFor={emailRef}> Email:</label>
        <input type="email" name="email" id={emailRef} placeholder='myEmail@email.com' required/>
        <label htmlFor={passwordRef}> Password: </label>
        <input type="password" name="" id={passwordRef} placeholder='**********' required/>
        <br />
        <button> Login </button>
      </form>
    </div>
  )
}

