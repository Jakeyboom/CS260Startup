import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../CSS/calendar.css'
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ConsoleMessage, ConsoleNotifier } from '../../service/console-events-service.js';


export function About() {
    React.useEffect(() => {
        const wsPort = 4000;
        const protocol = window.location.protocol === 'http:' ? 'ws:' : 'wss:';
        const socket = new WebSocket(`${protocol}//${window.location.hostname}:${wsPort}/ws`);

        socket.onopen = () => {
            console.log("WebSocket connection established.");
            socket.send(JSON.stringify({ type: "TEST_MESSAGE", content: "Hello, WebSocket!" }));
        };

        socket.onmessage = (event) => {
            console.log("Received WebSocket message: ", event.data);
            try {
                const messageData = JSON.parse(event.data);
                //Here, I will add code to handle the message data and update the about page accordingly.  This will likely involve creating a new React component to represent each console message, and then adding that component to the page whenever a new event is received.
            } catch(error) {
                console.error("Failed to parse WebSocket message data. Error: ", error.message);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error: ", error);
        };

        return () => {
            socket.close();
        };
    }, [])

    const [consoleMessages, setConsoleMessages] = React.useState([]);
    React.useEffect(() => {
        ConsoleNotifier.addHandler(handleConsoleMessage);

        return () => {
            ConsoleNotifier.removeHandler(handleConsoleMessage);
        }
    }, []);

    function handleConsoleMessage(message) {
        console.log("Received console event: ", message);
        //Here, I will add code to display the event in a nice format on the about page.  This will likely involve creating a new React component to represent each console message, and then adding that component to the page whenever a new event is received.
        setConsoleMessages(prevMessages => {
            let newMessages = [message, ...prevMessages];
            if(newMessages.length > 4) {
                newMessages = newMessages.slice(0, 4);
            }
            return newMessages;
        });
    }

    function createMessageArray() {
        const messageArray = [];
        for (const [i, message] of consoleMessages.entries()) {
            let messageText = "unknown";
            if(message.messageType === "ACCOUNT_CREATED") {
                messageText = `${message.user} created an account!`;
            } else if(message.messageType === "CLASS_CREATED") {
                messageText = `${message.user} created a class, "${message.userClassName}"!`;
            } else if(message.messageType === "ASSIGNMENT_CREATED") {
                messageText = `${message.user} added assignment "${message.userAssignmentName}" to class "${message.userClassName}"!`;
            } else if (message.messageType === "ASSIGNMENT_EDITED") {
                messageText = `${message.user} edited assignment "${message.userAssignmentName}" in class "${message.userClassName}"!`;
            } else if (message.messageType === "CLASS_EDITED") {
                messageText = `${message.user} edited class "${message.userClassName}"!`;
            }

            messageArray.push(
            <p key={i} className = "console-message">{messageText}</p>
            );

        }
        return messageArray;
    }

    //Right here will simulate the websocket part of my server by creating a single event over & over again.



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
                {createMessageArray()}
            </div>

            <NavLink to='/prioritizer' className="btn btn-secondary btn">Return to Overview</NavLink>

        </main>
    )

    //Step 1: Stub out an example event message (an object with different variables representing the event).
    //Step 2: 
}