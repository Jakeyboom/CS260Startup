import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
import {isLoggedIn} from '../login-service.js';
import { getuserClasses
 } from '../class-service.js';
import { getallAssignments } from '../assignment-service.js';

//Here will be some canned inspirational quotes to mock an api call.

const inspirationalQuotes = [
    "When life gives you lemons, don’t make lemonade. Make life take the lemons back!",
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
]

export function Prioritizer() {
 

    if(!isLoggedIn()) {
        return <main> <h2>Please log in to view the prioritizer. </h2> </main>
    }

    const userClasses = getuserClasses();
    const allAssignments = getallAssignments();
    const [currentQuote, setCurrentQuote] = React.useState(inspirationalQuotes[0]);

    function changeQuote() {
        const newQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
        setCurrentQuote(newQuote);
    }

    React.useEffect(() => {
        const interval = setInterval(() => 
        changeQuote(), 5000);

        return () => clearInterval(interval);
    })

    React.useEffect(() => {
        //Here, I will make the fetch request to the backend to 
        console.log("Loading data for prioritizer. Current user classes: ", userClasses);
    })


    return(
            <main> 
        

        <section id="classes-section">
            <div className="assignments-section" id="prioritizer-section">
            <label for="prioritizer"><i>Prioritizer:</i></label>
            <ol id="prioritizer" className="classes">

                {(userClasses
            .length === 0 || allAssignments.length === 0) ? <li>No Assignments or Classes Found.  Please add some!</li> : allAssignments.map((a) => <li key={a.className + " $$$ASSSIGNMENT$$$ " + a.name} className={"assignment_" + a.difficulty}>
                    <NavLink to={"/edit_assignment/" + encodeURIComponent(a.className) + "/" + encodeURIComponent(a.name)}>{a.name}</NavLink>
                    <NavLink to={"/edit_class/" + encodeURIComponent(a.className)}>{a.className}</NavLink>
                    <NavLink to={`/day/${a.dueDate}`} id="due-date" className="due-date"> Due {a.dueDate}</NavLink>
                </li>)}
        </ol>
        </div>

         <div className="assignments-section">
            <label for="due-today"><i>Due Today:</i></label>
            <ol id="due-today" className="classes">


                {
                userClasses
        .some((c) => c.assignments.some((a) => a.dueDate === new Date().toLocaleDateString('en-CA').split('T')[0])) ? userClasses
        .map((c) => c.assignments.map((a) => {
                    //This might be better to store globally.
                    const today = new Date().toLocaleDateString('en-CA').split('T')[0];
                    if(a.dueDate === today) {
                        return <li key={c.className + " $$$ASSSIGNMENT$$$ " + a.name} className={"assignment_" + a.difficulty}>
                            <NavLink to={"/edit_assignment/" + encodeURIComponent(c.className) + "/" + encodeURIComponent(a.name)}>{a.name}</NavLink>
                            <NavLink to={"/edit_class/" + encodeURIComponent(c.className)}>{c.className}</NavLink>
                            <NavLink to={`/day/${a.dueDate}`} id="due-date" className="due-date"> Due {a.dueDate}</NavLink>
                        </li>
                    }
                })) : <li>No Assignments Due Today!  Enjoy your day</li>
                
                
                }

            </ol>
         </div>


        </section>

          <div id="main-buttons">

            <NavLink to="/add_class" className="btn btn-primary btn-lg">Add Class</NavLink>
            <NavLink to="/add_assignment" className="btn btn-primary btn-lg">Add Assignment</NavLink>
            <NavLink to="/calendar" className="btn btn-primary btn-lg">See Calendar</NavLink>

          </div>


        
        <p id="inspirational-quote">
            <i>{currentQuote}</i>
        </p>

    </main>

    )
    
}