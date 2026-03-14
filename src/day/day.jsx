import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { confirmSession } from '../auth/session';

export function DayView() {

    const navigate = useNavigate();
    const {selectedDay} = useParams();
    const [dateToView, setDateToView] = React.useState(selectedDay || "");
    const [currentUserAssignments, setCurrentUserAssignments] = React.useState([]);

    React.useEffect(() => {

        if(!confirmSession()) {
            alert("You must be logged in to view this page.");
            navigate("/");
            return;
        }
        //Logic for loading assignments
        async function loadAssignments() {
    
            try {
                const response = await(fetch('/api/assignments', {
                    method: 'GET',
                    credentials: 'include'
                }));
    
                if(!response.ok) {
                    throw new Error ("Error fetching assignments data: " + response.statusText);
                }
    
                const assignmentBody = await response.json();
                const assignments = assignmentBody.assignments;
                setCurrentUserAssignments(assignments);
            } catch(error) {
                console.error("Error fetching assignments data: ", error);
            }
    
    
        }
    
        loadAssignments();


    }, [navigate])

    const seeDay = (event) => {
        event.preventDefault();
        // Logic for viewing the selected day
    }

    
    if(currentUserAssignments.length === 0) {
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
        
        
        <div id="search-div">
            <label htmlFor="select-day">Select a Day To View:</label>

            <form id="day-search-form" onSubmit={seeDay}>
                <input type="date" id="select-day" name="selectDay" onChange = {(e) => setDateToView(e.target.value)}></input>
                <button type="submit" className="btn btn-primary btn">View Day</button>
            </form>
        </div>

        <label htmlFor="assignments-due-today">Assignments due on {dateToView}</label>
        <ul className="classes" id="assignments-due-today">
            {/* Here, I will list all the assignments that are due on the selected day. */}
            {
               currentUserAssignments.some((a) => a.dueDate === dateToView) ? 
        
  
                currentUserAssignments.map((a) => {
                    if(a.dueDate === dateToView) {
                        return <li key={a.className + " $$$ASSSIGNMENT$$$ " + a.assignmentName} className={"assignment_" + a.difficulty}>
                            <NavLink to={"/edit_assignment/" + encodeURIComponent(a.className) + "/" + encodeURIComponent(a.assignmentName)}>{a.assignmentName}</NavLink>
                            <NavLink to={"/edit_class/" + encodeURIComponent(a.className)}>{a.className}</NavLink>
                        </li>
                }
            }) : <li>No assignments due on this day!</li>
        }
        </ul>                
        
        <form action="main.html" method="get" id="return-button-form">
            <div id="main-buttons">
                <NavLink to='/prioritizer' className="btn btn-primary btn">Return to Overview</NavLink>

            </div>
        </form>
    </main>
    )
}