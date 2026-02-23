import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import {isLoggedIn} from '../login-service.js';
import { getCurrentUserClasses } from '../class-service.js';

export function Prioritizer() {
 

    if(!isLoggedIn()) {
        return <main> <h2>Please log in to view the prioritizer. </h2> </main>
    }

    const currentUserClasses = getCurrentUserClasses();

    return(
            <main> 
        

        <section id="classes-section">
            <div className="assignments-section" id="prioritizer-section">
            <label for="prioritizer"><i>Prioritizer:</i></label>
            <ol id="prioritizer" className="classes">
                {/* <li>                    
                    <NavLink to="/edit_assignment">Assignment 1</NavLink>
                    <NavLink to="/edit_class">Math</NavLink>
                    <span id="due-date" className="due-date"> Due 1/1/2000</span>
                </li> */}

                {currentUserClasses.map((c) => c.assignments.map((a) => <li key={c.className + " $$$ASSSIGNMENT$$$ " + a.name} className={"assignment_" + a.difficulty}>
                    <NavLink to={"/edit_assignment/" + encodeURIComponent(c.className) + "/" + encodeURIComponent(a.name)}>{a.name}</NavLink>
                    <NavLink to={"/edit_class/" + encodeURIComponent(c.className)}>{c.className}</NavLink>
                    <span id="due-date" className="due-date"> Due {a.dueDate}</span>
                </li>))}
        </ol>
        </div>

         <div className="assignments-section">
            <label for="due-today"><i>Due Today:</i></label>
            <ol id="due-today" className="classes">
                {currentUserClasses.map((c) => c.assignments.map((a) => {
                    debugger;
                    //This might be better to store globally.
                    const today = new Date().toLocaleDateString('en-CA').split('T')[0];
                    if(a.dueDate === today) {
                        return <li key={c.className + " $$$ASSSIGNMENT$$$ " + a.name} className={"assignment_" + a.difficulty}>
                            <NavLink to={"/edit_assignmet/" + encodeURIComponent(c.className) + "/" + encodeURIComponent(a.name)}>{a.name}</NavLink>
                            <NavLink to={"/edit_class/" + encodeURIComponent(c.className)}>{c.className}</NavLink>
                            <span id="due-date" className="due-date"> Due {a.dueDate}</span>
                        </li>
                    }
                }))}

            </ol>
         </div>


        </section>

          <div id="main-buttons">

            <NavLink to="/add_class" className="btn btn-primary btn-lg">Add Class</NavLink>
            <NavLink to="/add_assignment" className="btn btn-primary btn-lg">Add Assignment</NavLink>
            <NavLink to="/calendar" className="btn btn-primary btn-lg">See Calendar</NavLink>

          </div>


        
        <p id="inspirational-quote">
            <b>INSPIRATIONAL QUOTE HERE:</b> <i>When life gives you lemons, don’t make lemonade. Make life take the lemons back!</i>
        </p>

    </main>

    )
    
}