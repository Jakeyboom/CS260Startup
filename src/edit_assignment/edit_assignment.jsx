import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../../CSS/add-and-edit.css';
import { confirmSession } from '../auth/session';

export function EditAssignment() {




    const navigate = useNavigate();
    const [newClassName, setNewClassName] = React.useState("");
    const [newAssignmentName, setNewAssignmentName] = React.useState("");
    const [newDueDate, setNewDueDate] = React.useState("");
    const [newDifficulty, setNewDifficulty] = React.useState("");
    const { currentClassNameEncoded, currentAssignmentNameEncoded } = useParams();
    const [currentUserClasses, setCurrentUserClasses] = React.useState([]);
    const currentClassName = decodeURIComponent(currentClassNameEncoded);
    const currentAssignmentName = decodeURIComponent(currentAssignmentNameEncoded);
    console.log("Current edit class parameters: " + currentClassName + ", " + currentAssignmentName);

    React.useEffect(() => {
    }, [navigate]);


    React.useEffect(() => {
        if(!confirmSession()) {
            alert("You must be logged in to view this page.");
            navigate("/");
            return;
        }


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
    }, [navigate])
    

    const saveChanges = async (event) => {
        event.preventDefault();
        console.log("Save Changes requested");
        if(!newAssignmentName || !newClassName || !newDueDate || !newDifficulty || !currentClassName || !currentAssignmentName) {
            alert("Please fill out all fields before saving.");
            return;
        }

        try {
            const newAssignment = {oldAssignmentName: currentAssignmentName, oldClassName: currentClassName, newAssignmentName: newAssignmentName, newClassName: newClassName, newDueDate: newDueDate, newDifficulty: newDifficulty};
            const response = await fetch('/api/assignments', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(newAssignment)
            });

            if(!response.ok) {
                throw new Error("Failed to edit assignment. Server responded with status: " + response.status);
            }

            navigate("/prioritizer");
        } catch(error) {
            console.error("Error editing assignment: ", error);
            alert("An error occurred while saving the assignment. \n Error: " + error.message);
            return;
        }


    };


    const deleteAssignment = async () => {
        console.log("Delete Assignment requested");
        try {
            if(currentClassName === null || currentClassName === undefined || currentAssignmentName === null || currentAssignmentName === undefined) {
                throw new Error("Invalid class name");
            }

            const assignmentBody = {assignmentName: currentAssignmentName, className: currentClassName};
            const response = await fetch('/api/assignments', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(assignmentBody)
            });
        } catch(error) {
            console.error("Error deleting assignment: ", error);
            alert("An error occurred while deleting the assignment. \n Error: " + error.message);
            return;
        }
    };

    const cancelChanges = () => {navigate("/prioritizer")};
    return(
    <main className="main-add-edit">

        <h2 className="assignment-or-class-title">Selected Assignment: {currentAssignmentName} in Class: {currentClassName}</h2>

        <form action="main.html" method="get" className="add-and-edit-form" onSubmit={saveChanges}>

            

            <label className="add-edit-label" for="change-assignment-name">Change Assignment Name</label>
            <input type="text" id="change-assignment-name" name="changeAssignmentName" onChange={(e) => setNewAssignmentName(e.target.value)} placeholder="Assignment name here" required />
            


            <div>
                <label className="add-edit-label" for="class-change">Change Class:</label>
                <select id="class-select" name="classSelect" required onChange={(e) => setNewClassName(e.target.value)}>
                    
                    <option value="" disabled selected>-------</option>
                    {currentUserClasses.map((c) => <option key={c.className} value={c.className}>{c.className}</option>)}
                </select>


            </div>


            <label className="add-edit-label" for="change-due-date">Change Due Date:</label>
            <input type="date" id="change-due-date" name="changeDueDate" onChange = {(e) => setNewDueDate(e.target.value)} required />


            <div>
                <fieldset onChange= {(e) => setNewDifficulty(e.target.value)}>
                    <legend>Difficulty</legend>

                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="easy" required/> Easy
                    </label>

                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="medium"/> Medium
                    </label>
                
                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="hard"/> Hard
                    </label>

                    
                </fieldset>
            </div>


            <div className="add-buttons-container">
                <button className="btn btn-primary btn" type="submit">Save Changes</button>
                <button className="btn btn-primary btn" type="button" onClick={deleteAssignment}>Delete Assignment</button>
                <button className='btn btn-primary btn' type="button" onClick={cancelChanges}>Cancel</button>
            </div>

        </form>

        

    </main>
    )
}