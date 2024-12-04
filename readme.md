# **Task Scheduler Application**

This is a full-stack Task Scheduler Application that allows users to create, schedule, and manage tasks. Tasks are executed based on a specified schedule, and users can monitor the status of their tasks using a sleek UI. The application is built using **Node.js** (backend) and **React** (frontend) with Ant Design as the UI framework.

---

## **Features**

### **Frontend**

- A clean and intuitive UI built with React and Ant Design.
- **Add New Task**: A form to add a new scheduled task, including details like task name, email, and schedule.
- **Task List**: Displays a list of scheduled tasks with their name, email, status, and next execution time.
- **Delete Task**: Allows users to delete tasks.
- **Readable Cron Time**: Cron expressions are displayed in a user-friendly, readable date/time format.

### **Backend**

- A robust backend built with Node.js and Express.
- **Task Scheduling**: Uses `node-cron` for scheduling tasks.
- **Send Emails**: Sends emails using `nodemailer` at the specified schedule.
- **CRUD APIs**:
  - **GET** `/tasks`: Fetch all tasks.
  - **POST** `/tasks`: Add a new task.
  - **DELETE** `/tasks/:id`: Delete a task.
- Logs task executions and stores them in MongoDB.
- Configuration management with `dotenv` for securely storing email credentials and database configuration.

---

## **Technologies Used**

### **Frontend**

- React
- Ant Design (UI Framework)
- Axios (for API requests)

### **Backend**

- Node.js
- Express
- MongoDB (Database)
- `node-cron` (Task Scheduler)
- `nodemailer` (Email Sending)
- `mongoose` (MongoDB ODM)

---

## **Getting Started**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-repo/task-scheduler.git
cd task-scheduler
```

---

### **2. Install Dependencies**

#### **Backend**

```bash
cd backend
npm install
```

#### **Frontend**

```bash
cd frontend
npm install
```

---

### **3. Environment Variables**

Create a `.env` file in the **backend** directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskScheduler
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
```

---

### **4. Run the Application**

#### **Start Backend**

```bash
cd backend
npx nodemon server.js
```

#### **Start Frontend**

```bash
cd frontend
npm start
```

The app will be accessible at [http://localhost:3000](http://localhost:3000) (frontend) and [http://localhost:5000](http://localhost:5000) (backend).

---

## **API Endpoints**

### **1. Get All Tasks**

- **Endpoint**: `GET /tasks`
- **Description**: Fetches all tasks from the database.
- **Response**:
  ```json
  [
    {
      "_id": "taskId",
      "name": "Task Name",
      "cronTime": "Cron Expression",
      "email": "Email",
      "message": "Task Message",
      "status": true
    }
  ]
  ```

### **2. Add a New Task**

- **Endpoint**: `POST /tasks`
- **Body**:
  ```json
  {
    "name": "Task Name",
    "email": "Recipient Email",
    "cronTime": "Cron Expression",
    "message": "Task Message"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Task created successfully!"
  }
  ```

### **3. Delete a Task**

- **Endpoint**: `DELETE /tasks/:id`
- **Response**:
  ```json
  {
    "message": "Task deleted successfully!"
  }
  ```

---

## **UI Overview**

### **1. Add New Task**

- A form with the following fields:
  - Task Name
  - Email
  - Date (via `DatePicker`)
  - Time (via `TimePicker`)
  - Message

### **2. Task List**

- Displays all tasks in a table.
- Columns:
  - Task Name
  - Email
  - Status (Active/Inactive with colored tags)
  - Human-readable Next Execution Time (converted from cron time).
  - Delete Action.

---

## **Code Structure**

### **Backend**

```
backend/
├── config/
│   ├── db.js          # MongoDB connection setup
├── models/
│   ├── Task.js        # Mongoose Task schema
├── routes/
│   ├── tasks.js       # Task API routes
├── server.js          # Main entry point
├── cronScheduler.js   # Node-cron scheduling logic
```

### **Frontend**

```
frontend/
├── src/
│   ├── components/
│   │   ├── AddTaskForm.jsx    # Form to add new tasks
│   │   ├── TaskList.jsx       # Task list table
│   ├── App.js                 # Main app component
│   ├── index.js               # Entry point
```

---

## **Deployment**

### **Backend Deployment**

- Host the backend on a service like **Heroku**, **Render**, or **AWS**.
- Use environment variables to store sensitive credentials.

### **Frontend Deployment**

- Host the frontend on **Netlify**, **Vercel**, or **AWS S3**.

### **Live Testing**

- Ensure the backend endpoint is accessible from the frontend.
- Use dummy email credentials for testing email functionality.

---

## **Future Enhancements**

- User authentication to restrict task management.
- Enhanced task logs with execution history and failure reasons.
- Advanced scheduling options like recurring patterns.
- Notification system for task failures or completions.

---
