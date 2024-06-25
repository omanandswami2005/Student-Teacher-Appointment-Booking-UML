Sure! Let's design the appropriate models and API routes for the admin, teacher, and student functionalities you mentioned. We'll break it down into three sections: models, API routes, and sample requests/responses.

### Models

#### 1. User Model

We'll use a single User model with a role field to distinguish between students, teachers, and admins.

```javascript
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'teacher', 'admin'] },
  department: String, // applicable for teachers
  subject: String,    // applicable for teachers
  approved: { type: Boolean, default: false } // for registration approval
});

module.exports = mongoose.model('User', UserSchema);
```

#### 2. Appointment Model

```javascript
const AppointmentSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  message: String,
  status: { type: String, enum: ['pending', 'approved', 'canceled'], default: 'pending' }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
```

#### 3. Message Model

```javascript
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
```

### API Routes

#### 1. Admin Routes

- **Add Teacher**

  ```http
  POST /admin/teachers
  {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "securepassword",
    "department": "Computer Science",
    "subject": "Data Structures"
  }
  ```
- **Update Teacher**

  ```http
  PUT /admin/teachers/:id
  {
    "name": "John Doe",
    "department": "Mathematics",
    "subject": "Algebra"
  }
  ```
- **Delete Teacher**

  ```http
  DELETE /admin/teachers/:id
  ```
- **Approve Registration**

  ```http
  POST /admin/approve/:id
  ```

#### 2. Teacher Routes

- **Login**

  ```http
  POST /teachers/login
  {
    "email": "john.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Schedule Appointment**

  ```http
  POST /teachers/appointments
  {
    "studentId": "studentId",
    "date": "2024-07-10T10:00:00Z",
    "message": "Appointment message"
  }
  ```
- **Approve/Cancel Appointment**

  ```http
  POST /teachers/appointments/:id/approve
  POST /teachers/appointments/:id/cancel
  ```
- **View Messages**

  ```http
  GET /teachers/messages
  ```
- **View All Appointments**

  ```http
  GET /teachers/appointments
  ```
- **Logout**

  ```http
  POST /teachers/logout
  ```

#### 3. Student Routes

- **Register**

  ```http
  POST /students/register
  {
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Login**

  ```http
  POST /students/login
  {
    "email": "jane.doe@example.com",
    "password": "securepassword"
  }
  ```
- **Search Teacher**

  ```http
  GET /students/teachers
  ```
- **Book Appointment**

  ```http
  POST /students/appointments
  {
    "teacherId": "teacherId",
    "date": "2024-07-10T10:00:00Z",
    "message": "Appointment message"
  }
  ```
- **Send Message**

  ```http
  POST /students/messages
  {
    "recipientId": "teacherId",
    "content": "Message content"
  }
  ```

### Sample Requests/Responses

#### Admin

**Add Teacher**

```http
POST /admin/teachers
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "securepassword",
  "department": "Computer Science",
  "subject": "Data Structures"
}
```

**Response:**

```http
201 Created
{
  "message": "Teacher added successfully",
  "teacher": {
    "id": "teacherId",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "department": "Computer Science",
    "subject": "Data Structures"
  }
}
```

#### Teacher

**Login**

```http
POST /teachers/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "securepassword"
}
```

**Response:**

```http
200 OK
{
  "token": "jwtToken",
  "user": {
    "id": "teacherId",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "teacher"
  }
}
```

#### Student

**Register**

```http
POST /students/register
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "securepassword"
}
```

**Response:**

```http
201 Created
{
  "message": "Registration successful, pending approval",
  "user": {
    "id": "studentId",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "role": "student"
  }
}
```

### Conclusion

This design includes the necessary models and API routes to handle the functionalities for the admin, teacher, and student roles in your appointment booking system. The models handle user information, appointments, and messages, while the API routes provide the endpoints needed for CRUD operations, authentication, and other actions.
