import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { login, createAccount } from '../login-service';
import { useNavigate } from 'react-router-dom';

export  function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

    const navigate = useNavigate();

    const handleLogin = (event) => {
      event.preventDefault();
      if(login(email, password)) {
        navigate("/prioritizer");
      } else {
        //TODO: Implement error handling here.
      };
    };

    //Here will be the Create Account handler
    const handleCreateAccount = (event) => {
      console.log("Create Account requested"); 
      if(createAccount(email, password)) {
        navigate("/prioritizer");
      } else {
        //TODO: Implement error handling here.
      }
    };

    
    const handleForgotPassword = (event) => {console.log("Forgot Password requrested"); navigate("/prioritizer")};


    return(
        <main id="login-main">
                  <h2>
        (<i>Please Login or Signup</i>)
      </h2>

      <form action='prioritizer' method="get" onSubmit={handleCreateAccount}> 
          <div className="form-row">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="email@email.com" onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <br/>



          <div className="form-row">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="passWord123" onChange={(e) => setPassword(e.target.value)}/>
          </div>
          
          <div id="login-buttons">
            <button type="button" className="btn btn-primary btn" onClick={handleLogin}>Login</button>
            <button type="submit" className="btn btn-primary btn">Create Account</button>
            <button type="button" className="btn btn-primary btn" onClick={handleForgotPassword}>Forgot Password</button>

          </div>
        </form>

        </main>



      
    )

}