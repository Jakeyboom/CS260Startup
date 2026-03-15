# AmigoOrganizado

[My Notes](notes.md)

AmigoOrganizado is a web application intended for helping college students to organize their work! By signing up and giving a little bit of information about each class that a student is taking (name of the class and difficulty) and each assignment that is due (ranked by difficulty), AmigoOrganizado will help students prioritize their work!  Some of the functionality includes a prioritizer (which assignemnts should be completed first based on class difficulty, assignment difficulty and due date), an "emergency window" which says all assignments that are due today, as well as a kind of anonymous "leaderboard" which currently states which student is having the most amount of coursework to complete

> [!NOTE]
> This is a template for your startup application. You must modify this `README.md` file for each phase of your development. You only need to fill in the section for each deliverable when that deliverable is submitted in Canvas. Without completing the section for a deliverable, the TA will not know what to look for when grading your submission. Feel free to add additional information to each deliverable description, but make sure you at least have the list of rubric items and a description of what you did for each item.

> [!NOTE]
> If you are not familiar with Markdown then you should review the [documentation](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax) before continuing.

## 🚀 Specification Deliverable

> [!NOTE]
> Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
    -  I read through the Markdown document and confirmed that I used markdown correctly
- [x] A concise and compelling elevator pitch
    - I added a concise and compelling elevator pitch
- [x] Description of key features
    - I added a description of key features as asked
- [x] Description of how you will use each technology
    - I read through the basic function of each technology and wrote how I think I will use each one
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.
    - I embedded the images


### Elevator pitch

Have you ever had a hard time organizing your coursework? AmigoOrganizado is here to help you thrive in all of your classes! Just by providing simple information about your classes and coursework, AmigoOrganizado will prioritize which assignments should be completed first, show you which assignments are due today and show you a calendar with all of your assignments.

### Design

![Desgin loginPage](public/sign_in.jpeg)
![Design mainPage](public/main_screen.jpeg)
![Design calendarPage](public/calendar.jpeg)
![Design calendarDayViewPage](public/calendar_day.jpeg)
![Design addClass](public/add_class.jpeg)
![Design addAssignment](public/add_assignment.jpeg)
![Design editClass](public/edit_class.jpeg)
![Design editAssignment](public/edit_assignment.jpeg)



### Key features

- Courswork prioritizer--a window on the main page showing the order in which you should complete your assignments
- Due Today Window--a window on the main page showing which assignments are due today
- Calendar--shows which assignments are due for each day in a given month.

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - I will use HTML to organize and structre my web page and the elements / contents on it
- **CSS** - I will use CSS to add page animations, create a more dynamic experience and style the web page
- **React** - I will use React to make my web application "alive"--add reactive components that change based on user input and data changes
- **Service** - I will use web services to provide a connection between the frontend and backend of my web application
- **DB/Login** - I will use a database to store specific user information to be used within the web application and enable login for a use to retrieve/manipulate said data from the Database
- **WebSocket** - I will use Websocket to create a peer to peer connection with the server of AmigoOrganizado so that data can be efficiently sent and updated on both ends at any time

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - [My server link](https://amigoorganizado.click/).
    I rented the domain amigoorganizado.click, setup the server, and edited the Caddy file.

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **HTML pages** - Created basic HTML structure for my web page
- [X] **Proper HTML element usage** - Used basic HTML elements and element containers to create code that is easy to read
- [X] **Links** - used hyperlinks where appropriate to simulate editing classes and assignments.
- [X] **Text** - Added text and comments where needed to readability
- [X] **3rd party API placeholder** - Added placeholder inspirational quote and calendar for the APIs.
- [X] **Images** - Added images where needed as reference.
- [X] **Login placeholder** - Created simple login page
- [X] **DB data placeholder** - I completed this part of the deliverable.
- [X] **WebSocket placeholder** - I will use WebSocket to update table data and with communication with the Google Calendar and Inspirational Quotes APIs.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Visually appealing colors and layout. No overflowing elements.** - Use visually appealing colors and created a dynamic layout
- [X] **Use of a CSS framework** - Implemented the bootstrap framework
- [X] **All visual elements styled using CSS** - Removed hard-coded styling from html files and implemented visual styling using CSS
- [X] **Responsive to window resizing using flexbox and/or grid display** - Implemented flexbox everywhere for easy resizing
- [X] **Use of a imported font** - Imported "Lato" font
- [X] **Use of different types of selectors including element, class, ID, and pseudo selectors** - Used different types of selectors in my CSS files based on my needs

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Bundled using Vite** - I did not complete this part of the deliverable.
    Was bundled and tested using vite
- [ ] **Components** - I did not complete this part of the deliverable.
    Added app components for relative functionality (at least for the layout)
- [X] **Router** - I did not complete this part of the deliverable.
    Implemented a router to create a seemless experience.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **All functionality implemented or mocked out** - I did complete this part of the deliverable.
    Mocked out all functionalilty--I spent a LONG time debugging to make sure that it actually worked as intended.
- [X] **Hooks** - I did complete this part of the deliverable.
    I used hooks throughout my code, more specifically mocking a console logging fake things happening in a kind of WebSocket situation with the server.

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [X] **Node.js/Express HTTP service** - I ported all of my code to separate the frontend from the backend.
- [X] **Static middleware for frontend** - Implemented express to create static access to data from the server
- [X] **Calls to third party endpoints** - Implemented a call to an online host of inspirational quotes //CREDITS: QUOTESLATE API FROM GITHUB https://github.com/musheer360/QuoteSlate?tab=readme-ov-file#features
- [X] **Backend service endpoints** - Implemented backend service endpoints and routing
- [X] **Frontend calls service endpoints** - Implemented fetch statements in the frontend to get and modify data in the backend
- [X] **Supports registration, login, logout, and restricted endpoint** - Supports these features and user verification; no access is given in the app and it automatically redirects to login if a user is not authorized.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
