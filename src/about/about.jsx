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

            <div id="console-div"></div>

            <NavLink to='/prioritizer' className="btn btn-secondary btn">Return to Overview</NavLink>

        </main>
    )
}