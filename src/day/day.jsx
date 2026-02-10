import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export function DayView() {
    return(
    <main> 
        <label for="assignments-due-today">Assignments due on this day:</label>
        <ul class="classes" id="assignments-due-today">
            <li>                    
                <NavLink to="/edit_assignment">Assignment 1</NavLink>
                <NavLink to="/edit_class">Math</NavLink>
            </li>

            <li>                    
                <NavLink to="/edit_assignment">Assignment 1</NavLink>
                <NavLink to="/edit_class">Geography</NavLink>
            </li>
            <li>                    
                <NavLink to="/edit_assignment">Assignment 2</NavLink>
                <NavLink to="/edit_class">Geography</NavLink>
            </li>
        </ul>                
        
        <form action="main.html" method="get" id="return-button-form">
            <div id="main-buttons">
                <NavLink to='/prioritizer' className="btn btn-primary btn">Return to Overview</NavLink>

            </div>
        </form>
    </main>
    )
}