import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';
import { isLoggedIn, getCurrentUser } from '../login-service.js';
import { pushClassToCurrentUser } from '../class-service.js';

export function AddClass() {
    //Theoretically, This should be almost done.  Save changes has been implemented, and the function to push checks to see if there is a duplicate class.  Cancel is cancel.

    if(!isLoggedIn()) {
        return <main> <h2>Please log in to add classes. </h2> </main>
    }

    const navigate = useNavigate();

    const saveChanges = (event) => {
        debugger;
        event.preventDefault();
        console.log("Save Changes requested"); 
        //Right here will check if a class with the same name already exists for the user.

        if(pushClassToCurrentUser({className: event.target.currentClassName.value, difficulty: event.target.difficulty.value, assignments: []})) {
            navigate("/prioritizer")
        } else {
            console.log("Failed to create class. Please try again.");
        };
    }
    const cancelChanges = () => {navigate("/prioritizer")};


    return(
    <main className="main-add-edit"> 
        
        
        <form action="main.html" method="get" className="add-and-edit-form" onSubmit= { saveChanges }>

            <label className="add-edit-label" for="class-name">Class Name:</label>
            <input type="text" id="class-name" name="currentClassName" required placeholder="Class name here" />


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

            <div className="add-buttons-container">
                <button className="btn btn-primary btn" type="submit">Save Changes</button>
                <button className="btn btn-primary btn" type="button" onClick={cancelChanges}>Cancel</button>
            </div>
            
        </form>

        
            
        
    </main>

    )
}