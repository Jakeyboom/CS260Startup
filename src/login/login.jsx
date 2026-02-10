import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { useNavigate } from 'react-router-dom';

export  function Login() {
    const navigate = useNavigate();

    const handleLogin = () => {console.log("Login requested"); navigate("/prioritizer")};
    const handleCreateAccount = () => {console.log("Create Account requested"); navigate("/prioritizer")};
    const handleForgotPassword = () => {console.log("Forgot Password requrested"); navigate("/prioritizer")};


    return(
        <main id="login-main">
                  <h2>
        (<i>Please Login or Signup</i>)
      </h2>

      <form action='prioritizer' method="get"> 
          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="email@email.com"/>
          </div>
          <br/>



          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="passWord123" />
          </div>
          
          <div id="login-buttons">
            <button type="button" className="btn btn-primary btn" onClick={handleLogin}>Login</button>
            <button type="button" className="btn btn-primary btn" onClick={handleCreateAccount}>Create Account</button>
            <button type="button" className="btn btn-primary btn" onClick={handleForgotPassword}>Forgot Password</button>

          </div>
        </form>

        </main>



      
    )

}