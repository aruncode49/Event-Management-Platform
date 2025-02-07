## Event Management Platform

### Overview
This project implements a comprehensive Event Management Platform using the MERN stack (MongoDB, Express.js, React.js, Node.js). It includes features for user authentication, event creation, real-time attendee updates, and a responsive design for seamless usability across devices.

### DEMONSTRATION [VIDEO LINK](https://vimeo.com/1054448297/f602243f28?ts=0&share=copy)

### Features

#### Frontend Features

1. **User Authentication**  
   - Users can register and log in securely. Includes an option for "Guest Login" to access limited features.

2. **Event Dashboard**  
   - Displays a list of created events.  
   - Provides filters for event dates.

3. **Event Creation**  
   - Form for creating events with fields such as event name, description, date/time, and more.

4. **Real-Time Attendee List**  
   - Shows the number of attendees for each event in real-time using WebSocket integration (Socket.io).

5. **Responsive Design**  
   - Ensures optimal user experience across various devices and screen sizes.

#### Backend Features

1. **Authentication API**  
   - Implements JWT (JSON Web Tokens) for secure user authentication and authorization.

2. **Event Management API**  
   - Supports CRUD operations (Create, Read, Update, Delete) for events.  
   - Includes ownership restrictions to ensure data integrity and security.

3. **Real-Time Updates**  
   - Utilizes WebSocket (Socket.io) for real-time updates of attendee lists and event statuses.

4. **Database**  
   - Efficiently stores event and user data using MongoDB Atlas, ensuring scalability and reliability.

### Deployment

- **Frontend Hosting**: Deployed on Vercel  
  [Event Management Platform Frontend](https://event-management-platform-sigma.vercel.app/)

- **Backend Hosting**: Deployed on Render  
  [Event Management Platform Backend](https://event-management-platform-at8y.onrender.com/)

### Tools Used

- **Database**: MongoDB Atlas  
- **Image Hosting**: Cloudinary  
- **Real-Time Attendees Update**: Socket.io for WebSocket implementation

### Technologies Used

- **Frontend**: React.js, Redux Toolkit, React Router, Axios  
- **Backend**: Node.js, Express.js, JWT, Socket.io  
- **Deployment**: Vercel (Frontend), Render (Backend)

