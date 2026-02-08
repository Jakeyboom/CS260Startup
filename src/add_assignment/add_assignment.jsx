import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';

export function AddAssignment() {
    return(
        <main className="main-add-edit"> 

        <form action="main.html" method="get" class="add-and-edit-form">

            <label className="add-edit-label" for="assignment-name">Assignment Name:</label>
            <input type="text" id="assignment-name" name="assignmentName" placeholder="Assignment name here" required />
            


            <div>
                <label className="add-edit-label" for="class-select">Select Class:</label>
                <select id="class-select" name="classSelect">

                    <option disabled selected required>----</option>
                    <option value="math">Math</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                </select>

            </div>


            <label className="add-edit-label" for="due-date">Due Date:</label>
            <input type="date" id="due-date" name="dueDate" required />


            <div>
                <fieldset>
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
                <button className="btn btn-primary btn" onclick="window.location.href='main.html'">Cancel</button>
                
            </div>
            
        </form>

        
    </main>
    )
}