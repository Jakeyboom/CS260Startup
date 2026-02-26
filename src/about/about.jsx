import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/calendar.css'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


export function About() {

    return(
        <main className="main-calendar">
            <p> 
                Amigo organizado is a "simple" web application that I developed
                with the goal of helping students organize their academic workload.
            </p>
            <p>
            As such, it is currently a work in progress.  If you have any questions or
             would like to report any issues, please contact me at <b>jake0218@byu.edu</b>
            </p>
            Have Fun!

            <div id="console-div">
                <p><b>Console Log:</b></p>
                <p>example@google.com created an account!</p>
                <p>example@google.com created a class, "MATH"</p>
                <p>example@google.com added assignment "HW 1" to class "MATH"</p>
            </div>

            <NavLink to='/prioritizer' className="btn btn-secondary btn">Return to Overview</NavLink>

        </main>
    )

    //Step 1: Stub out an example event message (an object with different variables representing the event).
    //Step 2: 
}