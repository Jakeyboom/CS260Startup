import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';

export function AddClass() {


    const navigate = useNavigate();

    const saveChanges = () => {console.log("Save Changes requested"); navigate("/prioritizer")};
    const cancelChanges = () => {navigate("/prioritizer")};


    return(
    <main className="main-add-edit"> 
        
        
        <form action="main.html" method="get" className="add-and-edit-form">

            <label className="add-edit-label" for="class-name">Class Name:</label>
            <input type="text" id="class-name" name="className" required placeholder="Class name here" />


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
                <button className="btn btn-primary btn" type="button" onClick={saveChanges}>Save Changes</button>
                <button className="btn btn-primary btn" type="button" onClick={cancelChanges}>Cancel</button>
            </div>
            
        </form>

        
            
        
    </main>

    )
}