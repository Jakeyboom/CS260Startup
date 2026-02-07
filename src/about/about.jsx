import React from 'react';


export function About() {
    return(
        <main>
            <p> 
                Amigo organizado is a "simple" web application that I developed
                with the goal of helping students organize their academic workload.
            </p>
            <p>
            As such, it is currently a work in progress.  If you have any questions or
             would like to report any issues, please contact me at <b>jake0218@byu.edu</b>
            </p>
            Have Fun!

            <form action="main.html" method="get">
                <button class="btn btn-secondary btn" type="submit">Return to Overview</button>
            </form>

        </main>
    )
}