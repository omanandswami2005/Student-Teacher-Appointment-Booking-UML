#                               ⭐ The Student-Teacher Appointment Booking System ! ⭐
## 👉🏻 [View Live (Hosted) Project !](https://stabs.onrender.com/ "Student-Teacher Appointment Booking System")🔗

## 🌟Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Screenshots](#screenshots)
- [Test Cases](#test-cases)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟Overview

This project is a web-based application designed for managing student-teacher appointments. It features roles for admins, teachers, and students, each with distinct functionalities and access levels. The application includes advanced features like email verification, password reset, and CAPTCHA integration for security.

## 🌟Features

- **Admin Role**:

  - Manage teachers and students.
  - View all appointments.
  - Approve or restrict student registrations.
  - View various counts and statistics.
- **Teacher Role**:

  - View their dashboard with upcoming appointments.
  - Manage student appointments.
- **Student Role**:

  - Register and login to the system.
  - Book appointments with teachers.
  - View their appointment history.
- **General Features**:

  - Email verification for new users.
  - Password reset functionality.
  - CAPTCHA integration to prevent spam and bot registrations.

## 🌟Tech Stack

- **Frontend**: React, Tailwind CSS, Flowbite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt
- **Email Service**: Nodemailer
- **Other Tools**: Google reCAPTCHA, Axios

## 🌟Installation

### Prerequisites

- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/appointment-booking-system.git
   cd appointment-booking-system
   ```
2. Install dependencies:

    ```bash
       npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   CAPTCHA_SECRET=your_recaptcha_secret
   ```
4. Run the application:

   ```bash
   npm start
   ```

## 🌟Usage

- Navigate to `http://localhost:5000` to access the application.
- Register as a student, verify your email, and login to book appointments.
- Admins can log in and manage the system.
- Teachers can log in and view their appointment schedules.

## 🌟API Documentation

### Endpoints

- **Auth Routes**:

  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login a user
  - `POST /api/auth/logout` - Logout a user
  - `GET /api/auth/verify-email` - Verify email address
  - `POST /api/auth/forgot-password` - Request password reset
  - `POST /api/auth/reset-password` - Reset password
- **Admin Routes**:

  - `POST /api/admin/teachers` - Add a new teacher
  - `PUT /api/admin/teachers/:id` - Update teacher details
  - `DELETE /api/admin/teachers/:id` - Delete a teacher
  - `GET /api/admin/students` - View all students
  - `PUT /api/admin/students/approve/:id` - Approve or restrict a student
  - `DELETE /api/admin/students/:id` - Delete a student
  - `GET /api/admin/appointments` - View all appointments
  - `GET /api/admin/counts` - Get various counts and statistics
- **Teacher Routes**:

  - `GET /api/teacher/appointments` - View teacher's appointments
- **Student Routes**:

  - `POST /api/student/appointments` - Book an appointment
  - `GET /api/student/appointments` - View student's appointments

## 🌟Folder Structure

```
appointment-booking-system/
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── app.js
├── client/
│   ├── src/
│       ├── components/
│       ├── pages/
│       ├── context/
│       ├── App.js
│       └── index.js
│   
├── .env
├── package.json
├── README.md
└── ...

```

## 🌟screenshots🖼️
![Screenshot 2024-07-09 153435](https://github.com/ItsOmiii2005/Student-Teacher-Appointment-Booking-UML/assets/101080173/84508bd8-de41-4824-a6cb-f833ba49d159)
![Screenshot 2024-07-09 154647](https://github.com/ItsOmiii2005/Student-Teacher-Appointment-Booking-UML/assets/101080173/83cae3ae-8965-45ed-ba78-972d29466caf)



## 🌟Test Cases

### User Registration

| Test Case Description               | Steps                                                                                          | Expected Result                                             |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| Register a new user                 | 1. Navigate to the register page.<br>2. Enter valid details.<br>3. Click Register.     | User should be registered and receive a verification email. |
| Register with an existing email     | 1. Navigate to the register page.<br>2. Enter an existing email.<br>3. Click Register. | Error message should be displayed: "Email already exists."  |
| Register without filling all fields | 1. Navigate to the register page.<br>2. Leave some fields blank.<br>3. Click Register. | Error message should be displayed for the required fields.  |

### User Login

| Test Case Description            | Steps                                                                                                | Expected Result                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Login with correct credentials   | 1. Navigate to the login page.<br>2. Enter valid email and password.<br>3. Click Login.      | User should be logged in and redirected to the appropriate dashboard. |
| Login with incorrect credentials | 1. Navigate to the login page.<br>2. Enter invalid email or password.<br>3. Click Login.     | Error message should be displayed: "Invalid email or password."       |
| Login with unverified email      | 1. Navigate to the login page.<br>2. Enter unverified email and password.<br>3. Click Login. | Error message should be displayed: "Please verify your email."        |

### Booking an Appointment

| Test Case Description                       | Steps                                                                                                                            | Expected Result                                                      |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Book an appointment as a student            | 1. Login as a student.<br>2. Navigate to the book appointment page.<br>3. Fill in details.<br>4. Click Book.         | Appointment should be booked and visible in the student's dashboard. |
| Book an appointment without required fields | 1. Login as a student.<br>2. Navigate to the book appointment page.<br>3. Leave some fields blank.<br>4. Click Book. | Error message should be displayed for the required fields.           |

## 🌟Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## 🌟License

This project is licensed under the MIT License.
