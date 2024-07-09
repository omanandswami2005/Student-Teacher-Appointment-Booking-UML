# Student-Teacher Appointment Booking System

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

This project is a web-based application designed for managing student-teacher appointments. It features roles for admins, teachers, and students, each with distinct functionalities and access levels. The application includes advanced features like email verification, password reset, and CAPTCHA integration for security.

## Features

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

## Tech Stack

- **Frontend**: React, Tailwind CSS, Flowbite
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT, Bcrypt
- **Email Service**: Nodemailer
- **Other Tools**: Google reCAPTCHA, Axios

## Installation

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

## Usage

- Navigate to `http://localhost:5000` to access the application.
- Register as a student, verify your email, and login to book appointments.
- Admins can log in and manage the system.
- Teachers can log in and view their appointment schedules.

## API Documentation

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

## Folder Structure

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

## Contributing

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or issues, please contact:

- **Omanand Swami** - [Your Email](mailto:omanandswami2005@gmail.com "Omanand Swami's Email")
