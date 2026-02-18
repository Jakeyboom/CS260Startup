import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';
import { useNavigate } from 'react-router-dom';
import { createAssignment } from '../assignment-service.js';
import { isLoggedIn } from '../login-service.js';

export function AddAssignment() {
    if(!isLoggedIn()) {
        return <main> <h2>Please log in to add assignments. </h2> </main>
    }
    
    const [assignmentName, setAssignmentName] = React.useState("");
    const [className, setClassName] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");

    const navigate = useNavigate();

    const saveChanges = () => {
        if(createAssignment(assignmentName, className, dueDate, difficulty)) {
            navigate("/prioritizer");
        } else {
            console.log("Failed to create assignment. Please try again.");
        }
    };
    const cancelChanges = () => {navigate("/prioritizer")};


    return(
        <main className="main-add-edit"> 


        <form action="main.html" method="get" className="add-and-edit-form">

            <label className="add-edit-label" for="assignment-name">Assignment Name:</label>
            <input type="text" id="assignment-name" name="assignmentName" placeholder="Assignment name here" required />
            


            <div>
                <label className="add-edit-label" for="class-select">Select Class:</label>
                <select id="class-select" name="classSelect" required onChange={(e) => setClassName(e.target.value)}>

                    <option value="math">Math</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                </select>

            </div>


            <label className="add-edit-label" for="due-date">Due Date:</label>
            <input type="date" id="due-date" name="dueDate" required onChange={(e) => setDueDate(e.target.value)} />


            <div>
                <fieldset>
                    <legend>Difficulty</legend>

                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="0" required onChange={(e) => setDifficulty(e.target.value)}/> Easy
                    </label>

                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="1" onChange={(e) => setDifficulty(e.target.value)}/> Medium
                    </label>
                
                    <label className="add-edit-label">
                        <input type="radio" name="difficulty" value="2" onChange={(e) => setDifficulty(e.target.value)}/> Hard
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