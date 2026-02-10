import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';
import { NavLink } from 'react-router-dom';

export function EditClass() {
    return(
         <main className="main-add-edit"> 

        <form action="main.html" method="get" className="add-and-edit-form">

            <label className="add-edit-label"for="class-name">Change Class Name:</label>
            <input type="text" id="class-name" name="className" required placeholder="Class name here"/>

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
                <button className="btn btn-primary btn" type="submit">Delete Class</button>

            </div>
            
            
            
        </form>
        <NavLink to='/prioritizer' className="btn btn-secondary btn">Cancel</NavLink>

       
    </main>

    )
}