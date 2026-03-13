import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/add-and-edit.css';
import { useNavigate, useParams } from 'react-router-dom';
import { confirmSession } from '../app';

export function EditClass() {

    


    const navigate = useNavigate();


    const { currentClassNameEncoded } = useParams();
    const currentClassName = decodeURIComponent(currentClassNameEncoded);
    const [newDifficulty, setNewDifficulty] = React.useState("");
    const [newClassName, setNewClassName] = React.useState("");

    React.useEffect(() => {
        if(!confirmSession()) {
            alert("You must be logged in to view this page.");
            navigate("/");
        }
    }, [navigate]);

    const saveChanges = async (event) => {
        event.preventDefault(); 

        try {
            if(currentClassName === null || currentClassName === undefined) {
                throw new Error("Invalid class name.");
            }

            const classBody = {oldClassName: currentClassName, newClassName: newClassName, newDifficulty: newDifficulty}
            const response = await fetch('/api/classes', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classBody)
            });

            if(!response.ok) {
                throw new Error("Failed to save changes. Server responded with status: " + response.status);
            }
            
            navigate("/prioritizer");

        } catch(error) {
            console.error("Error occurred while saving changes: ", error);
            alert("An error occurred while saving changes. Please try again.");
            return;
        }
        console.log("Save Changes requested");
        
    };


    const deleteClass = async () => {
        try {
            if(currentClassName === null || currentClassName === undefined) {
                throw new Error("Invalid class name.");
            }
            const classBody = {className: currentClassName};
            const response = await fetch('/api/classes', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(classBody)
            });

            if(!response.ok) {
                throw new Error(response.status);
            }

            navigate("/prioritizer");
        } catch(error) {
            console.error("Error occured while delete.  Error: ", error);
            alert("An error occurred while deleting the class. Server reported: ", error);
            return;
        }
        console.log("Delete Class requested");
    };


    const cancelChanges = () => {navigate("/prioritizer")};

    return(

         <main className="main-add-edit">
            <h2 className="assignment-or-class-title">Selected Class: {currentClassNameEncoded}</h2> 
 
        <form action="main.html" method="get" className="add-and-edit-form" onSubmit={saveChanges}>

            <label className="add-edit-label"for="class-name">Change Class Name:</label>
            <input type="text" id="class-name" name="className" onChange={(e) => setNewClassName(e.target.value)} required placeholder="Class name here"/>

            <fieldset onChange={(e) => setNewDifficulty(e.target.value)}>
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
                <button className="btn btn-primary btn" type="button" onClick={deleteClass}>Delete Class</button>
                <button className="btn btn-primary btn" type="button" onClick={cancelChanges}>Cancel</button>
            </div>
            
            
            
        </form>

       
    </main>

    )
}