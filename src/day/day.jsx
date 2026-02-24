import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import { getCurrentUserClasses } from '../class-service.js';
import { isLoggedIn } from '../login-service.js';

export function DayView() {
    if(!isLoggedIn()) {
        return <main> <h2>Please log in to view specific days. </h2> </main>
    }

    const [dateToView, setDateToView] = React.useState("");
    const currentUserClasses = getCurrentUserClasses();
    const seeDay = (event) => {
        event.preventDefault();
        // Logic for viewing the selected day
    }

    if(currentUserClasses.length === 0) {
        return <main> <h2>Please add some classes and assignments to view specific days. </h2> 
                <form action="main.html" method="get" id="return-button-form">
            <div id="main-buttons">
                <NavLink to='/prioritizer' className="btn btn-primary btn">Return to Overview</NavLink>

            </div>
        </form>

        </main>
        
    }

    return(
    <main> 
        <form onSubmit={seeDay}>
            <label for="select-day">Select a Day To View:</label>
            <input type="date" id="select-day" name="selectDay" onChange = {(e) => setDateToView(e.target.value)}></input>
            <button type="submit" className="btn btn-primary btn">View Day</button>
        </form>
        <label for="assignments-due-today">Assignments due on {dateToView}</label>
        <ul className="classes" id="assignments-due-today">
            {/* Here, I will list all the assignments that are due on the selected day. */}
            {
                currentUserClasses.some((c) => c.assignments.some((a) => a.dueDate !== dateToView)) ? <li>No Assignments Due on this Day!</li> :
            

                currentUserClasses.map((c) => c.assignments.map((a) => {
                    if(a.dueDate === dateToView) {
                        return <li key={c.className + " $$$ASSSIGNMENT$$$ " + a.name} className={"assignment_" + a.difficulty}>
                            <NavLink to={"/edit_assignment/" + encodeURIComponent(c.className) + "/" + encodeURIComponent(a.name)}>{a.name}</NavLink>
                            <NavLink to={"/edit_class/" + encodeURIComponent(c.className)}>{c.className}</NavLink>
                        </li>
                }
            }))}
        </ul>                
        
        <form action="main.html" method="get" id="return-button-form">
            <div id="main-buttons">
                <NavLink to='/prioritizer' className="btn btn-primary btn">Return to Overview</NavLink>

            </div>
        </form>
    </main>
    )
}