import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

//This is the main app component that is rendered in index.jsx.
//Here, I will integrate the basic app componenets.

import { About } from './about/about.jsx';
import { Calendar } from './calendar/calendar.jsx';
import { DayView } from './day/day.jsx';
import { Login } from './login/login.jsx';
import { Prioritizer } from './prioritizer/prioritizer.jsx';
// import { AddAssignment } from './add_assignment/add_assignment';
// import { EditAssignment } from './edit_assignment/edit_assignment';
// import { AddClass } from './add_class/add_class';
// import { EditClass }  from './edit_class/edit_class';

import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
          <header> 
            <h1>
              Welcome to AmigoOrganizado, user!
            </h1>
          </header>

      
        <Routes>
          <Route path='/' element={<Login />} exact/>
          <Route path='/about' element={<About />} />

        </Routes>
            


          <footer>
            <div id="footer-buttons-container">

              <NavLink to="/" className="btn btn-secondary btn-lg footer-button">Logout</NavLink>
              <NavLink to="/about" className="btn btn-secondary btn-lg footer-button">About</NavLink>



            </div>
        
        <p>Author: Jake Robert Schulz</p>
        <a href="https://github.com/Jakeyboom/CS260Startup">My Github</a>
          </footer>


      </div>

    
    </BrowserRouter>
  
  );
}

function NotFound() {
  return <main className="containter-fluid bg-secondary">404: Return to Sender. Address unknown</main>
}