import React from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmSession } from '../app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';

export function AddClass() {
    //Theoretically, This should be almost done.  Save changes has been implemented, and the function to push checks to see if there is a duplicate class.  Cancel is cancel.



    const [className, setClassName] = React.useState("");
    const [difficulty, setDifficulty] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        if(!confirmSession()) {
            alert("You must be logged in to view this page.");
            navigate("/");
            return;
        }
    }, [navigate])

    const saveChanges = async (event) => {
        event.preventDefault();
        console.log("Save Changes requested");
        try {
            const classBody = {className: className, difficulty: difficulty}
            const response = await fetch('/api/classes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classBody)
            });

            if(!response.ok) {
                throw new Error("Failed to save changes. Server responded with status: " + response.status);
            }

            navigate("/prioritizer")

        } catch(error) {
            console.log("Error saving changes: ", error);
            alert("An error occured while saving changes \n Error: " + error.message);
        }
        //Right here will check if a class with the same name already exists for the user.

      
    }
    const cancelChanges = () => {navigate("/prioritizer")};


    return(
    <main className="main-add-edit"> 
        
        
        <form action="main.html" method="get" className="add-and-edit-form" onSubmit= { saveChanges }>

            <label className="add-edit-label" for="class-name">Class Name:</label>
            <input type="text" id="class-name" name="currentClassName" onChange={(e) => setClassName(e.target.value)} required placeholder="Class name here" />


            <fieldset onChange={(event) => setDifficulty(event.target.value)}>
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