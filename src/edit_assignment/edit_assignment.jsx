import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../../CSS/add-and-edit.css';
import { getCurrentUserClasses } from '../class-service.js';
import { isLoggedIn } from '../login-service.js';
import { handleEditAssignment, handleDeleteAssignment } from '../assignment-service.js';

export function EditAssignment() {
    if(!isLoggedIn()) {
        return <main> <h2>Please log in to edit assignments. </h2> </main>
    }



    const navigate = useNavigate();
    const [newClassName, setNewClassName] = React.useState("");
    const [newAssignmentName, setNewAssignmentName] = React.useState("");
    const [newDueDate, setNewDueDate] = React.useState("");
    const [newDifficulty, setNewDifficulty] = React.useState("");
    const { currentClassName, currentAssignmentName } = useParams();
    const currentUserClasses = getCurrentUserClasses();
    console.log("Current edit class parameters: " + currentClassName + ", " + currentAssignmentName);

    const saveChanges = (event) => {
        event.preventDefault();
        console.log("Save Changes requested in edit_assignment.jsx" + `\nProposed Changes: AssignmentName: ${newAssignmentName} \n ClassName: ${newClassName} \n DueDate: ${newDueDate} \n Difficulty: ${newDifficulty}`);
        if(handleEditAssignment(currentAssignmentName, currentClassName, newAssignmentName, newClassName, newDueDate, newDifficulty)) {
            navigate("/prioritizer")
        }
    };


    const deleteAssignment = () => {
        console.log("Delete Assignment requested");
        if(handleDeleteAssignment(currentAssignmentName, currentClassName)) {
            navigate("/prioritizer");
        }
    };

    const cancelChanges = () => {navigate("/prioritizer")};
    return(
    <main className="main-add-edit">

        <h2 className="assignment-or-class-title">Selected Assignment: {currentAssignmentName}</h2>

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