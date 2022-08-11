# ReactJS-project

# Idea
Application for managing company information like employees, leaves, events and job positions. 

# Design
Administration
- Calendar - Section for setting events
- Employees - Section for managing employees data (create, read, update, delete)
- Leaves - Section for viewing and approving leaves
- Jobs - Section for managing job offers
Employees
- Calendar - Section for setting events
- Leaves - Section for craeting leaves

# There are two roles available, with the following permissions:
logged in user
- View and create own leaves
- View onw calendar and create events

administrator - to log in as administrator use: email: admin@admin.com, password: 123456
- Manage employees data
- View and approve leaves
- View onw calendar and create events
- Manage job offfers
*Not authorized users are able apply for a job

# Techniques used
- React for building the user interface.
- Firebase for the backend, user management, cloud data storage, and hosting.
- Jest for making unit tests.

# Client-side usage(PORT: 3000)
  $ npm i       // npm install packages
  $ npm start   // run it locally
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.
