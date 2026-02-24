import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';
import '../../CSS/calendar.css';
import '../../public/calendar.jpeg';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);
const myEventsList = [];

export function Calendar() {
    const myCalendar = (props) => (
        <div>
    <BigCalendar
      localizer={localizer}
      events={myEventsList || []}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
    />
  </div>
    )

    


    return(
    <main className="main-calendar"> 
        <p>TODO: Implement calendar functionality using the Google Calendar API</p>
        <p>For now, this page is a placeholder.  Please click on the button "Day View" to see what the day view would look like, as well as reference the image for basic design.</p>

 
        


        <div id="calendar-buttons-container">
            <NavLink to='/day' className="btn btn-primary btn">Day View</NavLink>
            <NavLink to='/prioritizer' className="btn btn-primary btn">Return to Overview</NavLink>
        </div>

        {myCalendar()}



      <img src="calendar.jpeg" alt="Example Calendar" id="calendar-placeholder" />
    </main>

    )
}