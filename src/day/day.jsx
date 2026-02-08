import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

export function DayView() {
    return(
    <main> 
        <label for="assignments-due-today">Assignments due on this day:</label>
        <ul class="classes" id="assignments-due-today">
            <li>
                <a href="edit_assignment.html">Assignment 1</a>
                 <a href="edit_class.html">Geography</a>
            </li>
            <li>
                <a href="edit_assignment.html">Assignment 2</a>
                <a href="edit_class.html">Geography</a>
            </li>
            <li>
                <a href="edit_assignment.html">Assignment 3</a>
                <a href="edit_class.html">Math</a>
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