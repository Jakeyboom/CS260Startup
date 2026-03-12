import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';
import { useNavigate } from 'react-router-dom';
import { createAssignment } from '../assignment-service.js';

export function AddAssignment() {


    const [currentUserClasses, setCurrentUserClasses] = React.useState([]);
    
    const [assignmentName, setAssignmentName] = React.useState("");
    const [userClassName, setClassName] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        async function loadClasses() {

            try {
                const response = await(fetch('/api/classes', {
                    method: 'GET',
                    credentials: 'include'
                }));

                if(!response.ok) {
                    throw new Error ("Error fetching classes data: " + response.statusText);
                }

                const classesBody = await response.json();
                const classes = classesBody.classes;
                setCurrentUserClasses(classes);
            } catch(error) {
                console.error("Error fetching classes data: ", error);
            }


        }

        loadClasses();
    }, [])

    const saveChanges = async (event) =>{
        event.preventDefault();
        if(!assignmentName || !userClassName || !dueDate || !difficulty) {
            alert("Please fill out all fields before saving.");
            return;
        }

        try {
            const assignment = {assignmentName: assignmentName, className: userClassName, dueDate: dueDate, difficulty: difficulty};
            const response = await fetch('/api/assignments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(assignment)
            });

            if(!response.ok) {
                throw new Error("Failed to save assignment. Server responded with status: " + response.status);
            }

            navigate("/prioritizer");
        } catch(error) {
            console.error("Error saving assignment: ", error);
            alert("An error occurred while saving the assignment. \n Error: " + error.message);
            return;
        }
    };
    const cancelChanges = () => {navigate("/prioritizer")};


    return(
        <main className="main-add-edit"> 


        <form action="main.html" method="get" className="add-and-edit-form">

            <label className="add-edit-label" for="assignment-name">Assignment Name:</label>
            <input type="text" id="assignment-name" name="assignmentName" placeholder="Assignment name here" required onChange = {(e) => setAssignmentName(e.target.value)}/>
            


            <div>
                <label className="add-edit-label" for="class-select">Select Class:</label>
                <select id="class-select" name="classSelect" required onChange={(e) => setClassName(e.target.value)}>
                    
                    <option value="" disabled selected>-------</option>
                    {currentUserClasses.map((c) => <option key={c.className} value={c.className}>{c.className}</option>)}
                </select>

            </div>


            <label className="add-edit-label" for="due-date">Due Date:</label>
            <input type="date" id="due-date" name="dueDate" required onChange={(e) => setDueDate(e.target.value)} />


            <div>
                <fieldset>
                    <legend>Difficulty</legend>

                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="easy" required onChange={(e) => setDifficulty(e.target.value)}/> Easy
                    </label>

                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="medium" onChange={(e) => setDifficulty(e.target.value)}/> Medium
                    </label>
                
                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="hard" onChange={(e) => setDifficulty(e.target.value)}/> Hard
                    </label>


                </fieldset>
            </div>


            <div className="add-buttons-container">
                <button className="btn btn-primary btn" type="button" onClick={saveChanges}>Save Changes</button>
                <button className="btn btn-primary btn" type="button" onClick={cancelChanges}>Cancel</button>
            </div>
            
        </form>


        
    </main>
    )
}