import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../CSS/add-and-edit.css';

export function EditClass() {
    return(
         <main> 

        <form action="main.html" method="get" class="add-and-edit-form">

            <label for="class-name">Change Class Name:</label>
            <input type="text" id="class-name" name="className" required placeholder="Class name here"/>

            <fieldset>
                <legend>Difficulty</legend>

                <label>
                    <input type="radio" name="difficulty" value="easy" required/> Easy
                </label>

                <label>
                    <input type="radio" name="difficulty" value="medium"/> Medium
                </label>

                <label>
                    <input type="radio" name="difficulty" value="hard"/> Hard
                </label>


            </fieldset>
            
            <div className="add-buttons-container">
                <button className="btn btn-primary btn" type="submit">Save Changes</button>
                <button className="btn btn-primary btn" type="submit">Delete Class</button>
                <button className="btn btn-primary btn" onclick="window.location.href='main.html'">Cancel</button>

            </div>
            
            
            
        </form>

       
    </main>

    )
}