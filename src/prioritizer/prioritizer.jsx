import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink} from 'react-router-dom';
//Here will be some canned inspirational quotes to mock an api call.

const inspirationalQuotes = [
    "When life gives you lemons, don’t make lemonade. Make life take the lemons back!",
    "The best way to predict the future is to invent it.",
    "Life is 10% what happens to us and 90% how we react to it.",
    "The only way to do great work is to love what you do.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts."
]

export function Prioritizer() {
 

   

    const [userClasses, setUserClasses] = React.useState([]);
    const [allAssignments, setAllAssignments] = React.useState([]);
    const [currentQuote, setCurrentQuote] = React.useState(inspirationalQuotes[0]);

    function changeQuote() {
        const newQuote = "\"" + inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)] + "\"";
        setCurrentQuote(newQuote);
    }

    React.useEffect(() => {
        const interval = setInterval(() => 
        changeQuote(), 5000);

        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        //Here, I will make the fetch request to the backend to 
        //get the user classes and assignments.

        async function loadClasses() {
            const response = await fetch('/api/classes', {
                method: 'GET',
                credentials: 'include'
            })

            if(response.ok) {
                const data = await response.json();
                console.log(" Classes data received: ", data);
                setUserClasses(data.classes);
            } else {
                console.error("Error fetching classes data");
            }
        }

        loadClasses();
    }, []);

    React.useEffect(() => {
        //Here, I will make the fetch requests for the user assignments.

        async function loadAssignments() {
            const response = await fetch('/api/assignments', {
                method: 'GET',
                credentials: 'include'
            });

            if(response.ok) {
                const data = await response.json();
                console.log("Assignments data received: ", data);
                setAllAssignments(data.assignments);
            } else {
                console.error("Error fetching assignments data");
            }
        }

        loadAssignments();
    }, []);

    return(
            <main> 
        

        <section id="classes-section">
            <div className="assignments-section" id="prioritizer-section">
            <label for="prioritizer"><i>Prioritizer:</i></label>
            <ol id="prioritizer" className="classes">

                {(userClasses
            .length === 0 || allAssignments.length === 0) ? <li>No Assignments or Classes Found.  Please add some!</li> : allAssignments.map((a) => <li key={a.className + " $$$ASSSIGNMENT$$$ " + a.assignmentName} className={"assignment_" + a.difficulty}>
                    <NavLink to={"/edit_assignment/" + encodeURIComponent(a.className) + "/" + encodeURIComponent(a.assignmentName)}>{a.assignmentName}</NavLink>
                    <NavLink to={"/edit_class/" + encodeURIComponent(a.className)}>{a.className}</NavLink>
                    <NavLink to={`/day/${a.dueDate}`} id="due-date" className="due-date"> Due {a.dueDate}</NavLink>
                </li>)}
        </ol>
        </div>

         <div className="assignments-section">
            <label for="due-today"><i>Due Today:</i></label>
            <ol id="due-today" className="classes">


                {
                
        allAssignments.some((a) => a.dueDate === new Date().toLocaleDateString('en-CA').split('T')[0]) ? allAssignments.map((a) => {
                    //This might be better to store globally.
                    const today = new Date().toLocaleDateString('en-CA').split('T')[0];
                    if(a.dueDate === today) {
                        return <li key={a.className + " $$$ASSSIGNMENT$$$ " + a.assignmentName} className={"assignment_" + a.difficulty}>
                            <NavLink to={"/edit_assignment/" + encodeURIComponent(a.className) + "/" + encodeURIComponent(a.assignmentName)}>{a.assignmentName}</NavLink>
                            <NavLink to={"/edit_class/" + encodeURIComponent(a.className)}>{a.className}</NavLink>
                            <NavLink to={`/day/${a.dueDate}`} id="due-date" className="due-date"> Due {a.dueDate}</NavLink>
                        </li>
                    }
                }) : <li>No Assignments Due Today!  Enjoy your day</li>
                
                
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