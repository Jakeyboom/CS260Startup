import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { confirmSession } from '../auth/session';
//Here will be some canned inspirational quotes to mock an api call.


export function Prioritizer() {
 

   
    const navigate = useNavigate();
    const [userClasses, setUserClasses] = React.useState([]);
    const [allAssignments, setAllAssignments] = React.useState([]);
    const [currentQuote, setCurrentQuote] = React.useState("Loading inspirational quote...");

    function changeQuote(quotes) {
        const newQuote = "\"" + quotes[Math.floor(Math.random() * quotes.length)].quote + "\"";
        setCurrentQuote(newQuote);
    }

    React.useEffect(() => {

        async function fetchQuotes() {
            try {
                    //CREDITS: QUOTESLATE API FROM GITHUB https://github.com/musheer360/QuoteSlate?tab=readme-ov-file#features
                    //To respect the API rate limit, I will fetch 50 quotes at a time and store them in local storage. Then, I will randomly select one every couple of seconds.
                
                const response = await fetch('https://quoteslate.vercel.app/api/quotes/random?count=50');
                if(response.ok) {
                    const data = await response.json();
                    console.log("Quote data received: ", data);
                    localStorage.setItem("inspirationalQuotes", JSON.stringify(data));
                } else {
                    throw new Error(response.status);
                }
            } catch(error) {
                console.error("Error fetching quote from API, using default quote. Error: ", error);
                localStorage.setItem("inspirationalQuotes", JSON.stringify(["Unable to load quotes.  Stay motivated!"]));
            }

        }

        //This is done to prevent too many API calls to the quote service to respect the rate limit.
        if(!localStorage.getItem("inspirationalQuotes")) {
            fetchQuotes();
        }



        const interval = setInterval(async () => {
            let inspirationalQuotes = JSON.parse(localStorage.getItem("inspirationalQuotes"))
            if(inspirationalQuotes) {
                changeQuote(inspirationalQuotes);
            }
        }
        , 20000);
        return () => clearInterval(interval);
    }, []);

    React.useEffect(() => {
        if(!confirmSession()) {
            alert("You must be logged in to view this page.");
            navigate("/");
            return;
        }
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
        loadClasses();
    }, [navigate]);


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