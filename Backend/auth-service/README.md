# Elowen Backend - Setup Instructions

## 📋 Prerequisites

- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd Backend/auth-service
npm install
```

### 2. Setup Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
# Enter your password
# Then run:
source database/schema.sql
```

**Option B: Using MySQL Workbench**
1. Open MySQL Workbench
2. Connect to your MySQL server
3. File → Open SQL Script → Select `database/schema.sql`
4. Execute the script

### 3. Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and update with your MySQL credentials:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=elowen_db
```

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start at: **http://localhost:8082**

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user info (requires token)
- `POST /auth/verify-otp` - Verify OTP (placeholder)

### Users
- `GET /users/profile` - Get user profile (requires token)
- `PUT /users/profile` - Update user profile (requires token)

### Jobs
- `GET /jobs` - Get all jobs (requires token)
- `GET /jobs/:id` - Get job by ID (requires token)
- `GET /jobs/search` - Search jobs (requires token)
- `POST /jobs/:id/apply` - Apply to job (requires token)
- `GET /applications/my-applications` - Get applied jobs (requires token)

### Health Check
- `GET /health` - Server health check
- `GET /` - API documentation

## 🔑 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

**How to use:**
1. Register or login to get a token
2. Include the token in the Authorization header:
```
Authorization: Bearer <your-token-here>
```

## 🧪 Testing the API

### Using cURL

**Register a user:**
```bash
curl -X POST http://localhost:8082/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "9876543210",
    "state": "Maharashtra",
    "city": "Pune"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8082/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get jobs (replace TOKEN with your actual token):**
```bash
curl -X GET http://localhost:8082/jobs \
  -H "Authorization: Bearer TOKEN"
```

## 📱 Frontend Integration

The frontend is already configured to connect to this backend.

**Update frontend API URL if needed:**
Edit `Elowen/src/services/api.js`:
- For Android emulator: `http://10.0.2.2:8082`
- For iOS simulator: `http://localhost:8082`
- For real device: Replace with your computer's IP (e.g., `http://192.168.1.100:8082`)

## 🗄️ Database Structure

### Tables:
- `users` - User accounts (job seekers, employers, admins)
- `jobs` - Job listings
- `applications` - Job applications
- `bookmarks` - Saved jobs
- `notifications` - User notifications
- `categories` - Job categories

### Sample Data:
The schema includes sample jobs and categories. Test user:
- Email: `test@elowen.com`
- Password: `test123`

## 🔧 Troubleshooting

### Database Connection Error
```
❌ Database connection failed
```
**Solution:**
1. Ensure MySQL is running
2. Check credentials in `.env`
3. Verify database `elowen_db` exists

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::8082
```
**Solution:**
1. Change PORT in `.env` to a different number
2. Or kill the process using port 8082:
```bash
# Windows
netstat -ano | findstr :8082
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:8082 | xargs kill
```

### JWT Token Error
```
Invalid or expired token
```
**Solution:**
1. Login again to get a fresh token
2. Check if JWT_SECRET matches in `.env`

## 📁 Project Structure

```
Backend/auth-service/
├── server.js           # Main server file
├── package.json        # Dependencies
├── .env               # Environment variables (don't commit!)
├── .env.example       # Example environment variables
├── .gitignore         # Git ignore rules
└── database/
    └── schema.sql     # Database schema
```

## 🛠️ Development Tips

1. **Auto-reload:** Use `npm run dev` for automatic server restart on file changes
2. **Logging:** Check console for detailed logs of all requests
3. **Database:** Use MySQL Workbench or phpMyAdmin to view database
4. **Testing:** Use Postman or Thunder Client VS Code extension for API testing

## 🚦 Next Steps

1. ✅ Backend is ready
2. ✅ Database is configured
3. ✅ Frontend API is connected
4. 🔄 Test sign up flow
5. 🔄 Test sign in flow
6. 🔄 Test job browsing

## 📞 Support

If you encounter any issues:
1. Check the logs in the terminal
2. Verify database is running
3. Ensure all dependencies are installed
4. Check if ports are available

Happy coding! 🎉
