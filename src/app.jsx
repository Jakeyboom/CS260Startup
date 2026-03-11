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
import { AddAssignment } from './add_assignment/add_assignment';
import { EditAssignment } from './edit_assignment/edit_assignment';
import { AddClass } from './add_class/add_class';
import { EditClass }  from './edit_class/edit_class';

import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  
  );
}

function AppContent() {

  function logout(navigate) {
  fetch('/api/auth', {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include'
  }).then(response => {
    if(response.ok) {
      console.log("Logout successful.");
      navigate("/"); // Redirect to login page after successful logout
    }
  })
}


const navigate = useNavigate();

  return(
        <div className="app">
          <header> 
            <h1>
              Welcome to AmigoOrganizado!
            </h1>
          </header>

      
        <Routes>
          <Route path='/' element={<Login />} exact/>
          <Route path='/about' element={<About />} />
          <Route path='/prioritizer' element={<Prioritizer />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/day' element={<DayView />} />
          <Route path='/add_assignment' element={<AddAssignment />} />
          <Route path='/add_class' element={<AddClass />} />
          <Route path='/edit_assignment/:currentClassNameEncoded/:currentAssignmentNameEncoded' element={<EditAssignment />} />
          <Route path='/edit_class/:currentClassNameEncoded' element={<EditClass />} />
          <Route path='/day/:selectedDay' element={<DayView />} />
          <Route path='/*' element={<NotFound />} />

        </Routes>
            


          <footer>
            <div id="footer-buttons-container">

              <button className="btn btn-secondary btn-lg footer-button" onClick = { () => logout(navigate) } >Logout</button>
              <NavLink to="/about" className="btn btn-secondary btn-lg footer-button">About</NavLink>



            </div>
        
        <p>Author: Jake Robert Schulz</p>
        <a href="https://github.com/Jakeyboom/CS260Startup">My Github</a>
          </footer>


      </div>)


}

function NotFound() {
  return <main className="containter-fluid bg-secondary">404: Return to Sender. Address unknown</main>
}