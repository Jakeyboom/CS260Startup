import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUserClasses } from '../class-service.js';
import '../../CSS/calendar.css';
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

const localizer = momentLocalizer(moment);

export function Calendar() {
  const navigate = useNavigate();
  const myEventsList = getCurrentUserClasses().flatMap((c) => c.assignments.map((a) => {
        return {
          title: a.name + " - " + c.className,
          start: new Date(a.dueDate + "T10:00:00"),
          end: new Date(a.dueDate + "T10:00:00")
        }
      })) || [];

    const myCalendar = (props) => (
    <div>
      <BigCalendar id="calendar"
        localizer={localizer}
        events={myEventsList || []}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        defaultView="month"
        views={['month']}
        style={{ height: "60vh", width: "80vw", flex: 1, border: "solid", borderColor: "black", borderWidth: "thick", margin: "auto", borderRadius: "8px"
          }}
        onSelectSlot= {(slotInfo) => {
          console.log("Selected slot: ", slotInfo);
          navigate("/day/" + slotInfo.start.toISOString().split('T')[0])}
          
        }

        onSelectEvent= {(eventInfo) => {
          console.log("Selected event: ", eventInfo);
          const selectedDate = eventInfo.start.toISOString().split('T')[0];
          navigate("/day/" + selectedDate);
        }}
      />
    </div>
    )

    


    return(
    <main className="main-calendar"> 
        <p>Please click on the button "Search" to search for assignments due on a specific day.</p>
        <p>Optionally, you can click on a specific date in the calendar to view all assignments for that day.</p>

 
        


        <div id="calendar-buttons-container">
            <NavLink to='/day' className="btn btn-primary btn">Search</NavLink>
            <NavLink to='/prioritizer' className="btn btn-primary btn">Return to Overview</NavLink>
        </div>

        {myCalendar()}



    </main>

    )
}