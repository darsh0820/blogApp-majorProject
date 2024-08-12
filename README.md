# Blog Application

This is a full-stack blog application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to create, edit, delete, and view blog posts. Users can also register and log in to manage their own blog posts.

## Features

- User Authentication: Sign up, log in, and manage sessions.
- Create, Edit, and Delete Blog Posts: Authenticated users can manage their own posts.
- View Blog Posts: All users can view published blog posts.
- Responsive Design: The application is fully responsive and mobile-friendly.

## Technologies Used

- **MongoDB**: NoSQL database for storing blog posts and user data.
- **Express.js**: Backend framework for handling API requests and routing.
- **React.js**: Frontend library for building the user interface.
- **Node.js**: JavaScript runtime for running the backend server.
- **Mongoose**: ODM for MongoDB, used to interact with the database.
- **Redux**: State management for the frontend application.
- **Bootstrap**: CSS framework for responsive design.

## Installation

To run the application locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/darsh0820/blogApp-majorProject.git
   cd blogApp-majorProject
   ```
2. **Install server dependencies:**
  ```bash
  cd backend
  npm install
  ```
3. **Install client dependencies:**
  ```bash
  cd ../frontend
  npm install
  ```
4. **Set up Database connection:**
   Add the MONGODB_URL and PORT in `backend/app.js` to connect.
   ```javascript
   mongoose.connect(MONGODB_URL)
    .then(() => app.listen(PORT))
    .then(() => console.log("Connected to the database and listening to localhost PORT"))
    .catch((err) => console.log(err))
   ```

5. **Run the application:**
   Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   Start the frontend development server:
   ```bash
   cd ../frontend
   npm start
   ```
6. **Access the application:**
   Open your browser and go to http://localhost:PORT to view the application.
