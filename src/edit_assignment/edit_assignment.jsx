import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../CSS/add-and-edit.css';

export function EditAssignment() {
    return(
    <main className="main-add-edit">
        <form action="main.html" method="get" class="add-and-edit-form">

            

            <label className="add-edit-label" for="change-assignment-name">Change Assignment Name</label>
            <input type="text" id="change-assignment-name" name="changeAssignmentName" placeholder="Assignment name here" required />
            


            <div>
                <label className="add-edit-label" for="class-change">Change Class:</label>
                <select id="class-change" name="classChange" required>

                    <option disabled selected>----</option>
                    <option value="math">Math</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                </select>

            </div>


            <label className="add-edit-label" for="change-due-date">Change Due Date:</label>
            <input type="date" id="change-due-date" name="changeDueDate" required />


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


            <div class="add-buttons-container">
                <button class="btn btn-primary btn" type="submit">Save Changes</button>
                <button class="btn btn-primary btn" type="submit">Delete Assignment</button>
                <button class="btn btn-primary btn" onclick="window.location.href='main.html'">Cancel</button>
            </div>
            

        </form>

    </main>
    )
}