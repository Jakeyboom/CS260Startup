import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

//This is the main app component that is rendered in index.jsx.
//Here, I will integrate the basic app componenets.

import {About} from './about/about.jsx';
import {Calendar} from './calendar/calendar.jsx';
import {DayView} from './day/day.jsx';
import {Login} from './login/login.jsx';
import {AddAssignment} from './add_assignment/add_assignemnt';
import {EditAssignment} from './edit_assignment/edit_assignment';
import {AddClass} from './add_class/add_class';
import {EditClass} from './edit_class/edit_class';

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

      
          <main>

          </main>


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

    
    </BrowserRouter>
  
  );
}