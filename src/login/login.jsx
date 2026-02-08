import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/login.css';

export  function Login() {
    return(
        <main id="login-main">
                  <h2>
        (<i>Please Login or Signup</i>)
      </h2>

      <form action='prioritizer' method="get"> 
          <div className="form-row">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="email@email.com"/>
          </div>
          <br/>



          <div className="form-row">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="passWord123" />
          </div>
          
          <div id="login-buttons">
            <button type="submit" className="btn btn-primary btn">Login</button>
            <button type="submit" className="btn btn-primary btn">Create Account</button>
            <button type="submit" className="btn btn-primary btn">Forgot Password</button>

          </div>
        </form>

        </main>
    )
}