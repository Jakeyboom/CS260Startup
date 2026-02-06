import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return (

    <div>
      <header> 
        <h1>
            Welcome to AmigoOrganizado, user!
        </h1>
      </header>

      
      
      App will display here


      <footer>
        <div id="footer-buttons">
            <form action="index.html" method="get">
                <button className="btn btn-secondary btn-lg" type="submit">Logout</button>
            </form>
        
            <form action="about.html" method="get">
                <button className="btn btn-secondary btn-lg" type="submit">About</button>
            </form>

        </div>
        
      <p>Author: Jake Robert Schulz</p>
      <a href="https://github.com/Jakeyboom/CS260Startup">My Github</a>
     </footer>

    </div>
  
  );
}